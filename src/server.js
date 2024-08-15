const express       = require('express')
const handlebars    = require('express-handlebars')
const { Server } = require('socket.io');

const productRouter = require('./routes/products.router.js')
const cartRouter    = require('./routes/carts.router.js')
const viewsRouter = require('./routes/views.router.js')

const RealTimeProducts = require('./managers/fileSystem/realTimeProducts.managers.js')
const realTimeProducts = new RealTimeProducts()


const app = express()
const PORT = 8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// endpoint
app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

// Http Server Listen
const httpServer = app.listen(PORT, () => {console.log('escuchando en el puerto: ', PORT)})

// Socket
const io = new Server(httpServer)
let messages = []
io.on('connection', socket => {
    console.log('Nuevo Cliente Conectado');

    // Creacion de productos
    socket.on('message', async data => {
        console.log('Mensaje Recibido', data)
        messages.push(data)
        const crearProducts =  await realTimeProducts.createProducts(data)
        const products = await realTimeProducts.getProducts()
        io.emit('messageLogs', {messages, products})

    });
    // Eliminación de productos
    socket.on('deleteProduct', async (data) => {
      try {
        await realTimeProducts.deleteProducts(data.id)
        const products = await realTimeProducts.getProducts()
        io.emit('messageLogs', { products })
      } catch (error) {
        console.error('Error al eliminar producto:', error)
        socket.emit('error', { message: error.message });
      }
  });
})










