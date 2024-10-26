if [ ! -e "/opt/my-app/package-lock.json" ]; then
    cd /opt/my-app/
    npm install
fi

npx expo start --tunnel