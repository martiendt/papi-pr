#!/usr/bin/env node

import { ExpressCli } from '@point-hub/express-cli'
import { ConsoleKernel as PapiKernel } from '@point-hub/papi/lib/console'
// import { ConsoleKernel as CustomKernel } from './build/console/index.js'

import { version } from './package.json'

// Initiate CLI
const cli = new ExpressCli('bun cli.ts', version)
// Register Papi Commands
const papiKernel = new PapiKernel(cli)
await papiKernel.register()
// Register Custom Commands
// const customKernel = new CustomKernel(cli)
// await customKernel.register()
// Build CLI
cli.run(process.argv)
