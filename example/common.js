var alarm = require(__dirname + '/../');

var a = new alarm({
    hour : 12
});

a.on('error', function(err){
    throw err;
});

a.on('on', function(){
    console.log('ALARM WENT ON!');

    a.stop();
});
