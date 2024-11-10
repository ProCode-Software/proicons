#!/bin/bash

# Define the folders and items to remove
folders=("/black" "/white" "@3x/black" "@3x/white" "@5x/black" "@5x/white")
items=("comment-multiple-var")

# Loop through each folder
for folder in "${folders[@]}"; do
    echo "Processing folder: icons/$folder"
    
    # Determine the file extension based on folder name
    if [[ $folder == "svg" ]]; then
        ext="svg"
    else
        ext="png"
    fi
    
    # Loop through each item to remove
    for item in "${items[@]}"; do
        file="icons/png$folder/$item.$ext"
        if [ -f "$file" ]; then
            rm "$file"
            echo "Removed: $file"
        else
            echo "File not found: $file"
        fi
    done
done
