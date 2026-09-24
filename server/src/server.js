
import app from './express.js'
// import mongoose from 'mongoose'
// import { database } from './models/database.js'
// import {connectionForServerlessEnvs} from './models/init.js

// Connection URL
// await connectionForServerlessEnvs()

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
