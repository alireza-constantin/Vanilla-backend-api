const {findById, getAll, create, update, remove} = require('../models/productModels');
const { postPutHelper } = require('../utils')
// @dec Getting all product
// @route api/products
async function getProducts(req, res){

    try {
        let products = await getAll();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(products));
    } catch (err) {
        console.log(err);
    }
}

// @dec Getting single product
// @route api/products/:id
async function getProductsById(req, res, id){

    try {
        let singleProduct = await findById(id);

        if(!singleProduct){
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message : 'Product Not Found'}));            
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(singleProduct));
        }
    } catch (err) {
        console.log(err);
    }
};

// @dec create a product
// @route api/products
async function createProduct(req, res){

    try {
        const body = await postPutHelper(req);
        const { title, description, price } = JSON.parse(body);
        const product = {
            title,
            description,
            price,
        }
        let newProduct = await create(product);

        res.writeHead(201, {"Content-Type": "application/json"});
        res.end(JSON.stringify(newProduct));
    } catch (err) {
        console.log(err);
    }
}
// @dec update a product
// @route PUT api/products/:id
async function updateProduct(req, res, id){

    try {
        const product = await findById(id);

        if(!product){
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message : 'Product Not Found'}));
        } else {
            const body = await postPutHelper(req);
            const { title, description, price } = JSON.parse(body);
            let productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
        }
        let updProduct = await update(id, productData);

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(updProduct));
        }
        
    } catch (err) {
        console.log(err);
    }
}

// @dec Delete product
//  @route DELETE api/products/:id
async function deleteProduct(req, res, id){

    try {
        let singleProduct = await findById(id);

        if(!singleProduct){
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message : 'Product Not Found'}));            
        } else {
            await remove(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: `Products with id ${id} removed.`}));
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
}