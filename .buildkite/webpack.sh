#!/bin/bash
set -e

echo "--- :webpack: Creating webpack assets"
NODE_ENV=production yarn run webpack -p --config webpack/config.js --progress --bail

echo "All done! 💪"
