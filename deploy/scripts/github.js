#!/usr/bin/env bash
set -o errexit #abort if any command fails

#if no user identity is already set in the current git environment, use this:
default_username=deploy.sh
default_email=xyz@test.de

#repository to deploy to. must be readable and writable.
repo=https://malteahrens:${GH_TOKEN}@github.com/malteahrens/vita

# clear and re-create the out directory
rm -rf release || exit 0;
mkdir release;

# go to the out directory and create a *new* Git repo
cd release
git init

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "<you>@<your-email>"

git add .
git commit -m "Deploy to GitHub Pages"