const { Router }        = require('express')
const ProductsManagerFs = require('../managers/fileSystem/products.managers')

const router            = Router()
const productsManagerFS = new ProductsManagerFs()


// Ruta Obtener Productos
router.get('/', async (req, res) => {
    try{
        // Implementar limitacion en busqueda
        const limit = parseInt(req.query.limit) || 0
        const productsFS = await productsManagerFS.getProducts()
        const limitedProducts = limit > 0 ? productsFS.slice(0, limit) : productsFS
        res.send({status: 'Busqueda en File System Exitosa', data: limitedProducts})
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
});


// Ruta Obtener Productos por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const productsFSbyId = await productsManagerFS.getProductById(id)
        res.send({status: 'Busqueda por ID en File System Exitosa', data: productsFSbyId})
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
});


// Ruta Crear Productos
router.post('/', async (req, res) => {
    try {
        const { body } = req
        const response = await productsManagerFS.createProducts(body)
        res.send({status: 'Registro en File System Exitoso', data: response})
    }catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
});


// Ruta Actualizar Productos
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        const updatedProduct = await productsManagerFS.updateProducts(id,body)
        res.send({status: 'Actualizacion en File System Exitosa', data: updatedProduct})
    }catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
});


// Ruta Eliminar Productos
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await productsManagerFS.deleteProducts(id)
        res.send({status: 'Eliminacion en File System Exitosa', data: deleteProduct})
    }catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
});


module.exports = router