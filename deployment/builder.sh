conf=$(curl 'https://raw.githubusercontent.com/htl-grieskirchen-core/core/feature/auto-deploy-update-builder-dings-h%C3%BCfe/mainframe/mainframe-config.json')

for row in $(echo "$conf" | jq -r '.plugins | keys[]'); do

     plugin_url=$(echo "$conf" | jq -r ".plugins[\"$row\"] .repoUrl")
     echo $plugin_url


     #echo "$conf" | jq -r '.plugins[] .info .name'
     curl -o ${row}"/releases/latest/download/backend.zip" "plugins/backend/$row"
     #echo ${row}"/releases/latest/download/frontend.zip"

done
