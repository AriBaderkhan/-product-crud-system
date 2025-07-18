const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname,"../data/products.json");

function writeProduct(products){
    fs.writeFileSync(filePath,JSON.stringify(products,null,2))
}


function readProduct(){
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath,[])
    }
    const data = fs.readFileSync(filePath,'utf-8')
    return JSON.parse(data)
}

module.exports = { readProduct , writeProduct }