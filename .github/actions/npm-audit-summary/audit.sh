#!/usr/bin/env bash
cd "$WORK_DIR"
set -euo pipefail # Convention Bash : Script sûr

npm audit --audit-level=high --json 2>/dev/null > audit.json || true

CRITICAL=$(jq '.metadata.vulnerabilities.critical' audit.json)
HIGH=$(jq '.metadata.vulnerabilities.high' audit.json)
MODERATE=$(jq '.metadata.vulnerabilities.moderate' audit.json)
LOW=$(jq '.metadata.vulnerabilities.low' audit.json)

if [ "$CRITICAL" -gt 0 ]; then
  echo "::error::🔴 $CRITICAL critical vulnerabilities found"
fi

if [ "$HIGH" -gt 0 ]; then
  echo "::warning::🟠 $HIGH high vulnerabilities found"
fi

if [ "$MODERATE" -gt 0 ]; then
  echo "::warning::🟡 $MODERATE moderate vulnerabilities found"
fi

{
  echo "## 🔒 npm audit"
  echo "| Severity | Count |"
  echo "|----------|-------|"
  echo "| 🔴 Critical | $CRITICAL |"
  echo "| 🟠 High | $HIGH |"
  echo "| 🟡 Moderate | $MODERATE |"
  echo "| 🔵 Low | $LOW |"
} >> "$GITHUB_STEP_SUMMARY"

cat <<EOF > "$GITHUB_STEP_SUMMARY"
NPM Audit Summary for TwoSpaceships
---
---

|    Severity     |       Count        |
|:---------------:|:------------------:|
| 🔴 **Critical** | \`${CRITICAL:-0}\` |
|   🟠 **High**   |   \`${HIGH:-0}\`   |
| 🟡 **Moderate** | \`${MODERATE:-0}\` |
|   🔵 **Low**    |   \`${LOW:-0}\`    |
EOF

if [ "$CRITICAL" -gt 0 ] || [ "$HIGH" -gt 0 ]; then
  exit 1
fi
