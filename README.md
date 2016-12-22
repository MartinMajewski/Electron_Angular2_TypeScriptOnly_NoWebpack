# Sample application using only the TypeScript compiler and a copyfile script to deploy a working Electron app!

Tired of trying to make other boilerplate projects run with all the fancy tech like WebPack?
I was and I am, as I simply want to write a cross platform running application using TypeScript and Angular 2 with the Electron framework.

To be honest: I tried to make a functional WebPack config, but as there are no good information on how to setup WebPack for Electron AND Angular2 I was lost.
A lot of examples are outdated and not functional.
Finally I found one example project, that used WebPack - but in an odd way. It bundled all the Angular2 related files that is also transpiled from the TypeScript sources.
The main process however, that are all the Electron related files, had to be inside the destination / build folder from the start. Furthermore they had to be JavaScript files (I hate JavaScript... such a nasty "everything is a runtime error" language).

As a "web dev beginner" it was a steep way until I understood how to get rid of WebPack and write an application for Electron using purely TypeScript.
So here it is.

To get everything to work follow these steps (make sure you have Node.js and NPM installed and functional)
Clone this project to your drive and open a CLI / Bash / Terminal pointing to the root directory of the downloaded (and unpacked) project.
Then...

```bash

# Install every dependency by running...
npm install

# Because this project uses node-serialport to show some low level capabilities, 
# we have to recompile it for Electron. 
# This has to be done only once after installing this particular node module.
npm run-script serialport-rebuild

# Build the application with the provided script 
# inside of the package.json file, by running the command...
npm run build


```

## What does the build script do?

It fires up the TypeScript compiler, that reads the tsconfig.json file from the project's folder.
The compiler "transpiles" all TypeScript (.ts) files into JavaScript files, placing them into the /dist folder.
Then two scripts copy the main index.html and electron's own package.json file over to the /dist folder.
Finally the Electron executable starts running the electron.js file (declared inside electron's package.json file) and showing up the application.

Additionally Chrome DevTools are started as well.
As this project implements the Redux dataflow system using ng2-redux bindings, I included the redux devtool plugin as well as the Electron "devtron" plugin.
So you can simply use the Chrome DevTools to get a lot of information about the running app and the app state.

## What does this sample application demonstrate?

It is a small application that shows you your currently available serial ports on the host machine.
Nothing special, but it shows two main concepts of an Electron app that were not so clear to me at the beginning:

1. Electron runs two processes. A main and a renderer process. Capabilities of an Electron App like accessing the hard drive, or serial ports are only available to the main process. The renderer process is still an encapsulated web page.
2. To get access to the "low level" APIs of the main process inside your renderer process (aka. the Angular 2 part), you need to use IPC calls (similar to WebSockets).

## Visual Studio Code

I left my Visual Studio Code settings inside the .vscode folder for you.
There is also a launch.json file for debugging the application from VSCode.
I don't know if it works right now, but I will test this out and report back.
If you are experienced with the VSCode debugger regarding an Electron app, please share your knowledge.

Please report errors, typos and problems as Git-Issues. Thank you.


Have fun programming!  
Martin

## Follow me on

- www.martinmajewski.net
- Thingiverse: www.thingiverse.com/MartinMajewski
- Instagram: www.instagram.com/martinjmajewski
- Twitter: www.twitter.com/MMajewskiNet
- YouTube: www.goo.gl/QJTQKv