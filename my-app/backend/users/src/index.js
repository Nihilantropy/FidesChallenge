import app from './app.js';
import { healthCheck } from './healthcheck.js';

const port = process.env.PORT || 3000;

(async () => {
    try {
        // Perform the health check at startup
        await healthCheck();

        // If health check passes, start the server
        const server = app.listen(port, () => {
            console.log('Webserver is ready');
        });

        // Optionally, you can add logic to keep monitoring the health check
        // If you want to monitor the health continuously, uncomment below
        
        setInterval(async () => {
            await healthCheck();
        }, 60000); // Check every minute
        

    } catch (error) {
        console.error('Error during startup:', error.message);
        process.exit(1); // Exit the application if health check fails
    }
})();
  

//
// need this in docker container to properly exit since node doesn't handle SIGINT/SIGTERM
// this also won't work on using npm start since:
// https://github.com/npm/npm/issues/4603
// https://github.com/npm/npm/pull/10868
// https://github.com/RisingStack/kubernetes-graceful-shutdown-example/blob/master/src/index.js
// if you want to use npm then start with `docker run --init` to help, but I still don't think it's
// a graceful shutdown of node process
//

// quit on ctrl-c when running docker in terminal
process.on("SIGINT", function onSigint() {
  console.info(
    "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});

// quit properly on docker stop
process.on("SIGTERM", function onSigterm() {
  console.info(
    "Got SIGTERM (docker container stop). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});

// shut down server
function shutdown() {
  server.close(function onServerClosed(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
}
//
// need above in docker container to properly exit
//