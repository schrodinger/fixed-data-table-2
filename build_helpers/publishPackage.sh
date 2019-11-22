#!/bin/bash
set -e

# Defaults that can be overridden in the CLI (except the cookie file)
export BETA=0

while (( "$#" )); do
  opt=$1
  VALUE=$2
  # Make sure to shift here and any option that uses the $VALUE
  shift
  case $opt in
    --beta) BETA=$VALUE; shift ;;
    * ) # Invalid flag
      echo "Invalid flag: $opt"
      exit 192
      ;;
  esac
done

current_version=$(node -p "require('./package').version")

printf "Next version (current is $current_version)? "
read next_version

if ! [[ $next_version =~ ^[0-9]\.[0-9]+\.[0-9](-.+)? ]]; then
  echo "Version must be a valid semver string, e.g. 1.0.2 or 2.3.0-beta.1"
  exit 1
fi

# npm test -- --single-run

echo "$(node -p "p=require('./package.json');p.version='${next_version}';JSON.stringify(p,null,2)")" > 'package.json'
sed -i.DELETEME -e "s/version = '$current_version';/version = '$next_version';/g" src/*.js
rm src/*.js.DELETEME
echo "Updated version to ${next_version}"

npm run build-dist
npm run build-npm

git add -A
git add -f dist/fixed-data-table-base.css
git add -f dist/fixed-data-table-style.css
git add -f dist/fixed-data-table.css
git add -f dist/fixed-data-table.js
git add -f dist/fixed-data-table-base.min.css
git add -f dist/fixed-data-table-style.min.css
git add -f dist/fixed-data-table.min.css
git add -f dist/fixed-data-table.min.js

read -p "Are you ready to publish? [Y/n] " -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]] && [[ ! $REPLY == "" ]]
then
  echo "Exit by user"
  exit 1
fi

git commit -m "Version $next_version"

next_ref="v$next_version"

git tag "$next_ref"
git push origin "$next_ref"

if [ $BETA = 1 ]; then
  npm publish --tag beta
else
  git tag latest -f
  git push origin latest -f
  git push origin master
  npm publish
fi
