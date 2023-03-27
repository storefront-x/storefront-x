import { versions } from 'node:process'

const majorNodeVersion = parseInt(versions.node.split('.')[0])

if (majorNodeVersion < 18) {
  throw new Error('You are running an old version of Node.js. Please upgrade to Node 18 or newer.')
}
