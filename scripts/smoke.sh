#!/usr/bin/env bash
# Hits every route against a running server. If this is green, the flow works.
#   npm run dev        # in one terminal
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
check "GET  /api/jobs  (expect a match)" "$BASE/api/jobs?code=13-1161.00"
check "GET  /api/jobs  (expect fallback)" "$BASE/api/jobs?code=29-1141.00"

if [ "$fail" -eq 0 ]; then echo "all green"; else echo "SMOKE FAILED"; exit 1; fi
