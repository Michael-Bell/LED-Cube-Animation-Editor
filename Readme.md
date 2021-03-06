LED Cube Animation Editor
=========================

For creating LED Cube animations for a 4x4x4 Cube.

## Using the scripts
Right now you need to manually change the led pins from my pin out to yours, I will work on a localstorage option for saving your pin numbers. 

## Todo
- [ ] A better UI
    - [ ] responsive
    - [ ] better canvas sizing
    - [ ] checkboxes stay in grids
    - [ ] foundation seems heavy, something lighter would be nice
    - [ ] Fix issues with Cube Controls
    - [ ] Remove Overflow: hidden
- [x] Allow Users to enter their Pin Numbers
- [ ] Add code to allow direct upload to Cube on server 
    - [ ] Allow building of site with this disabled for Github Pages
- [x] Local Storage with Basil.js
    - [x] Save User Pin Numbers
    - [ ] Save Animations
- [ ] Saving of Frames, allow for editing
- [x] ReWrite Code for storing Animations - Store frames as Objects with Sub objects for each LED with X,Y,Z,On/OFF Bool?
    - [ ] Rewrite the code for exporting animations as B0000 then...
- [ ] Allow for sharing of animations? Export JSON with all Frames?
- [x] Have Virtual Cube support Playback of Animations
- [ ] Find a better way to store the script than broken up variables
- [ ] add xyz lines to cube to keep user oriented
- [ ] Is it possible to remove checkboxes and have LEDs toggled by touching corresponding dot on the Cube? Possibly bad UI if requires spinning of cube constantly
- [ ] Clean up JS Folder
- [ ] Slider to control animation speed
    - [ ] changes virtual speed
    - [ ] matches cube speed

## Contributing
Help is awesome, write your code and submit a pull request.

## How to edit Arduino Script
For now, open the ino file and make your changes. Run the script through this [site](http://www.freeformatter.com/javascript-escape.html), and update the app.js variables.

## 3D Viewer
3D Viewer uses Three.js and borrows code from [ledcube-webgl](https://github.com/ultrafez/ledcube-webgl) by [ultrafez](https://github.com/ultrafez)

## License
GPLv3