import mongoose from 'mongoose'

// Connection URl
const database = (databaseUrl) => {
    mongoose.Promise = global.Promise
    mongoose.connect(databaseUrl)
    mongoose.connection.on('open', () => {
        console.info(`DEVELOPMENT DATABASE ACTIVE`)
    })
    mongoose.connection.on('error', () => {
        throw new Error(`unable to connect to database: ${databaseUrl}`)
    })
}
export { database }
