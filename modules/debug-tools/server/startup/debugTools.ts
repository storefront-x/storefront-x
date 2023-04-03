import { versions } from 'node:process'

const majorNodeVersion = parseInt(versions.node.split('.')[0])

if (majorNodeVersion < 18) {
  throw new Error(
    `Module @storefront-x/debug-tools requires Node.js version 18 or newer. You are using Node.js version ${versions.node}.`,
  )
}
