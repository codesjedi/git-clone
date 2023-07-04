#!/bin/bash

URL=$1
BASEDIR=$2
cd ~/code/scripts/git-clone
node index.js $URL $BASEDIR
