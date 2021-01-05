#!/bin/bash
# example usages:
# ./publishPackage.sh --branch=v1.0.x
# ./publishPackage.sh --branch=v1.1.x --latest
# ./publishPackage.sh --branch=v1.0-beta --beta

set -e

# Defaults that can be overridden in the CLI (except the cookie file)
export BETA=false
export LATEST=false
export BRANCH=""

# Parse flags
while (( "$#" )); do
  opt=$1
  VALUE=$2
  # Make sure to shift here and any option that uses the $VALUE
  shift
  case $opt in
    --beta)
      BETA=true
      ;;

    --latest)
      LATEST=true
      ;;

    --branch)
      if [ -z $VALUE ] ; then
        echo "Please specify branch name"
        exit 192
      fi
      BRANCH=$VALUE;
      shift
      ;;

    * ) # Invalid flag
      echo "Invalid flag: $opt"
      exit 192
      ;;
  esac
done

# branch name is required
if [ -z "$BRANCH" ] ; then
  echo "Please specify branch name using the --branch flag"
  exit 192
fi

current_version=$(node -p "require('./package').version")

# prompt next version
while [ true ]; do
  printf "Next version (current is $current_version)? "
  read next_version
  if ! [[ $next_version =~ ^[0-9]\.[0-9]+\.[0-9](-.+)? ]]; then
    echo "Version must be a valid semver string, e.g. 1.0.2 or 2.3.0-beta.1"
    continue
  else
    break
  fi
done

# npm test -- --single-run

# update references of current version to next version
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

echo "Tagging $next_version"
git tag "$next_ref"
git push origin "$next_ref"

echo "Pushing release cut"
git push origin $BRANCH

if [ $BETA = true ]; then
  echo "Publishing beta tag"
  npm publish --tag beta
elif [ $LATEST = true ]; then
  echo "Tagging" $next_ref "as 'latest'"
  git tag latest -f
  git push origin latest -f

  echo "Publishing latest tag"
  npm publish --tag latest
fi
