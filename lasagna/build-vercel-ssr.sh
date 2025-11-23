#!/bin/bash

# run build
npm run prebuild && ng run lasagna:build-ssr:production

# print work directory
pwd

# copy files to correct location
cp -r ./dist/browser/* ./dist/

# remove unneeded files
rm -rf ./dist/browser ./dist/server
