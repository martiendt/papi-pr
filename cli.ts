#!/usr/bin/env node

import { ExpressCli } from '@point-hub/express-cli'
import { ConsoleKernel as PapiKernel } from '@point-hub/papi/lib/console'

import { version } from './package.json'
import { ConsoleKernel as AppKernel } from './src/console'

// Initiate CLI
const cli = new ExpressCli('bun cli.ts', version)
// Register Papi Commands
await new PapiKernel(cli).register()
// Register Application Commands
await new AppKernel(cli).register()
// Build CLI
cli.run(process.argv)
