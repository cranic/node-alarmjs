var moment  = require('moment');
var fs = require('fs');
var events = require('events').EventEmitter;
var Promise = require('bluebird');
var player = require('player');

/**
 * AlarmJS, an alaram clock for Node.js and the command line.
 *
 * @class Alarm
 * @public
 * @constructor
 * @param {Object} config A config object
 * @param {String} [config.file=asset/alarm.mp3] A path to a MP3 file to be player
 * @param {Number} config.hour The hour when the alarm will go on
 * @param {Number} [config.minutes=0] The minutes where the alarm will go on
 * @param {Number} [config.seconds=0] The seconds where the alarm will go on
 * @returns {Object} An event emitter
 * @example
 *     var alarm = require('alarmjs');
 *     var a = new alarm({
 *         file : 'musics/AC_DC/TNT.mp3',
 *         hour : 8,
 *         minutes : 34,
 *         seconds : 30
 *     });
 */
var Alarm = function(options){
    if((!this instanceof Alarm))
        return new Alarm(options);

    var self = this;

    // The default configuration values
    var defaults = {
        file : __dirname + '/../asset/alarm.mp3',
        hour : null,
        minutes : 0,
        seconds : 0,
    };

    var privates = {
        stop : false,
        timer : null
    };

    var tick = function(date){
        if(privates.stop)
            return;

        var current = moment();

        if(date.isAfter(current)){
            privates.timer = setTimeout(function(){
                self.emit('tick', {
                    current : current,
                    start : date
                });

                tick(date);
            }, 1000);

            return;
        }

        var p = new player(defaults.file);

        p.on('stopped', function(){
            p.play();
        });

        p.play();
        self.emit('on');
        self.once('stop', function(){
            p.stop();
            self.emit('off');
        });
    };

    self.on('stop', function(){
        privates.stop = true;
        if(privates.timer)
            clearTimeout(privates.timer);
    });

    // Extending the default configurations
    if(options)
        Object.keys(options).forEach(function(key){
            if(defaults.hasOwnProperty(key))
                defaults[key] = options[key];
        });

    setImmediate(function(){

        Promise.resolve().then(function(resolve){

            return new Promise(function(resolve){

                // Check if the MP3 file exists
                fs.exists(defaults.file, function(exists){
                    resolve(exists);
                });
            });

        }).then(function(exists){

            // Check if all options are valid
            if(!exists)
                throw new Error('The MP3 file doesn\'t exists.');

            if(!defaults.hour)
                throw new Error('You need to pass a hour to the alarm.');

            if(typeof defaults.hour !== 'number')
                throw new Error('The hour must be a number.');

            if(typeof defaults.minutes !== 'number')
                throw new Error('The minutes must be a number.');

            if(typeof defaults.seconds !== 'number')
                throw new Error('The seconds must be a number.');

            return;

        }).then(function(){
            var date = moment()
                .hours(defaults.hour)
                .minutes(defaults.minutes)
                .seconds(defaults.seconds);

            if(date.isBefore(moment()))
                date.add('days', 1);

            tick(date);
        }).catch(function(err){
            self.emit('error', err);
        }).done();
    });
};

Alarm.prototype = events.prototype;

Alarm.prototype.stop = function(){
    this.emit('stop');
};

module.exports = Alarm;


