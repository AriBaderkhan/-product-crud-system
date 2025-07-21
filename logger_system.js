const fs = require('fs');
const path = require('path');
const EventEmitter  = require('events');
const emitter = new EventEmitter();

const folderPath = path.join(__dirname,'logs_folder');

if (!fs.existsSync(folderPath)) {
    fs.mkdir(folderPath)
}

emitter.on('logs',(msg)=>{
    fs.appendFile(path.join(folderPath,'logs.txt'), msg+'\n',(err)=>{
        if(err) return console.log(err);
    })
})

const logMorgan = fs.createWriteStream(path.join(folderPath,'logsMorgan.txt'),{flags:'a'})


module.exports= { emitter , logMorgan }