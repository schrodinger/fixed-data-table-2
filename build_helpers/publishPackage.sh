#!/bin/bash
# example usages:
# ./publishPackage.sh
# ./publishPackage.sh --latest
# ./publishPackage.sh --beta

set -e

# Defaults that can be overridden in the CLI (except the cookie file)
export BETA=false
export LATEST=false

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

    * ) # Invalid flag
      echo "Invalid flag: $opt"
      exit 192
      ;;
  esac
done

# prompt next version
current_version=$(node -p "require('./package').version")
printf "Next version (current is $current_version)? "
read next_version

if ! [[ $next_version =~ ^[0-9]\.[0-9]+\.[0-9](-.+)? ]]; then
  echo "Version must be a valid semver string, e.g. 1.0.2 or 2.3.0-beta.1"
  exit 1
fi

# npm test -- --single-run

# update references of current version to next version
echo "$(node -p "p=require('./package.json');p.version='${next_version}';JSON.stringify(p,null,2)")" > 'package.json'
sed -i.DELETEME -e "s/version = '$current_version';/version = '$next_version';/g" src/*.js
rm src/*.js.DELETEME

# build our package
npm run build

# add build files from above step
git add -u

read -p "Are you ready to publish? [Y/n] " -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]] && [[ ! $REPLY == "" ]]
then
  echo "Exit by user"
  exit 1
fi

git commit -m "Version $next_version"
echo "Updated version to ${next_version}"

next_ref="v$next_version"

echo "Tagging $next_version"
git tag "$next_ref"
git push origin "$next_ref"

echo "Pushing release cut"
git push

if [ $BETA = true ]; then
  echo "Publishing beta tag"
  npm publish --tag beta
else
  echo "Publishing $next_ref to npm"
  npm publish
fi

if [ $LATEST = true ]; then
  echo "Tagging" $next_ref "as 'latest'"
  git tag latest -f
  git push origin latest -f

  echo "Publishing latest tag to npm"
  npm publish --tag latest
fi
