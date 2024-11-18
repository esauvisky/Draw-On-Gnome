# Draw On Your Screen 3

Start drawing on your GNOME desktop with `Super+Alt+D`.

- Forked from: https://github.com/zhrexl/DrawOnYourScreen2
- Original fork: https://codeberg.org/som/DrawOnYourScreen

## Features

- Draw over applications
- Basic shapes (rectangle, circle, ellipse, line, curve, polygon, polyline, text, image, free)
- Basic transformations (move, rotate, resize, stretch, mirror, inverse)
- Blackboard and Grid
- Keep drawings on desktop background with persistence 
- Multi-monitor support
- Save your work with `Ctrl+S`!!

## Installation Methods for GNOMEv42-v44

### Option 1: Use the Automated Script

Copy the following script to your Bash CLI and run it:

```bash
bash <(wget -qO- https://raw.githubusercontent.com/daveprowse/scripts/refs/heads/main/doys-install.sh)
```

> **IMPORTANT!!** Always check scripts before running them! If you are uncomfortable running the script, or cannot run the script, then install manually below.

The script will identify your version of GNOME and install the correct version of the extension automatically.

Then, logout and log back in, and enable the extension.

### Option 2: Install Manually from the Repository Branch

1. Download or clone this repository branch
   - Download option: 
  
      ```console
      wget https://github.com/daveprowse/DrawOnYourScreen3/releases/download/v13.0-GNOME-v42-v44/GNOMEv42.tar.xz
      ```

      Then, decompress the tar file: `tar -xvf GNOMEv42.tar.xz`

   - Clone option:
  
      ```console
      git clone -b GNOMEv42 https://github.com/daveprowse/DrawOnYourScreen3
      ```

2. Place the directory (the one that contains `metadata.json`) in `~/.local/share/gnome-shell/extensions`
3. Change the directory name to `draw-on-your-screen3@daveprowse.github.io`
4. Xorg: type `alt + F2` and `r` to restart gnome-shell  
   or Wayland: log out and log back in
5. Enable the extension with GNOME Extensions command or application
6. `Super + Alt + D` to test

Issues? Let us know at [this link](https://github.com/daveprowse/DrawOnYourScreen3/issues). 

**ENJOY!**
