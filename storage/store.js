const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname,'../data','products.json');

function readProduct(){
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath,'utf-8')
    return JSON.parse(data)
}

function writeProduct(products){
    fs.writeFileSync(filePath,JSON.stringify(products,null,2))
}

module.exports = { readProduct , writeProduct }