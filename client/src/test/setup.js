import { globalSetup, globalTearDown } from './api-test.js'
import { afterEach } from 'vitest'

afterEach(async () => {
    await globalSetup()
})
