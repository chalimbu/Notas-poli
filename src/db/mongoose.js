const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL_NOTAS, {
    useNewUrlParser: true,
    useCreateIndex: true
})