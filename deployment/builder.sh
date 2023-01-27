conf=$(cat '../mainframe/mainframe-config.json')
search='https'

for row in $(echo "$conf" | jq -r '.plugins | keys[]'); do

    plugin_url=$(echo "$conf" | jq -r ".plugins[\"$row\"] .repoUrl //null")

    if grep -q "$search" <<<"$plugin_url"; then

        echo "Downloading $row"
        curl -L ${plugin_url}"/releases/latest/download/backend.zip" --create-dirs -o "./plugins/backend/$row/backend.zip"
        unzip -jqo "./plugins/backend/$row/backend.zip" -d "./plugins/backend/$row"
        rm "./plugins/backend/$row/backend.zip"

        curl -L ${plugin_url}"/releases/latest/download/frontend.zip" --create-dirs -o "./plugins/web/$row/frontend.zip"
        unzip -jqo "./plugins/web/$row/frontend.zip" -d "./plugins/web/$row"
        rm "./plugins/web/$row/frontend.zip"
    fi

done
