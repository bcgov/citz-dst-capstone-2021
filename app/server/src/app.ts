/**
 * Copyright © 2021 Province of British Columbia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import config from 'config';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { connect, set, disconnect } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { logger } from '@bcgov/common-nodejs-utils';
import DBConfig from '@databases';
import Routes from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';

import User from '@models/users.model';
import * as path from 'path';
import * as fs from 'fs';

class App {
  public readonly api_root = '/api/v1';

  public app: express.Application;

  public port: string | number;

  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(` App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  // eslint-disable-next-line class-methods-use-this
  public stop(): Promise<void> {
    // When using Mongo Atlas database, it doesn't disconnect properly.
    return disconnect().then(() => {
      // eslint-disable-next-line no-console
      console.log('all connections closed');
    });
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
      // eslint-disable-next-line no-console
      console.log(`connecting to ${DBConfig.url}`);
    }
    return connect(DBConfig.url, DBConfig.options);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(this.env === 'production' ? 'combined' : 'dev'));
    // TODO: (shp) origin should be set during deployment?
    this.app.use(cors({ origin: config.get('apiUrl'), credentials: true }));

    this.app.use(hpp());
    this.app.use(
      helmet({
        // TODO: (shp) to be fixed. if csp is enabled, it causes the following error in the browser.
        // 'Refused to execute inline script because it violates the following Content Security Policy directive'
        contentSecurityPolicy: false,
      }),
    );
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(passport.initialize());

    // Configure JWT Token Auth
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('secretKey'),
    };
    passport.use(
      new JwtStrategy(jwtOptions, (payload, done) => {
        return User.findById(payload.id).exec((error, user) => {
          if (error) return done(error);
          return done(null, user || false);
        });
      }),
    );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use(`${this.api_root}/${route.resource}`, route.router);
    });

    // serve react pages if it exists
    const webPath = path.join(__dirname, '../web');
    fs.access(webPath, fs.constants.R_OK, e => {
      if (e) {
        logger.warn('web resources not found');
        return;
      }
      this.app.use(express.static(webPath));
      this.app.get('/', (req, res) => {
        res.sendFile(path.join(webPath, 'index.html'), err => {
          if (err) {
            res.status(500).send(err);
          }
        });
      });
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
