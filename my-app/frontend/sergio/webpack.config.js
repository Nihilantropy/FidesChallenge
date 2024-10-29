module.exports = async function (env, argv) {
    const config = await createWebpackConfigAsync(env, argv);
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      ignored: /node_modules/,
    };
    return config;
  };
  