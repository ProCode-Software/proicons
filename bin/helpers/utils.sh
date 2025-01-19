#!/usr/bin/env bash
SCRIPT=$(dirname "${BASH_SOURCE[0]}")

# ProIcons root directory
PROICONS_ROOT="$(realpath "$SCRIPT/../..")"
# ProIcons package.json version
PROICONS_VERSION="$(jq -r .version "$PROICONS_ROOT/package.json")" 

export PROICONS_ROOT
export PROICONS_VERSION

red() {
    echo "$(tput setaf 1)$1$(tput sgr0)"
}

# Throws an error and exits
error() {
    red "$1" 1>&2
    exit 1
}

green() {
    echo "$(tput setaf 2)$1$(tput sgr0)"
}

yellow() {
    echo "$(tput setaf 3)$1$(tput sgr0)"
}

dim() {
    echo "$(tput setaf 1)$1$(tput sgr0)"
}