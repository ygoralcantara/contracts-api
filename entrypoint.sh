#!/bin/bash

cp -r /usr/src/temp/node_modules/ /usr/src/app/node_modules/
npm run migration:run
exec npm run start:dev
