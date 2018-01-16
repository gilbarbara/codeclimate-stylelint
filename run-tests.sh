#!/usr/bin/env bash

count=0

SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for d in test/*/ ; do
    echo ""
    echo "▶ $d"
    echo ""
    cd ${SOURCE}/${d}
    codeclimate analyze --dev
    count=$(($count+$?))
done
