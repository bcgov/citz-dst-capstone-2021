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

import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { errorWithCode } from '@bcgov/common-nodejs-utils';

const getValidationErrorMessage = (error: ValidationError): string => {
  if (error.constraints) {
    return Object.values(error.constraints).join('\n');
  }
  if (error.children) {
    return error.children.map(e => getValidationErrorMessage(e)).join(',');
  }
  return '';
};

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => getValidationErrorMessage(error)).join(',');
          next(errorWithCode(message, 400));
        } else {
          next();
        }
      },
    );
  };
};

export default validationMiddleware;
