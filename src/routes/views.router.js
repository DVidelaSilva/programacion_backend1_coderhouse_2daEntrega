const { Router } = require ('express')
const ProductsManagerFs = require('../managers/fileSystem/products.managers')
const productsManagerFS = new ProductsManagerFs()

const router = Router()

/* router.get('/', (req, res) => {


        const testUser = {
            name: 'DAVS'
        }
    
        res.render('home', testUser)
    })
 */

    // Ruta Obtener Productos
router.get('/', async (req, res) => {
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


module.exports = router