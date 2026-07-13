#!/usr/bin/env bash
# Bump the build id in BOTH index.html (meta + every ?v=) and build.txt to one new value.
# Run after EVERY edit so open tabs auto-refresh (freshness poll compares build.txt to the loaded meta).
cd "$(dirname "$0")"
NEW="$(date -u +%Y%m%d-%H%M%S)"
python3 - "$NEW" <<'PY'
import re,sys
NEW=sys.argv[1]
h=open('index.html',encoding='utf-8').read()
h=re.sub(r'\d{8}-\d{6}', NEW, h)
open('index.html','w',encoding='utf-8').write(h)
open('build.txt','w',encoding='utf-8').write(NEW+'\n')
print('build ->',NEW)
PY
