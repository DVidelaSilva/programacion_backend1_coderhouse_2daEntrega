const express       = require('express')
const productRouter = require('./routes/products.router.js')
const cartRouter    = require('./routes/carts.router.js')
const handlebars    = require('express-handlebars')

const viewsRouter = require('./routes/views.router.js')

const app = express()
const PORT = 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Handlebars

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))



// endpoint
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use('/', viewsRouter)



app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)
})