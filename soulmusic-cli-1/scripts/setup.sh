#!/bin/bash

# This script sets up the SoulvanMusic CLI tool environment.

# Update package list and install necessary dependencies
sudo apt update
sudo apt install -y nodejs npm

# Install TypeScript globally
sudo npm install -g typescript

# Install project dependencies
npm install

# Compile TypeScript files
tsc

# Inform the user that the setup is complete
echo "SoulvanMusic CLI tool setup is complete!"