const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

const outFile = './static/main.css'

sass.render({
    file: './main.scss',
    outFile: outFile,
    outputStyle: 'compressed',
}, (err, result) => {
    if(!err) {
        fs.writeFile(outFile, result.css, { encoding: 'utf8' }, err => {
            if(!err){
                console.log('CSS written')
            }else{
                console.error(err);
            }
        })
    }else{
        console.error(err);
    }
})