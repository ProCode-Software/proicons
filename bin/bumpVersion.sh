#!/usr/bin/env bash
set -e

SCRIPT=$(dirname "${BASH_SOURCE[0]}")
PROICONS_ROOT="$(realpath "$SCRIPT/..")"

source "$PROICONS_ROOT/bin/helpers/utils.sh"

package_names=()

new_version=$1

if [[ -z $new_version ]]; then
    error "Error: A version is required"
fi

for package in "$PROICONS_ROOT/packages/"*; do
    name=$(basename "$package")
    package_names+=("${name},")
    (
        file="$package/package.json"
        cd "$package" || exit
        new_file=$(jq ".version = \"$new_version\"" "$file")
        echo "$new_file" > "$file"
    ) &
done

wait
formatted="${package_names[*]}"
formatted="${formatted%,}"
green "Bumped version for $(yellow "$formatted")"
