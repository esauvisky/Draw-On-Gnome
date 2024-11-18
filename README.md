# Draw On Your Screen 3

Start drawing on your GNOME desktop with `Super+Alt+D`.

- Forked from: https://github.com/zhrexl/DrawOnYourScreen2
- Original fork: https://codeberg.org/som/DrawOnYourScreen

## Features

- Basic shapes (rectangle, circle, ellipse, line, curve, polygon, polyline, text, image, free)
- Basic transformations (move, rotate, resize, stretch, mirror, inverse)
- Smooth stroke
- Draw over applications
- Keep drawings on desktop background with persistence (notes, children's art ...)
- Multi-monitor support
- Initial stylus support
- Export to SVG

## Install

**Use the following script:**

# curl -s https://github.com/daveprowse/scripts/blob/main/doys-install.sh | bash

```bash
wget -O - https://raw.githubusercontent.com/daveprowse/scripts/refs/heads/main/doys-install.sh && chmod +x doys-install.sh && bash -c ./doys-install.sh
```

The script will identify your version of GNOME and install the correct version of the extension automatically.

Then, logout and log back in, and enable the extension.

**Or install manually:**

1. Download and decompress or clone the repository
2. Place the directory (the one that contains `metadata.json`) in `~/.local/share/gnome-shell/extensions`
3. **Change the directory name** to `draw-on-your-screen3@daveprowse.github.io`
4. Xorg: type `alt + F2` and `r` to restart gnome-shell  
   Wayland: restart session
5. Enable the extension with GNOME Extensions application
6. `Super + Alt + D` to test
7. Issues? Let us know at [this link](https://github.com/daveprowse/DrawOnYourScreen3/issues). 

**ENJOY!**
