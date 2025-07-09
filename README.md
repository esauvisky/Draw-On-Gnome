# Draw On Gnome

Annotate your GNOME™ desktop with **`Super+Alt+D`**.

Documentation is **[here](https://daveprowse.github.io/Draw-On-Gnome/)**. For news, click **[here](https://daveprowse.github.io/Draw-On-Gnome/blog/)**.

Thank you to all the contributors! 😎

## Features

- Draw over applications
- Basic shapes (rectangle, circle, ellipse, line, curve, polygon, polyline, arrow, text, image, free)
- Basic transformations (move, rotate, resize, stretch, mirror, inverse)
- Blackboard and Grid
- Keep drawings on desktop background with persistence
- Multi-monitor support
- Save your work with `Ctrl+S`!!

## Requirements

- GNOME Shell 47+
- Linux distribution with GNOME desktop environment

## Installation

### Option 1: Download from GitHub Releases (Recommended)

1. Go to the [Releases page](https://github.com/daveprowse/Draw-On-Gnome/releases)
2. Download the latest `draw-on-gnome-extension.zip` file
3. Extract the zip file:
   ```bash
   unzip draw-on-gnome-extension.zip
   ```
4. Install the extension:
   ```bash
   cp -r draw-on-gnome@daveprowse.github.io ~/.local/share/gnome-shell/extensions/
   ```
5. Restart GNOME Shell:
   - On X11: Press `Alt+F2`, type `r`, and press Enter
   - On Wayland: Log out and log back in
6. Enable the extension:
   ```bash
   gnome-extensions enable draw-on-gnome@daveprowse.github.io
   ```

### Option 2: Install from Source

1. Clone the repository:
   ```bash
   git clone https://github.com/daveprowse/Draw-On-Gnome.git
   cd Draw-On-Gnome
   ```

2. Build and install:
   ```bash
   make install
   ```

3. Restart GNOME Shell and enable the extension as described above.

### Option 3: Extensions Website

> Note: We are working on getting the extension approved by GNOME so that it will be listed on https://extensions.gnome.org (E.G.O.)

> Stay tuned! Click [here](https://daveprowse.github.io/Draw-On-Gnome/blog/) for updates.

## Usage

1. Press `Super + Alt + D` to enter drawing mode
2. Use your mouse or touchpad to draw on the screen
3. Press `Ctrl + F1` to see all available keyboard shortcuts
4. Right-click to access the context menu with tools and options
5. Press `Super + Alt + D` again to exit drawing mode

## Development

### Building the Extension

To build the extension for distribution:

```bash
make build
```

This will create a `build/draw-on-gnome@daveprowse.github.io.zip` file ready for installation.

### Development Setup

1. Clone the repository
2. Compile the schemas:
   ```bash
   make dev
   ```
3. Create a symbolic link for development:
   ```bash
   ln -s $(pwd) ~/.local/share/gnome-shell/extensions/draw-on-gnome@daveprowse.github.io
   ```

### Available Make Targets

- `make build` - Build the extension package
- `make install` - Build and install the extension locally
- `make uninstall` - Remove the extension
- `make clean` - Clean build artifacts
- `make dev` - Compile schemas for development

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Documentation

📖 For detailed documentation see **[Draw On Gnome Documentation](https://daveprowse.github.io/Draw-On-Gnome/)**.

> Documentation is generated using Material for Mkdocs. Check it out:
> [![Built with Material for MkDocs](https://img.shields.io/badge/Material_for_MkDocs-526CFE?style=for-the-badge&logo=MaterialForMkDocs&logoColor=white)](https://squidfunk.github.io/mkdocs-material/)

## Credits

Thanks to the original author and past maintainers:

- Forked from: https://github.com/zhrexl/DrawOnYourScreen2
- Original work: https://codeberg.org/som/DrawOnYourScreen

## License

This project is licensed under the GNU General Public License v3.0 - see the [COPYING](COPYING) file for details.
