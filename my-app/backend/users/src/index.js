import app from './app.js';
import knexModule from 'knex';
import knexConfig from './knexfile.js';
const port = process.env.PORT || 3000;

const waitForDB = async (dbConfig) => {
	const knex = knexModule(dbConfig);
	let connected = false;
	
	while (!connected) {
	  try {
			await knex.raw('SELECT 1');  // A simple query to check if the DB is ready
			connected = true;
			console.log('Connected to the database!');
	  } catch (error) {
			console.error('Database connection failed. Retrying in 2 seconds...');
			await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
	  }
	}
	return knex; // Return the knex instance once connected
  };
  
  // In your index.js, use the function before starting the server
  (async () => {
	const knex = await waitForDB(knexConfig.development); // Wait for the database to be ready
	const server = app.listen(port, function() {
		console.log('Webserver is ready');
	});
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