#!/bin/bash

rm -rf ../docs/*

# run build
npm run prebuild && ng run lasagna:build-ssr:development

# print work directory
pwd

# copy files to correct location
cp -r ../docs/browser/* ../docs/

# remove unneeded files
rm -rf ../docs/browser ../docs/server

git add ../docs/*
git commit -m "GitHub Pages Dev Build $(date +'%Y-%m-%d %H:%M:%S')"
