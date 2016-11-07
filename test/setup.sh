#!/usr/bin/env bash

count=0

for d in */ ; do
    echo "$d"
    cd "$d"
    codeclimate analyze --dev > /dev/null
    count=$(($count+$?))
    cd ../
done
