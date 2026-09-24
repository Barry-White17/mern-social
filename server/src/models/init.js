// import dotenv from 'dotenv'
// dotenv.config()
import mongoose from 'mongoose'

const initDatabase = () => {
    const DATABASE_URL = process.env.DATABASE_URL
    mongoose.connection.on('open', () => {
        console.info('successfully connected to database:', DATABASE_URL)
        console.log(`Successfully connected`)
    })
    const connection = mongoose.connect(DATABASE_URL)
    return connection
}
if(!cached){
    cached= global.mongoose= {
        conn: null,
        promise: null
    }
}
const connectionForServerlessEnvs= async() => {
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        cached.promise= mongoose.connect(process.env.DATABASE_URL)
    }
    cached.conn= await cached.promise
    return cached.conn
}
export default {
    initDatabase,
    connectionForServerlessEnvs
}
