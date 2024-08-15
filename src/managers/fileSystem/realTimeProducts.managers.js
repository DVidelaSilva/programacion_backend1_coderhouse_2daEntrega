const fs    = require('fs')
const path  = './fs-json/productsFS.json'


class RealTimeProducts {

    constructor(){
        this.path = path
    };

    //Carga los registros de productos desde FS
    readProducts = async () => {
        try {
            if(fs.existsSync(path)) {
                const productsJson = await fs.promises.readFile(path, 'utf-8')
                const productsJS = JSON.parse(productsJson)
                return productsJS
            }     
        }catch(error) {
            console.log(error);
        }
        return [] 
    };

    // Crear Productos en FS
    createProducts = async newProduct => {
        try{
            const products = await this.readProducts()

            const productToSave = {
                id: newProduct.id,
                title: newProduct.title,
                description: newProduct.description,
                code: newProduct.code,
                price: newProduct.price,
                status: newProduct.status,
                stock: newProduct.stock,
                category: newProduct.category,
                thumbnails: newProduct.thumbnails
            }

            // ID autoincremental
            if(products.length === 0){
                productToSave.id = 1
            } else {
                productToSave.id = products[products.length - 1].id + 1
            }
            products.push(productToSave)

            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            return  newProduct

        } catch(error) {
            console.log(error)
            throw error
        }
    };

    // Obtener Productos desde el FS
    getProducts = async () => {
        try{
            const products = await this.readProducts()
            return products
        } catch(error) {
            console.log(error)
            throw error
        }
    };
};

module.exports = RealTimeProducts