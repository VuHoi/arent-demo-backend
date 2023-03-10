import express, { Express, ErrorRequestHandler, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';
import { Container } from 'typedi';
import { isCelebrateError } from 'celebrate';
import httpStatusCodes from 'http-status';
import { isEmpty } from 'lodash';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import APIRoutesV1 from '@/api/routes/v1';
import env from '@/config/env';
import { DILogger } from '@/loaders/loggerLoader';
import AppError from '@/core/errors/AppError';
import { CommonError, UnknownError } from '@/core/errors/CommonError';

const swaggerDocument = YAML.load('swagger.yaml');
/**
 * Convert any error to AppError
 */
const convertError = (err: any): AppError => {
  if (err instanceof AppError) return err;
  // Convert validation error
  if (isCelebrateError(err)) {
    const celebDetails = err.details.get('body') || err.details.get('query') || err.details.get('params');
    const errDetails = celebDetails.details.map(({ message, path }) => ({
      path: path.join('.'),
      message,
    }));
    return new CommonError('common.validation_failed', errDetails);
  }
  // Convert Unknown error
  return new UnknownError(err.message);
};

/**
 * Build error response
 */
const buildErrorResponse = (err: AppError) => {
  const visibleMessage = env.APP_ENV !== 'production' || err.isPublic;
  const message = err.message;
  return {
    message: message && visibleMessage ? message : httpStatusCodes[err.status],
    code: err.code,
    ...(!isEmpty(err.details) && { details: err.details }),
  };
};

/**
 * Handle Express error
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const error = convertError(err);
  const errorResponse = buildErrorResponse(error);
  return res.status(error.status).json({ error: errorResponse });
};

/**
 * Catch 404 error
 */
const notFoundHandler: RequestHandler = (req, res, next) => {
  return next(new CommonError('common.not_found'));
};

/**
 * Express Application loader
 */
const expressLoader = (): Express => {
  const logger = Container.get(DILogger);

  // Create an Express Application
  const app = express();

  // ----------------------------------------------------------------
  // Express configuration
  // ----------------------------------------------------------------

  app.set('name', env.APP_NAME);
  app.set('version', env.APP_VERSION);
  app.set('port', env.APP_PORT);
  app.set('env', env.APP_ENV);
  app.set('host', env.APP_HOST);

  // ----------------------------------------------------------------
  // Core middlewares
  // ----------------------------------------------------------------

  // Parse incoming request bodies in a middleware before your handlers, available under the "req.body" property
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Parse Cookie header and populate "req.cookies" with an object keyed by the cookie names.
  app.use(cookieParser());
  // Compress all responses (gzip)
  app.use(compression());
  // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  app.use(methodOverride());
  // Secure the Express apps by setting various HTTP headers
  app.use(helmet());
  // Configuring CORS (Cross Origin Resource Sharing)
  app.use(cors());

  // ----------------------------------------------------------------
  // Mount API routes
  // ----------------------------------------------------------------

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  APIRoutesV1(app);

  // ----------------------------------------------------------------
  // Error handlers
  // ----------------------------------------------------------------

  app.use(notFoundHandler);
  app.use(errorHandler);

  logger.success('Express Application loaded');

  return app;
};

export default expressLoader;
