#!/bin/bash

TARGET=$HOME/Staging/promobar

cp -R public $TARGET
cp -R server $TARGET
cp -R views $TARGET
cp index.js package.json pm2.json yarn.lock $TARGET
