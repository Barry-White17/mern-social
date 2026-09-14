import { v4 as uuidv4 } from 'uuid'
import { v7 as uuidv7 } from 'uuid'

const JWT_SECRET = uuidv4()
const COOKIE_SIGNATURE = uuidv7()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: JWT_SECRET,
    cookieSignature: COOKIE_SIGNATURE,
    FRONTEND_URL: 'http://localhost:5173',
    mongoUri:
        process.env.MONGODB_URI ||
        process.env.MONGO_HOST ||
        'mongodb://' +
            (process.env.IP || 'localhost') +
            ':' +
            (process.env.MONGO_PORT || '27017') +
            '/mernproject',
}

export default config
