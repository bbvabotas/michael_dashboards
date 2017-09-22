#!/bin/bash
newFile=""

while IFS='' read -r line || [[ -n "$line" ]]; do
    first=$line
    second="app/static"
    first=${first//static//$second}

#    first=${first///static/$second}

    newFile+=$first
    
#    echo $first
done < "$1"

echo $newFile > output.js
echo "completed"