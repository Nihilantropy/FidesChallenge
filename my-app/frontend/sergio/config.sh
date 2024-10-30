if [ ! -e "/opt/my-app/node_modules" ]; then
    npm install
fi

npx expo start