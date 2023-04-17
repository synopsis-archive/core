## docker
echo "Installing docker..."

sudo apt-get update -y
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg -y

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
    "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" |
    sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

# Clone Compose
curl -O https://raw.githubusercontent.com/htl-grieskirchen-core/core/develop/deployment/docker-compose.yml
docker-compose up -d

echo "Check Conf..."

sudo apt-get install jq -y
curl -O https://raw.githubusercontent.com/htl-grieskirchen-core/core/master/deployment/caddy/mainframe-config.json
conf=$(cat './mainframe-config.json')
search='https'
RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"

for id in $(echo "$conf" | jq -r '.plugins | keys[]'); do

    plugin_url=$(echo "$conf" | jq -r ".plugins[\"$id\"] .repoUrl //null")

    if grep -q "$search" <<<"$plugin_url"; then

        echo "Checking URL $id"

        status_code=$(curl --write-out %{http_code} --silent --output /dev/null ${plugin_url}"/releases/latest")

        if [[ "$status_code" == 302 ]]; then
            echo -e "${GREEN}OK... $status_code ${ENDCOLOR}"
        else
            echo -e "${RED}ERROR... $status_code ${ENDCOLOR}"
            exit 0
        fi

    fi

done
