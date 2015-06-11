#!/usr/bin/env bash
set -o errexit #abort if any command fails

#if no user identity is already set in the current git environment, use this:
git config --global user.email "you@example.com"
git config --global user.name "Your Name"

#repository to deploy to. must be readable and writable.
repo=https://malteahrens:${GH_TOKEN}@github.com/malteahrens/vita

# clear and re-create the out directory
rm -rf release || exit 0;
mkdir release;

git clone --quiet --branch=mobile repo mobile > /dev/null
git status
git checkout mobile
git add hello
git commit -m "Deploy to GitHub Pages [ci skip]"
git push