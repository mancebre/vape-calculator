#!/bin/bash

name=$1

if [[ $name == "public_html" ]]; then
    rsync -avn --exclude-from .rsyncignore -e "ssh -p 21098" public/ vapeimgb@198.54.114.208:/home/vapeimgb/$name.vaperscuisine.com/
    printf "\n"

    read -r -p "Do you want to deploy all files listed above? [Y/n] " input

    case $input in
        [yY][eE][sS]|[yY])
    rsync -av --exclude-from .rsyncignore public/ -e "ssh -p 21098" vapeimgb@198.54.114.208:/home/vapeimgb/$name/
    ;;
    [nN][oO]|[nN])
    printf "\n"
    echo "Thank you come again."
       ;;
    *)
    printf "\n"
    echo "Invalid input..."
    exit 1a
    ;;
    esac
else
    printf "\n"
    echo "Please add sub domain name after script."
fi