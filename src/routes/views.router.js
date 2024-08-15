const { Router } = require ('express')

const router = Router()

const ProductsManagerFs = require('../managers/fileSystem/products.managers')
const productsManagerFS = new ProductsManagerFs()

const RealTimeProducts = require('../managers/fileSystem/realTimeProducts.managers')
const realTimeProducts = new RealTimeProducts()


// Ruta view realTimeProducts
router.use('/realtimeproducts', async (req, res) => {
    try{
        const productsFS = await realTimeProducts.getProducts()

        // Verificar si productsFS es un array
        if (Array.isArray(productsFS)) {

            let productDetails = productsFS.map(product => ({
                id: product.id,
                title: product.title, 
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status,
                category: product.category,
                thumbnails: product.thumbnails
            }));
            // Mostrar listado en orden inverso
            const reversedProducts = productDetails.reverse()
            // Renderizado
            res.render('realTimeProducts', {
                products: reversedProducts, // Pasamos los productos invertidos
                title: 'Real Time Products',
                styles: 'styles.css'
            });
        } else {
            res.render('realTimeProducts', { products: [] }); // Manejar el caso donde no hay productos
        }
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
})


// Ruta view Home
router.get('/home', async (req, res) => {
    try{
        const productsFS = await productsManagerFS.getProducts()

         // Verificar si productsFS es un array
        if (Array.isArray(productsFS)) {
            const productDetails = productsFS.map(product => ({
                id: product.id,
                title: product.title, 
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status,
                category: product.category,
                thumbnails: product.thumbnails
            }));

            const reversedProducts = productDetails.reverse()

            // Renderizado
            res.render('home',{
                products: reversedProducts, // Pasamos los productos invertidos
                title: 'Listado de Productos',
                styles: 'styles.css' 
            })

        } else {
            res.render('home', { products: [] })
        }
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
});


module.exports = router