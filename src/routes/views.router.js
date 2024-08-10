const { Router } = require ('express')

const router = Router()

router.get('/', (req, res) => {


        const testUser = {
            name: 'DAVS'
        }
    
        res.render('index', testUser)
    })




module.exports = router