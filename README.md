Msic_RCMD Documentation
How to start servers
From the root directory(plum/src), run the following:
npm install

Enter the React directory(plum/src/client) and run the following (It may take a few minutes):
npm install

Back to the root directory(plum/src) run:
npm run dev
Font-end(React) server and back-end(Express) server will both start.

If one server exits or fails, the other will exit or fail concurrently.

Components structure
App 
|---Header  
|   |---Search  
|   |---Login
|
|---Navigation
|   |---Filer
|   |---FilterControl
|
|---Music
|   |---Toolbar
|   |---Item
|   |   |---Field
|   |   |---Button (Save + Delete)
|   |
|   |---EditPopup
|   |---AddPopup
|   
Assignments
Hongbin Li
Components:

App(Included)  
|--Header  
|  |--Search  
|  |--Login  
Server: Skeleton

Fing Fu
Components:

|---Navigation
|   |---Filer
|   |---FilterControl
Server: Services

Zhongyu Shi
Components:

|---Music(Included)
|   |---EditPopup
|   |---AddPopup
Guodong Shi
Components:

|   |---Toolbar
|   |---Item
|   |   |---Field
|   |   |---Button (Save + Delete)
Directory and file memo
plum/src/client - For client(React) code.
plum/src/obsolete - For obsolete versions.
plum/src/public - For static files on back-end server(Express).
plum/src/server.js - App entry.
plum/src/music.js - Music data.
plum/src/client/public - For index.html and css test.
plum/src/client/src - For React components.
plum/src/client/src/images - For image files on front-end server.
plum/src/client/src/script - For auxiliary functions in components.
plum/src/client/src/script/services.js - Get and post services.
Specifications
Naming
className - "class-name-bla-bla"
component name - Starts with a upper letter (eg: 'Header'). Do not contain uncertain abbr. (eg: MRButton - Music Recommendation)
Defining components
functional component - Use it when the component has no own states.
ES6 class component - Use it when the component has state/data/Refs.
Do not use inheritance instead of composition to create components.
Auxiliary functions
Extract them out to ./script folder and import them back into compoments.
Extracting components
Split components as appropriate small. (It means that the smallest component is able to reuse.)
Others
Test code before pulling merge request.
Make personal work firstly and ASAP.
Try to use the internet (eg: Official docs) to solve your problem at first. Then ask.
