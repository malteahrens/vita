#!/usr/bin/env bash
set -o errexit #abort if any command fails

#if no user identity is already set in the current git environment, use this:
default_username=deploy.sh
default_email=xyz@test.de

#repository to deploy to. must be readable and writable.
repo=https://malteahrens:${GH_TOKEN}@github.com/malteahrens/vita

git add .
git status