const { Router } = require ('express')

const router = Router()

const ProductsManagerFs = require('../managers/fileSystem/products.managers')

const productsManagerFS = new ProductsManagerFs()

const RealTimeProducts = require('../managers/fileSystem/realTimeProducts.managers')
const realTimeProducts = new RealTimeProducts()


router.use('/realtimeproducts', async (req, res) => {



/*     res.render('realTimeProducts',  { 
        //isMenu: true
    }) */

    try{
        // Implementar limitacion en busqueda

        const productsFS = await realTimeProducts.getProducts()

        console.log(productsFS);

        // Verificamos si productsFS es un array
        if (Array.isArray(productsFS)) {
            // Mapeamos los productos para acceder a sus campos
            const productDetails = productsFS.map(product => ({
                title: product.title, // Cambia esto según los campos que tenga tu producto
                price: product.price,  // Cambia esto según los campos que tenga tu producto
                description: product.description // Cambia esto según los campos que tenga tu producto
            }));

            const reversedProducts = productDetails.reverse();

/*             const testUser = {
                products: reversedProducts // Usamos los detalles mapeados
            }; */

        //const productTitle =

            // Renderizamos la vista con los datos
            // Renderizamos la vista con los datos
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


    // Ruta Obtener Productos
router.get('/home', async (req, res) => {
    try{
        // Implementar limitacion en busqueda

        const productsFS = await productsManagerFS.getProducts()

        console.log(productsFS);

        // Verificamos si productsFS es un array
        if (Array.isArray(productsFS)) {
            // Mapeamos los productos para acceder a sus campos
            const productDetails = productsFS.map(product => ({
                title: product.title, // Cambia esto según los campos que tenga tu producto
                price: product.price,  // Cambia esto según los campos que tenga tu producto
                description: product.description // Cambia esto según los campos que tenga tu producto
            }));

            const testUser = {
                products: productDetails // Usamos los detalles mapeados
            };

        //const productTitle =

            // Renderizamos la vista con los datos
            res.render('home', testUser);
        } else {
            res.render('home', { products: [] }); // Manejar el caso donde no hay productos
        }
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
});

/* 
router.use('/realtimeproducts', async (req, res) => {


    

    res.render('realtimeproducts')
}) */


module.exports = router