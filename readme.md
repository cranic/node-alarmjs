[![Build Status](https://travis-ci.org/cranic/node-alarmjs.png)](https://travis-ci.org/cranic/node-alarmjs)
[![Dependencies Status](https://david-dm.org/cranic/node-alarmjs.png)](https://david-dm.org/cranic/node-alarmjs)
[![Gittip](http://img.shields.io/gittip/cranic.png)](https://www.gittip.com/cranic)

[![NPM Status](https://nodei.co/npm/alarmjs.png?downloads=true)](http://npmjs.org/package/alarmjs)


## AlarmJS

An easy way to setup an alarm clock in your terminal or inside your scripts.

#### Instalation

To use `alarmjs` you need to install some libraries:

```bash
$ sudo apt-get install libasound2-dev
```

#### Command line usage

Install `alarmjs` with `sudo npm install -g alarmjs` and you are ready to go:

```bash
Usage: alarmjs [options]

Options:

-h, --help              output usage information
-V, --version           output the version number
-f, --file [Path]       An MP3 file to be played
-o, --hour <Number>     The hour that the alarm will start
-m, --minutes [Number]  The minutes that the alarm will start
-s, --seconds [Number]  The seconds that the alarm will start

Examples:

$ alarmjs --hour 8 --minutes 30 --file ~/music/AC_DC/TNT.mp3
$ alarmjs --hour 8

```

#### API usage

To use `alarmjs` as a module, you need to install it with `npm install --save alarmjs`
inside your project's folder, then you are reay to go, here is an usage example:

```javascript
var alarm = require(__dirname + '/../');

var a = new alarm({
    hour : 12,
    minutes : 40
});

a.on('error', function(err){
    throw err;
});

a.on('on', function(){
    console.log('ALARM WENT ON!');

    a.stop();
});
```

#### MIT License

Copyright (c) 2009-2013 Cranic Tecnologia e Informática LTDA

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
