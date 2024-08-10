const fs    = require('fs')
const path  = './fs-json/productsFS.json'


class ProductsManagerFs {

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



    //* CRUD de productos

    // GET Obtener Productos
    getProducts = async () => {
        try{
            const products = await this.readProducts()

            //Valida si existen productos en FS
            if (products.length === 0) {
                throw new Error ('No existen Productos en File System')
            }
            return products
        } catch(error) {
            console.log(error)
            throw error
        }
    };


    // GET Obtener Productos por el ID desde FS
    getProductById = async (id) => {
        try{
            const products = await this.readProducts()

            let productById = products.find(product => product.id === Number(id))

            // Valida que ID sea un numero y mayor a cero
            if (isNaN(id) || Number(id) <= 0) {
                throw new Error (`El ID '${id}' ingresado no es un ID válido`)
            } 
            //Valida si existen productos en FS
            if (products.length === 0) {
                throw new Error ('No existen Productos en File System')
            }
            // Valida si encuentra el producto por el ID
            if(productById){
                console.log(`Producto ID '${id}' encontrado en File System`, productById)
                return productById
            } else {
                throw new Error (`Producto ID '${id}' NO encontrado en File System`)
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    };


    // POST Crear Productos en FS
    createProducts = async newProduct => {
        try{
            const products = await this.readProducts()

            //Estructura del Registro
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

            //Validaciones de Campos a recibir
            
            // ID autoincremental
            if(products.length === 0){
                productToSave.id = 1
            } else {
                productToSave.id = products[products.length - 1].id + 1
            }

            // Validaciones Campos requeridos y validacion de tipo de datos
            if (!productToSave.title || typeof productToSave.title !== 'string') {
                throw new Error('El campo title no fue ingresado, o no es un texto')
            }
            if (!productToSave.description || typeof productToSave.description !== 'string') {
                throw new Error('El campo description no fue ingresado, o no es un texto')
            }
            if (!productToSave.code || typeof productToSave.code !== 'string') {
                throw new Error('El campo code no fue ingresado, o no es una texto')
            }
            if (!productToSave.price || typeof productToSave.price !== 'number') {
                throw new Error('El campo price no fue ingresado, o no es un numero')
            }
            if (productToSave.status !== false){
                productToSave.status = true
            }
            if (!productToSave.stock || typeof productToSave.stock !== 'number') {
                throw new Error('El campo stock no fue ingresado, o no es un numero')
            }
            if (!productToSave.category || typeof productToSave.category !== 'string') {
                throw new Error('El campo category no fue ingresado, o no es una texto')
            }
            if (productToSave.thumbnails && typeof productToSave.thumbnails !== 'string') {
                
                throw new Error('El campo thumbnails no es una texto')
            } else if (productToSave.thumbnails && typeof productToSave.thumbnails === 'string'){
                productToSave.thumbnails = productToSave.thumbnails;
            } else {
                productToSave.thumbnails = ''
            }

            

            products.push(productToSave)

            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            return  newProduct

        } catch(error) {
            console.log(error)
            throw error
        }
    };



    // PUT Actualizar Productos en FS
    updateProducts = async (id, updateFields) => {
        try{
            const products = await this.readProducts()

            // Capos validos para actualizar
            const productToUpdate = ['title', 'description', 'code', 'price', 'status', 'stock', 'category','thumbnails']  
            
            
            // Valida que ID sea un numero y mayor a cero
            if (isNaN(id) || Number(id) <= 0) {
                throw new Error (`El ID '${id}' ingresado no es un ID válido`)
            } 
            //Valida si existen productos en FS
            if (products.length === 0) {
                throw new Error ('No existen Productos en File System')
            }
            // Valida si encuentra el producto por el ID y Actualiza
            let productById = products.find(product => product.id === Number(id))
            if(productById){

                const indiceProducto = products.findIndex(product => product.id === Number(id))

                // Validacion Indice Valido
                if (indiceProducto === -1) {
                    throw new Error('Product not found')
                }

                const product = products[indiceProducto]
        
                for(let field in updateFields){
                    //Valida que se actualice un campo permitido
                    if(!productToUpdate.includes(field)){
                        throw new Error (`El campo '${field}' ingresado, no es valido`)
                    }
                    //Valida que no se modifique el valor de ID
                    if (field !== 'id'){
                        product[field] = updateFields[field]
                    }
                }
        
                fs.writeFileSync(path, JSON.stringify(products, null, '\t'))

            } else {
                throw new Error (`Producto ID '${id}' NO encontrado en File System`)
            }
        } catch (error){
            console.log(error)
            throw error
        }
    };



    // DELETE Eliminar Productos en FS
    deleteProducts = async (id) => {
        try{
            const products = await this.readProducts()

            // Valida que ID sea un numero y mayor a cero
            if (isNaN(id) || Number(id) <= 0) {
                throw new Error (`El ID '${id}' ingresado no es un ID válido`)
            } 
            //Valida si existen productos en FS
            if (products.length === 0) {
                throw new Error ('No existen Productos en File System')
            }
            
            // Valida si encuentra el producto por el ID y Elimina
            let productById = products.find(product => product.id === Number(id))
            if(productById){
                const indiceProducto = products.findIndex(product => product.id === Number(id))
    
                if (indiceProducto === -1) {
                    throw new Error('Product not found')
                }
    
                products.splice(indiceProducto, 1)
        
                fs.writeFileSync(path, JSON.stringify(products, null, '\t'))
            } else {
                throw new Error (`Producto ID '${id}' NO encontrado en File System`)
            }
        } catch (error){
            console.log(error)
            throw error
        }
    };

};

module.exports = ProductsManagerFs