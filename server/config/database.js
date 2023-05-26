const {connect} = require('mongoose');
const {MONGO_URI} = process.env

// .env dosyasından MONGO_URI çekilir ve connect metoduyla DB'ye bağlanılmaya çalışır.
exports.connect = async () => {
    console.log(MONGO_URI)
    try {
        await connect(MONGO_URI, {
            useNewUrlParser: true,
        })
        console.log('connection successful, mongodb connected...')
    } catch (e) {
        console.error('database connection error. exiting now...')
        console.error(e.message)
        process.exit(1)
    }
}