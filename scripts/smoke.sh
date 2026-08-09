#!/usr/bin/env bash
# Hits every route against a running server. If this is green, the flow works.
#   npm start          # in one terminal
#   npm run smoke      # in another
set -euo pipefail

BASE="${BASE:-http://localhost:3000}"
fail=0

check() {
  local name="$1"; shift
  local out
  if out=$(curl -sS --fail-with-body "$@" 2>&1); then
    printf '  ok   %s\n' "$name"
    printf '%s\n' "$out" | head -c 220; echo; echo
  else
    printf '  FAIL %s\n%s\n\n' "$name" "$out"
    fail=1
  fi
}

echo "smoke: $BASE"
check "GET  /api/health" "$BASE/api/health"
check "GET  /            (index.html)" -o /dev/null -w '%{http_code}' "$BASE/"
check "POST /api/match" -X POST "$BASE/api/match" \
  -H 'content-type: application/json' \
  -d '{"text":"I managed ad campaigns and client relationships for 4 years"}'
check "GET  /api/gap" "$BASE/api/gap?from=41-3011.00&to=13-1161.00"
check "GET  /api/jobs  (expect a match)" "$BASE/api/jobs?code=13-1161.00&title=Market%20Research%20Analysts%20and%20Marketing%20Specialists"
# Registered Nurses used to be the dead-end case; healthcare boards now match it.
# Dancers has no plausible posting on any board we watch, so it still proves the
# fallback path renders rather than silently passing on a 200.
check "GET  /api/jobs  (expect fallback)" "$BASE/api/jobs?code=27-2031.00&title=Dancers"

# --fail-with-body only asserts HTTP status, so check the two paths by content.
echo "content assertions:"
if curl -s "$BASE/api/jobs?code=27-2031.00&title=Dancers" | grep -q '"fallback":{'; then
  printf '  ok   fallback panel populated\n'
else
  printf '  FAIL fallback panel missing\n'; fail=1
fi
if [ "$(curl -s "$BASE/api/jobs?code=11-2021.00&title=Marketing%20Managers" | grep -c '"company"')" -gt 0 ]; then
  printf '  ok   live job matches returned\n'
else
  printf '  FAIL no job matches\n'; fail=1
fi
if curl -s "$BASE/api/gap?from=11-2011.00&to=13-1161.00" | grep -q '"missing":\[{'; then
  printf '  ok   skills gap non-empty\n'
else
  printf '  FAIL skills gap empty\n'; fail=1
fi

if [ "$fail" -eq 0 ]; then echo "all green"; else echo "SMOKE FAILED"; exit 1; fi
