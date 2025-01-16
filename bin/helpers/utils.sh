#!/usr/bin/env bash
red() {
    echo "$(tput setaf 1)$1$(tput sgr0)"
}

error() {
    red "$1" 1>&2
    exit 1
}

green() {
    echo "$(tput setaf 2)$1$(tput sgr0)"
}

yellow() {
    echo "$(tput setaf 4)$1$(tput sgr0)"
}