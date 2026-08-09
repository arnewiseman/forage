#!/usr/bin/env bash
# Step one of the hackathon clock (0:00–0:10): prove the credentials work with
# a raw curl BEFORE writing any client code. O*NET registration being slow is
# the single point of failure in the whole plan.
#
#   cp .env.example .env && $EDITOR .env
#   ./scripts/capture-fixture.sh
#
# Then read the raw JSON and fix the field paths in lib/onet.js and
# lib/careeronestop.js. Then overwrite data/fixtures/*.json with real output
# (in OUR normalized shape — see API.md) so the demo fallback is real too.
set -euo pipefail

[ -f .env ] && set -a && . ./.env && set +a

: "${ONET_USERNAME:?set ONET_USERNAME in .env}"
: "${ONET_PASSWORD:?set ONET_PASSWORD in .env}"

O="https://services.onetcenter.org/ws"
CODE="${CODE:-41-3011.00}"

echo "=== O*NET keyword search ==="
curl -sS --fail-with-body -u "$ONET_USERNAME:$ONET_PASSWORD" -H 'Accept: application/json' \
  "$O/online/search?keyword=advertising+account+manager&start=1&end=3"
echo; echo

echo "=== O*NET skills for $CODE ==="
curl -sS --fail-with-body -u "$ONET_USERNAME:$ONET_PASSWORD" -H 'Accept: application/json' \
  "$O/online/occupations/$CODE/summary/skills"
echo; echo

echo "=== O*NET related occupations for $CODE ==="
curl -sS --fail-with-body -u "$ONET_USERNAME:$ONET_PASSWORD" -H 'Accept: application/json' \
  "$O/online/occupations/$CODE/related_occupations"
echo; echo

if [ -n "${CAREERONESTOP_TOKEN:-}" ] && [ -n "${CAREERONESTOP_USER_ID:-}" ]; then
  echo "=== CareerOneStop skills gap 41-3011.00 -> 13-1161.00 ==="
  curl -sS --fail-with-body -H "Authorization: Bearer $CAREERONESTOP_TOKEN" -H 'Accept: application/json' \
    "https://api.careeronestop.org/v1/skillsgap/$CAREERONESTOP_USER_ID/41-3011.00/13-1161.00"
  echo
else
  echo "(skipping CareerOneStop — credentials not set)"
fi
