const path              = './fs-json/cartsFS.json'
const fs                = require('fs')
const ProductsManagerFs = require('./products.managers')



class CartManagerFS {

    constructor(){
        this.path = path
        this.productsManager = new ProductsManagerFs()
    }

    //Carga los registros de carritos desde FS
    readCart = async () => {
        try {
            if(fs.existsSync(path)){
                const cartsJson = await fs.promises.readFile(path, 'utf-8')
                const cartsJS = JSON.parse(cartsJson)
                return cartsJS
            }
        } catch (error){
            console.log(error);
        }
        return []
    };


    //* CRUD de Carritos

    // POST Crear Carritos en FS
    createCart = async newCart => {
        try{
            const carts = await this.readCart()


            // ID autoincremental
            if(carts.length === 0){
                newCart.id = 1
            } else {
                newCart.id = carts[carts.length - 1].id + 1
            }

            newCart.product = []

            //Estructura del Registro
            const cartsToSave = {
                id: newCart.id,
                Products: newCart.product,
            }
           
            carts.push(cartsToSave)

            await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'))
            return  newCart

        } catch(error) {
            console.log(error)
            throw error
        }
    };


    // GET Obtener Carritos por el ID desde FS
    getCartById = async (id) => {
        try{
            const carts = await this.readCart()

            let cartById = carts.find(carts => carts.id === Number(id))

            // Valida que ID sea un numero y mayor a cero
            if (isNaN(id) || Number(id) <= 0) {
                throw new Error (`El ID '${id}' ingresado no es un ID válido`)
            } 
            //Valida si existen carritos en FS
            if (carts.length === 0) {
                throw new Error ('No existen Carritos en File System')
            }
            // Valida si encuentra el Carrito por el ID
            if(cartById){
                console.log(`Carrito ID '${id}' encontrado en File System`, cartById)
                return cartById
            } else {
                throw new Error (`Carrito ID '${id}' NO encontrado en File System`)
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    };


    // POST Añadir productos a carrito
    createProductToCart = async (idCart, idProduct, body) => {
        try{
        
        //Obtener Carritos por ID
        const carts = await this.readCart()
        const cartById = carts.find(cart => cart.id === Number(idCart))

        // Valida que ID sea un numero y mayor a cero
        if (isNaN(idCart) || Number(idCart) <= 0) {
            throw new Error (`El ID '${idCart}' ingresado no es un ID válido`)
        } 
        //Valida si existen Carrito en FS
        if (carts.length === 0) {
            throw new Error ('No existen Carritos en File System')
        }
        // Valida si encuentra el Carrito por el ID
        if(!cartById){
            throw new Error (`Carrito ID '${idCart}' NO encontrado en File System`)
        } 

        //Obtener Productos por ID
        const products = await this.productsManager.readProducts()
        const productById = products.find(product => product.id === Number(idProduct))
        
        // Valida que ID sea un numero y mayor a cero
        if (isNaN(idProduct) || Number(idProduct) <= 0) {
            throw new Error (`El ID '${idProduct}' ingresado no es un ID válido`)
        } 
        //Valida si existen productos en FS
        if (products.length === 0) {
            throw new Error ('No existen Productos en File System')
        }
        // Valida si encuentra el producto por el ID
        if(!productById){
            throw new Error (`Productos ID '${idProduct}' NO encontrado en File System`)
        } 


        const quantityBody = body.quantity

        // Verificar si el producto ya está en el carrito
        const existingProduct = cartById.Products.find(item => item.id === productById.id)

        if (existingProduct) {
            // Si ya existe, sumar la cantidad
            existingProduct.quantity += quantityBody
        } else {
            // Si no existe, agregar el nuevo objeto
            cartById.Products.push({ id: productById.id, quantity: quantityBody })
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))   
        return cartById

        } catch (error){
            console.log(error)
            throw error
        }
    };
};


module.exports = CartManagerFS







