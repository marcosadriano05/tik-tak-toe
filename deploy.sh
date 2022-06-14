#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:marcosadriano05/tik-tak-toe.git main:gh-pages

cd -