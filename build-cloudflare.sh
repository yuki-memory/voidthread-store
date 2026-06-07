#!/usr/bin/env sh
set -eu

rm -rf dist
mkdir -p dist

cp index.html dist/
cp _headers dist/
cp _redirects dist/
cp -R assets pages products dist/
