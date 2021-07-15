#! /usr/bin/env bash

set -ex

# Usage: crosswordify.sh my-puzzle.ipuz
#
# Requires
# - squares.io api key in env as SQUARES_IO_API_KEY
#   - see docs: https://gist.github.com/dnr/4550a25c08a084965b755c5cfb0e9f26
# - kpuz script in path
#   - https://github.com/kberg/kpuz/ and symlink xfer.py -> kpuz
# - puz_to_pdf script in path
#   - https://github.com/maiamcc/puz_to_pdf and symlink main.js -> puz_to_pdf

# 1. convert .ipuz -> .puz
IPUZ=$1
PUZ="$(basename $IPUZ .ipuz).puz"
kpuz $IPUZ $PUZ

# 2. create puzzle and solution pdfs
puz_to_pdf $PUZ
puz_to_pdf $PUZ --solution

# 3. upload puzzle to squares.io and get ID
curl -H "x-squares-api-key: $SQUARES_IO_API_KEY" -F v=2 -F data='{"reusepid":true}' -F puz=@$IPUZ https://squares.io/api/1/puzzle
