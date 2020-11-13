// Hvis vi ikke er i produktionsmiljøet, skal der køres med lokale env-variable
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Starter Mongoose database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Sætter server online
// app.listen(process.env.PORT, console.log('Server running'))