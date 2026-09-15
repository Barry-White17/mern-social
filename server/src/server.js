import dotenv from 'dotenv'
dotenv.config()

import app from './express.js'
import mongoose from 'mongoose'
import { database } from './models/database.js'

// Connection URL
if (process.env.ENVIRONMENT == 'sandbox') {
    await database(process.env.DEV_DATABASE_URL)
}

if (process.env.ENVIRONMENT == 'test') {
    await database(process.env.TEST_DATABASE_URL)
}

/*
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', process.env.PORT)
    console.info(`Port: ${process.env.PORT}`)
})
*/
export default app
