#!/usr/bin/env bash

SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for d in test/*/ ; do
    echo ""
    echo "▶ Running $d ..."
    cd ${SOURCE}/${d}
    docker run \
      --interactive --tty --rm \
      --env CODECLIMATE_CODE="$PWD" \
      --volume "$PWD":/code \
      --volume /var/run/docker.sock:/var/run/docker.sock \
      --volume /tmp/cc:/tmp/cc \
      codeclimate/codeclimate analyze --dev 1>/dev/null
    if [[ "$?" -ne 0 ]]; then
      break
    fi
done
