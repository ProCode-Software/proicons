#!/usr/bin/env bash
source "$PROICONS_ROOT/bin/helpers/utils.sh"

packages=("$PROICONS_ROOT/packages/"* "$PROICONS_ROOT")
package_names=()

new_version=$1

if [[ -z $new_version ]]; then
    error "Error: A version is required"
fi

for package in "${packages[@]}"; do
    name=$(basename "$package")
    package_names+=("${name},")
    (
        cd "$package" || exit
        pnpm version "$new_version" --git-tag-version false --allow-same-version >/dev/null 2>&1
    ) &
done

wait
formatted="${package_names[@]}"
green "Bumped version for $(yellow "$formatted")"
