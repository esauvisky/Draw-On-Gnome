/*
 * Copyright 2019 Abakkk
 * Copyright 2024 Dave Prowse
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-FileCopyrightText: 2019 Abakkk
 * SPDX-FileCopyrightText: 2024 Dave Prowse
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import Clutter from 'gi://Clutter';

import St from 'gi://St';
import GObject from 'gi://GObject';
import * as Config from 'resource:///org/gnome/shell/misc/config.js'
import * as Shortcuts from './shortcuts.js';
import { gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';

import { CURATED_UUID as UUID } from './utils.js';

import GLib from 'gi://GLib';

const GS_VERSION = Config.PACKAGE_VERSION;
const Tweener = GS_VERSION < '3.33.0' ? imports.ui.tweener : null;

const HELPER_ANIMATION_TIME = 0.25;
const MEDIA_KEYS_SCHEMA = 'org.gnome.settings-daemon.plugins.media-keys';
const MEDIA_KEYS_KEYS = ['screenshot', 'screenshot-clip', 'area-screenshot', 'area-screenshot-clip'];

// DrawingHelper provides the "help osd" (Ctrl + F1)
// It uses the same texts as in prefs
//TODO: Review this class later
export const DrawingHelper = GObject.registerClass({
    GTypeName: `${UUID}-DrawingHelper`,
}, class DrawingHelper  extends St.ScrollView {

    _init(extension, params, monitor) {
        params.style_class = 'osd-window draw-on-gnome-helper';
        super._init(params);
        this._extension = extension;
        this.monitor = monitor;
        this.hide();

        this.settingsHandler = this._extension.settings.connect('changed', this._onSettingsChanged.bind(this));
        this.internalShortcutsettingsHandler = this._extension.internalShortcutSettings.connect('changed', this._onSettingsChanged.bind(this));
        this.connect('destroy', () => {
            this._extension.settings.disconnect(this.settingsHandler);
            this._extension.internalShortcutSettings.disconnect(this.internalShortcutsettingsHandler);
        });
    }

    _onSettingsChanged(settings, key) {
        if (key == 'toggle-help')
            this._updateHelpKeyLabel();

        if (this.vbox) {
            this.vbox.destroy();
            delete this.vbox;
        }
    }

    _updateHelpKeyLabel() {
        try {
            this._helpKeyLabel = this._extension.internalShortcutSettings.get_strv('toggle-help')[0];
        } catch(e) {
            logError(e);
            this._helpKeyLabel = " ";
        }
    }

    get helpKeyLabel() {
        if (!this._helpKeyLabel)
            this._updateHelpKeyLabel();

        return GLib.markup_escape_text(this._helpKeyLabel, -1);
    }

    _populate() {
        this.vbox = new St.BoxLayout({ vertical: true });
        this.add_child(this.vbox);
        this.vbox.add_child(new St.Label({ text: _("Global") }));

        Shortcuts.GLOBAL_KEYBINDINGS.forEach((settingKeys) => {
            this.vbox.add_child(new St.BoxLayout({ vertical: false, style_class: 'draw-on-gnome-helper-separator' }));

            if (!this._extension.settings.get_strv(settingKeys)[0])
                return;

            let hbox = new St.BoxLayout({ vertical: false });
            let shortcut = this._extension.settings.get_strv(settingKeys)[0];
            shortcut = GLib.markup_escape_text(shortcut, -1);
            hbox.add_child(new St.Label({ text: this._extension.settings.settings_schema.get_key(settingKeys).get_summary() }));
            let label = new St.Label({ text: "<b><i>" + shortcut + "</i></b>", x_expand: true })
            label.get_clutter_text().set_use_markup(true);
            hbox.add_child(label);
            this.vbox.add_child(hbox);
        });

        this.vbox.add_child(new St.BoxLayout({ vertical: false, style_class: 'draw-on-gnome-helper-separator' }));
        this.vbox.add_child(new St.Label({ text: _("Internal") }));

        // Shortcuts.OTHERS.forEach((pairs, index) => {
        //     if (index)
        //         this.vbox.add_child(new St.BoxLayout({ vertical: false, style_class: 'draw-on-gnome-helper-separator' }));

        //     pairs.forEach(pair => {
        //         let [action, shortcut] = pair;
        //         let hbox = new St.BoxLayout({ vertical: false });
        //         hbox.add_child(new St.Label({ text: action }));
        //         hbox.add_child(new St.Label({ text: shortcut, x_expand: true }).get_clutter_text().set_use_markup(true));

        //         hbox.get_children()[0]);
        //         this.vbox.add_child(hbox);
        //     });
        // });

        // this.vbox.add_child(new St.BoxLayout({ vertical: false, style_class: 'draw-on-gnome-helper-separator' }));

        Shortcuts.INTERNAL_KEYBINDINGS.forEach((settingKeys) => {
            this.vbox.add_child(new St.BoxLayout({ vertical: false, style_class: 'draw-on-gnome-helper-separator' }));

            if (!this._extension.internalShortcutSettings.get_strv(settingKeys)[0])
                return;

            let hbox = new St.BoxLayout({ vertical: false });
            let shortcut = this._extension.internalShortcutSettings.get_strv(settingKeys)[0];
            shortcut = GLib.markup_escape_text(shortcut, -1);
            hbox.add_child(new St.Label({ text: this._extension.internalShortcutSettings.settings_schema.get_key(settingKeys).get_summary() }));
            let label = new St.Label({ text: "<b><i>" + shortcut + "</i></b>", x_expand: true })
            label.get_clutter_text().set_use_markup(true);
            hbox.add_child(label);
            this.vbox.add_child(hbox);
        });

        let mediaKeysSettings;
        try { mediaKeysSettings = this._extension.getSettings(MEDIA_KEYS_SCHEMA); } catch(e) { return; }

        this.vbox.add_child(new St.BoxLayout({ vertical: false, style_class: 'draw-on-gnome-helper-separator' }));
        this.vbox.add_child(new St.Label({ text: _("System") }));

        for (let settingKey of MEDIA_KEYS_KEYS) {
            if (!mediaKeysSettings.settings_schema.has_key(settingKey))
                continue;
            let shortcut = GS_VERSION < '3.33.0' ? mediaKeysSettings.get_string(settingKey) : mediaKeysSettings.get_strv(settingKey)[0];
            shortcut = GLib.markup_escape_text(shortcut, -1);
            if (!shortcut)
                continue;
            let hbox = new St.BoxLayout({ vertical: false });
            hbox.add_child(new St.Label({ text: mediaKeysSettings.settings_schema.get_key(settingKey).get_summary() }));
            let label = new St.Label({ text: "<b><i>" + shortcut + "</i></b>", x_expand: true })
            label.get_clutter_text().set_use_markup(true);
            hbox.add_child(label);
            this.vbox.add_child(hbox);
        }
    }

    showHelp() {
        if (!this.vbox)
            this._populate();

        this.opacity = 0;
        this.show();

        let maxHeight = this.monitor.height * 3 / 4;
        this.set_height(Math.min(this.height, maxHeight));
        this.set_position(Math.floor(this.monitor.width / 2 - this.width / 2),
                          Math.floor(this.monitor.height / 2 - this.height / 2));

        // St.PolicyType: GS 3.32+
        if (this.height == maxHeight)
            this.vscrollbar_policy = St.PolicyType ? St.PolicyType.ALWAYS : 1;
        else
            this.vscrollbar_policy = St.PolicyType ? St.PolicyType.NEVER : 0;

        if (Tweener) {
            Tweener.removeTweens(this);
            Tweener.addTween(this, { opacity: 255,
                                     time: HELPER_ANIMATION_TIME,
                                     transition: 'easeOutQuad' });
        } else {
            this.remove_all_transitions();
            this.ease({ opacity: 255,
                        duration: HELPER_ANIMATION_TIME * 1000,
                        transition: Clutter.AnimationMode.EASE_OUT_QUAD });
        }
    }

    hideHelp() {
        if (Tweener) {
            Tweener.removeTweens(this);
            Tweener.addTween(this, { opacity: 0,
                                     time: HELPER_ANIMATION_TIME,
                                     transition: 'easeOutQuad',
                                     onComplete: this.hide.bind(this) });
        } else {
            this.remove_all_transitions();
            this.ease({ opacity: 0,
                        duration: HELPER_ANIMATION_TIME * 1000,
                        transition: Clutter.AnimationMode.EASE_OUT_QUAD,
                        onComplete: this.hide.bind(this) });
        }
    }
});

