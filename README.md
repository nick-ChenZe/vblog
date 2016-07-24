# Vblog（Developing）

![logo](./logo.png)A spa blog without any database based on Vue.js

``
## Usage
```js
npm run generate //generate data file
npm run dev      // start hot loader on localhost:8080
npm run build    // buill bundle file
```
## Directory
```
.
├── LICENSE
├── README
├── README.md
├── _config.yml     //TODO To config the file path
├── api             //List for JSON file that FE can request
├── build.js        //Generate the JSON file
├── dist            //Output folder for bundle Javascript file
├── favicon.ico     //logo
├── index.html      //re render from index template
├── lib             //for some front Javascript library
├── node_modules 
├── package.json   
├── photo           //Folder for photo ,minify file is in api folder
│   ├── photo.yml   //Yaml for photo list,see the template
├── post			//Folder for markdown,input entry
├── src             //For Vue compontents
└── webpack.config.js
```

##TODO


- [ ] searching
- [x] comment box style
- [ ] rewrite node process to promise
- [x] 404 error design
- [ ] post page design
- [ ] abstract vue compontents to compontents and viewsn

## LICENSE
Copyright (c) 2015 nick-ChenZe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
