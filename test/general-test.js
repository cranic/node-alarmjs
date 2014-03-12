var assert = require('assert');
var alarm = require(__dirname + '/../');
var moment = require('moment');

describe('General testing', function(){

    it('alarm should be a function', function(){
        assert(typeof alarm, 'function');
    });

    it('should throw if the mp3 file doesn\'t exists', function(done){
        (new alarm({
            file : 'this/doesn/exists'
        })).on('error', function(err){
            assert.ok(err.message.indexOf('MP3 file') !== -1 );
            done();
        });
    });

    it('should throw if the hour is not present', function(done){
        (new alarm({
            hour : null
        })).on('error', function(err){
            assert.ok(err.message.indexOf('pass a hour') !== -1 );
            done();
        });
    });

    it('should throw if the hour is not a number', function(done){
        (new alarm({
            hour : 'not a number'
        })).on('error', function(err){
            assert.ok(err.message.indexOf('number') !== -1 );
            done();
        });
    });

    it('should throw if the minutes are not a number', function(done){
        (new alarm({
            hour : 12,
            minutes : 'not a number'
        })).on('error', function(err){
            assert.ok(err.message.indexOf('number') !== -1 );
            done();
        });
    });

    it('should throw if the seconds are not a number', function(done){
        (new alarm({
            hour : 12,
            seconds : 'not a number'
        })).on('error', function(err){
            assert.ok(err.message.indexOf('number') !== -1 );
            done();
        });
    });

    it('should emit #stop', function(done){
        var a = new alarm({
            hour : moment().hours() + 1
        }).on('stop', function(){
            done();
        });
        setTimeout(function(){
            a.stop();
        }, 500);
    });

    it('should emit #tick', function(done){
        var a = new alarm({
            hour : moment().hours() + 1
        }).on('tick', function(){
            done();
            a.stop();
        });

    });

    it('should emit #on', function(done){
        var a = new alarm({
            hour : moment().hours(),
            minutes : moment().minutes(),
            seconds : moment().seconds() + 1
        }).on('on', function(){
            a.stop();
            done();
        });
    });

    it('should emit #off', function(done){
        var a = new alarm({
            hour : moment().hours(),
            minutes : moment().minutes(),
            seconds : moment().seconds() + 1
        }).on('off', function(){
            done();
        });

        setTimeout(function(){
            a.stop();
        }, 1500);
    });
});
