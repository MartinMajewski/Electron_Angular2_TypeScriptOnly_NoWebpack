# Sample application using only the TypeScript compiler and a copyfile script to deploy a working Electron app!

Tired of trying to make other boilerplate projects run with all the fancy tech like WebPack?
I was and I am, as I simply want to write a cross platform running application using TypeScript and Angular 2 with the Electron framework.

To be honest: I tried to make a functional WebPack config, but as there are no good information on how to setup WebPack for Electron AND Angular2 I was lost.
A lot of examples are outdated and not functional.
Finally I found one example project, that used WebPack - but in an odd way. It bundled all the Angular2 related files that is also transpiled from the TypeScript sources.
The main process however, that are all the Electron related files, had to be inside the destination / build folder from the start. Furthermore they had to be JavaScript files (I hate JS... such a nasty "everything is a runtime error" language).

As a "web dev beginner" it was a steep way until I understood how to get rid of WebPack and write an application for Electron using purely TypeScript.
So here it is.

To get everything to work follow these steps (make sure you have Node.js and NPM installed and functional)
Clone this project to your drive and open a CLI / Bash / Terminal pointing to the root directory of the downloaded (and unpacked) project.
Then...

```bash

# Install every dependency by running...
npm install

# Build the application with the provided script 
# inside of the package.json file, by running the command...
npm run-script electronBuild


```

# What does the electronBuild script do?

It fires up the TypeScript compiler, that reads the tsconfig.json file from the project's folder.
The compiler "transpiles" all TypeScript (.ts) files into JavaScript files, placing them into the /dist folder.
Then two scripts copy the main index.html and electron's own package.json file over to the /dist folder.
Finally the Electron executable starts running the electron.js file (declared inside electron's package.json file) and showing up the application.

It is a small sample application that shows you your currently available serial ports on your computer.
Nothing special, but it shows two main concepts of an Electron app:

1. Electron runs two precoesses. A main and a renderer process. Capabilites of an Electron App like accessing the harddrive, or serial ports are only available to the main process. The renderer process is still an encapsulated web page.
2. To get access to the "low level" APIs of the main process inside your renderer process (aka. the Angular 2 part), you need to use IPC calls (similar to WebSockets).

Oh, and by the way: This app implements the Redux dataflow pattern by using the ng2-redux binding and this Git repository is initialized as GitFlow.

Please report errors, typos and problems as Git-Issues. Thank you.


Have fun programming!
Martin
