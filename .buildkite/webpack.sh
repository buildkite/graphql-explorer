#!/bin/bash
set -e

echo "--- :webpack: Creating webpack assets"
NODE_ENV=production ./node_modules/.bin/webpack -p --config webpack/config.js --progress --bail

echo "All done! 💪"
