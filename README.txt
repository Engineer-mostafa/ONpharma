To Run App install:
----------------------------
    1- NodeJS


Then write in terminal:
----------------------------
    1- npm install express body-parser ejs nodemon


Then replace script object in the package.json file with this object:
-------------------------------------------------------------------------
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "npx nodemon app.js"
    },


Then wirte in the terminal:
-----------------------------
    1- npm start

The localhost that you listen in will appear in the terminal you should copy that in the localhost in the browser