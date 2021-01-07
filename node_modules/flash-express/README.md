

## Flash Express
Express.js flash notifications that can work with any template engine.  
Flash Messages for your Express Application with simple and beautifull pop-up flash.

## Installation

  Works with Express 3.x.x

    npm install flash-express  
    npm install git://github.com/deveshgoyal/flash-express.git

## Usage

  Set it up the same way you would `ExpressJs`:

``` javascript
  var flash = require('flash-express'),
      express = require('express'),
      app = express();
      
  app.use(flash());
```

Use `res.flash( msg [, type ] [, option ])` in your middleware. `res.flash()` accepts three parameters  
1.) text to be showen in the flash  
2.) type of the flash('success','error','info','warn')  
3.) options to be used such as time duration, postion etc.  

 `res.flash('welcome')` will generate a sucess flash.

``` javascript
  app.get('/', function (req, res) {
    res.flash('Welcome');
    res.render('index', {
      title: 'Home'
    })
  });
```

Access the messages in your views by just importing the following script before the end of body tag.  

In case of html/hbs  
``` html
  ...
  <script type="text/javascript" src="flash/flash-client.js"></script>
  </body>
  ...
```

#And you are done. 
 A beautifull flash will pop on the screen.
 
 ![alt tag](https://drive.google.com/uc?id=0B4fau-D6sg2rU0xMWXVnNmxmbWs)
 

##Parameters

#Text/message
it can be any text is `string` format

#Type

Type can be of four kinds 

`success`

default type is success. The following code will generate success flash

``` javascript
  app.get('/addFlash', function (req, res) {
    res.flash('Flash Message Added');
    res.redirect('/');
  });
  //or you can use this.
  app.get('/addFlash', function (req, res) {
    res.flash('Flash Message Added','success');
    res.redirect('/');
  });
```

![alt tag](https://drive.google.com/uc?id=0B4fau-D6sg2rMUhsbF9Ba1NqN3M)



`info`

``` javascript
    ...
    res.flash('You are using Flash Express.','info');
    ...
```

![alt tag](https://drive.google.com/uc?id=0B4fau-D6sg2rWUE2bTMzSmcxWVE)



`error`

``` javascript
    ...
    res.flash('Invalid Username','error');
    ...
```

![alt tag](https://drive.google.com/uc?id=0B4fau-D6sg2rS01NeU9rMFhwWnM)



`warn`

``` javascript
    ...
    res.flash('Developers don\'t care about warning!','warn');
    ...
```

![alt tag](https://drive.google.com/uc?id=0B4fau-D6sg2rNEhiVEdENWV4azQ)

#option
option define the behaviour of the flash.  

`Position` will define the position of the flash. You can define 8 different position.  
Posible values can be :-  

tr - top-right (default)  
r  - right  
br - bottom-right  
b  - bottom  
bl - bottom-left  
l  - left  
tl - top-left  
t  - top  

`duration` will define the duration is milliseconds for which the flash. Default value is 2000 ie 2s. 

```javascript
    app.get('/', function (req, res) {
      var option = {
        position:"t",
        duration:"1500"
      };
      res.flash('Flash Message Added',option);
      res.redirect('/');
    });
```

## License 

(The MIT License)

Copyright (c) 2016 DEVESH GOYAL &lt;me@deveshgoyal.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
