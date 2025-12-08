#/usr/bin/env sh
set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy site'
git push -f git@github.com:raygba/weather-app.git main:gh-pages
cd -
