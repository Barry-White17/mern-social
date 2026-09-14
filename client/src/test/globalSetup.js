import { globalSetup, globalTearDown } from './api-test.js'

export function setup() {
    globalSetup()
}
export function teardown() {
    globalTearDown()
}
