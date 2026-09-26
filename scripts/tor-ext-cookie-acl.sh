#!/usr/bin/env bash
# Re-grant read access to tor's control cookie for desktop users in the
# distro tor group. GNOME Shell keeps login-time groups, so panel processes
# often miss debian-tor even after usermod — setfacl avoids a full re-login.
# Tor recreates control.authcookie on every start; install as tor ExecStartPost.
set -euo pipefail

COOKIE=${TOR_CONTROL_COOKIE:-/run/tor/control.authcookie}
[[ -f $COOKIE ]] || exit 0
command -v setfacl >/dev/null 2>&1 || exit 0

TOR_GROUP=
for g in debian-tor tor _tor; do
    if getent group "$g" >/dev/null 2>&1; then
        TOR_GROUP=$g
        break
    fi
done
[[ -n $TOR_GROUP ]] || exit 0

members=$(getent group "$TOR_GROUP" | cut -d: -f4 | tr ',' ' ')
for u in $members; do
    [[ -n $u ]] && setfacl -m "u:${u}:r" "$COOKIE" 2>/dev/null || true
done
