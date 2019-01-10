#!/usr/bin/env bash

SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for d in test/*/ ; do
    echo ""
    echo "▶ Running $d ..."
    cd ${SOURCE}/${d}
    codeclimate analyze --dev 1>/dev/null
    if [[ "$?" -ne 0 ]]; then
      break
    fi
done
