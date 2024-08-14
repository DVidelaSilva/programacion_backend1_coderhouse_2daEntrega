const express       = require('express')
const handlebars    = require('express-handlebars')
const { Server } = require('socket.io');

const productRouter = require('./routes/products.router.js')
const cartRouter    = require('./routes/carts.router.js')
const viewsRouter = require('./routes/views.router.js')

const ChatSave = require('./managers/fileSystem/realTimeProducts.managers.js')
const chatSave = new ChatSave()


const app = express()
const PORT = 8080


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





const httpServer = app.listen(PORT, () => {console.log('escuchando en el puerto: ', PORT)})

// Socket
const io = new Server(httpServer)
let messages = []
io.on('connection', socket => {
    console.log('Nuevo Cliente Conectado');

    socket.on('message', async data => {
        console.log('Mensaje Recibido', data);
        //messages.push({ message: data });
        messages.push(data);
        const response =  await chatSave.createProducts(data)
        //console.log(messages);
        //console.log(response);
        io.emit('messageLogs', messages)
    })
})










