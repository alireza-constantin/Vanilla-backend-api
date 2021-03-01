let products = require('../data/products.json');
const { v4 : uuidv4} = require('uuid');
const { addFileToData } = require('../utils')

function getAll(){
    return new Promise((res, rej)=>{
        res(products);
    })
}
function findById(id){
    return new Promise((res, rej)=>{
        const product = products.find((p)=> p.id === id);
        res(product);
    })
}
function create(product){
    return new Promise((res, rej)=>{
        let newProduct = {id: uuidv4() ,...product};
        products.push(newProduct);
        addFileToData('./data/products.json', products)
        res(newProduct);
    })
}

function update(id, product){
    return new Promise((res, rej)=>{
        let index = products.findIndex(p => p.id === id);
        products[index] = {id,...product};
        addFileToData('./data/products.json', products)
        res(products[index]);
    })
}
function remove(id){
    return new Promise((res, rej)=>{
        products = products.filter(p => p.id !== id)
        addFileToData('./data/products.json', products)
        res();
    })
}
module.exports = {
    getAll,
    findById,
    create,
    update,
    remove
}