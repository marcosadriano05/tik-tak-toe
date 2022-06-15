#!/usr/bin/env sh

set -e

npm install
npm run build

git checkout gh-pages
git pull
rm -Rf assets/ index.html
cd dist
cp -r assets/ index.html ../
cd ..
rm -Rf dist/ node_modules/
git add .
git commit -m "deploy"
git push
git checkout main