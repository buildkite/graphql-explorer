#!/bin/bash
set -e

echo "--- :buildkite: Downloading artifacts"

[ -d dist ] && rm -r dist
buildkite-agent artifact download "dist/*" "."

echo "--- :s3: Deploying assets to $S3_BUCKET_PATH"

pushd dist
s3cmd put --acl-public --recursive --verbose --force --no-preserve "." "$S3_BUCKET_PATH"
popd

echo "All done! 💪"
