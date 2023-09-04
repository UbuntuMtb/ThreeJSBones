# ThreeJSBones
Experimentation with Three js bones and CCD IK solver

To start a local server for this this project:
* Install LiveServer extension.
* Click "Go Live" on right bottom bar of VSC.

To have autocomplete and intellisense working for this javascript project:
* Install npm:
  * sudo apt install npm
* To install npm javascript typing for this project, on a console at the project root director type: 
  * npm init -y
  * npm install @types/three --save-dev
* Update "main" entry in package.json file to the main.js file that requires intellisense / autocompletion (MainToyArm.js for now).

To debug without a launch.json file:
* Install Live Server extension.
* Press "Go Live" on bottom right status bar to start the local web server.
* Select the main html page.
* Click Run and Debug on VSC left bar, then click the play button.
* If there is a breakpoint in the code, the debugger will stop there.

To Debug the app you could also run a local web server and request VSC to open the project root folder using chrome and the web server:
* Install Live Server extension.
* Press "Go Live" on bottom right status bar to start the local web server. It will display the port used (currently 5500).
* A browser will open, close it.
* Close all files on editor.
* Click Run and Debug on VSC left bar.
* Select Web App [Chrome]
* Launch.json file will be added to the project, update the port entry to 5500 within the file.
* Click Play with "Launch Chrome against localhost" configuration"
* Chrome will open showing the files on the root directory, on the broswer select the html you want to run.
* If there is a breakpoint in the html/javascript files running, VSC will stop there.

Happy coding!

Note:
Once you create a "Launch Chrome against localhost" configuration, the debugging without launch.json file will not work. Stop the live server and erase the launch.json file to use that option git again.

References:
* https://discourse.threejs.org/t/three-js-autocomplete-with-vs-code/1636/8
* https://www.youtube.com/watch?v=zBJXXcFy6iU
* https://www.reddit.com/r/threejs/comments/uqhl2z/how_to_configure_intellisense_for_threejs_in
* https://code.visualstudio.com/docs/nodejs/working-with-javascript
* https://www.youtube.com/watch?v=68wO-sl5vXg