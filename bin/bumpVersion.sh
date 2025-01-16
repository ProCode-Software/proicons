#!/usr/bin/env bash
SCRIPT=$(dirname "${BASH_SOURCE[0]}")
PROICONS_ROOT="$(realpath "$SCRIPT/..")"

source "$PROICONS_ROOT/bin/helpers/utils.sh"

new_version="$1"
packages=("$PROICONS_ROOT/packages/"* "$(realpath .)")
package_names=()

if [[ -z $new_version ]]; then
    error "Error: A version is required"
fi

for package in "${packages[@]}"; do
    package_names+=("${package},")
    (
        cd "$package" || exit
        pnpm version "$new_version" --git-tag-version false --allow-same-version >/dev/null 2>&1
    ) &
done

wait
green 'Bumped version for ' "${package_names[@]}"
