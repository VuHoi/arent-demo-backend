import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
  try {
    // ----------------------------------------------------------------
    // Load modules
    // ----------------------------------------------------------------

    // Logger
    (await import('./loaders/loggerLoader')).default();
    // Database (Mongodb)
    await (await import('./loaders/mongoLoader')).default();

    // Express application
    const app = (await import('./loaders/expressLoader')).default();

    // AWS S3
    // await (await import('./loaders/awsS3Loader')).default();
    // Jobs

    // ----------------------------------------------------------------
    // Start server
    // ----------------------------------------------------------------

    app.listen(app.get('port'), () => {
      console.info(`
#################################################################
  - Name: ${app.get('name')}
  - Version: ${app.get('version')}
  - Environment: ${app.get('env')}
  - Host: ${app.get('host')}
  - Database type: mongodb 
#################################################################
      `);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
