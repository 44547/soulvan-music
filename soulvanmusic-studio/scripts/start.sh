#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")/.."

# Start the TypeScript compiler in watch mode
tsc -w &

# Start the application using Node.js
node dist/index.js