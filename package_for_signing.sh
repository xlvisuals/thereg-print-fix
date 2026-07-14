#!/bin/bash

# change into current directory
cd "$(dirname "$(readlink -f "$0")")" || exit

# Package extension code. The files must be at the root of the zip, not inside a subfolder. 
# Mozilla's validator expects to find manifest.json at the top level.

cd src
zip -r ../thereg-print-fix.zip .

cd ..
mkdir build
mv thereg-print-fix.zip build/

