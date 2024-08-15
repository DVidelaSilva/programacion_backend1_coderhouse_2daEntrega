const { Router } = require ('express')

const router = Router()

const ProductsManagerFs = require('../managers/fileSystem/products.managers')

const productsManagerFS = new ProductsManagerFs()




router.use('/realtimeproducts', async (req, res) => {



/*     res.render('realTimeProducts',  { 
        //isMenu: true
    }) */

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

            const reversedProducts = productDetails.reverse();

            const testUser = {
                products: reversedProducts // Usamos los detalles mapeados
            };

        //const productTitle =

            // Renderizamos la vista con los datos
            res.render('realTimeProducts', testUser);
        } else {
            res.render('realTimeProducts', { products: [] }); // Manejar el caso donde no hay productos
        }
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
})


    // Ruta Obtener Productos
/* router.get('/', async (req, res) => {
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
}); */

/* 
router.use('/realtimeproducts', async (req, res) => {


    

    res.render('realtimeproducts')
}) */


module.exports = router