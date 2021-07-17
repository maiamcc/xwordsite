#!/bin/bash
#
# Deploy the site with Jekyll + Github Pages

set -ex

DIR=$(dirname "$0")
COMMIT_MSG="Update at $(date)"

bundle exec jekyll build
cd "$DIR/_site"
git add .
git commit -m "$COMMIT_MSG"
git push origin master
