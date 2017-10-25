#!/bin/bash
set -e

echo "--- :buildkite: Downloading artifacts"

[ -d dist ] && rm -r dist
buildkite-agent artifact download "dist/*" "."

echo "--- :s3: Deploying assets to $S3_BUCKET_PATH"

aws s3 sync --region "us-east-1" --acl "public-read" "dist/" "$S3_BUCKET_PATH"

echo "All done! 💪"
