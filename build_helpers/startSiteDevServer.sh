#!/bin/bash
set -e

rm -rf ./__site__
rm -rf ./__site_prerender__
./build_helpers/buildAPIDocs.sh
npx webpack --config "$PWD/site/webpack-client.config.js"
npx webpack --config "$PWD/site/webpack-prerender.config.js"
./build_helpers/buildSiteIndexPages.sh
npx webpack-dev-server --config "$PWD/site/webpack-client.config.js"
