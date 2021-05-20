#!/bin/bash

cp -r /usr/src/temp/node_modules/ /usr/src/app/node_modules/
exec yarn start
