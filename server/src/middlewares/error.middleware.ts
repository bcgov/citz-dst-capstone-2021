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

import { logger } from '@bcgov/common-nodejs-utils';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = (error as any).code || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> status=${status}, message=${message}`);
    res.status(status).json({ message });
  } catch (e) {
    next(e);
  }
};

export default errorMiddleware;
