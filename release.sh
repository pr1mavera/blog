#!/usr/bin/env sh

set -e

# rm -r ~/nginx/app/event/*

git pull https://github.com/pr1mavera/blog.git SSR-rebuild

npm run server:prod

npm run client:serv

npm run client:prod

cd dist

cp -R -f ./ ~/nginx/app/blog/

cd ../

npm run start

