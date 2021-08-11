//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/**
 * Utilities
 * - {@link dateUtils}
 * - {@link reportUtils}
 * - etc
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @package
 */

import * as dateUtils from './dateUtils';
import reportUtils from './reportUtils';

export default {
  ...dateUtils,
  ...reportUtils,

  isValidFormInput(
    values: Record<string, any>,
    errors: Record<string, string>,
    keys: string[],
  ): boolean {
    return keys.every(key => !!values[key] && !errors[key]);
  },

  removeProperties(obj: Record<string, any>, ...fields: any[]) {
    // eslint-disable-next-line no-param-reassign
    fields.forEach(key => delete obj[key]);
    Object.values(obj).forEach(value => {
      if (typeof value === 'object') {
        this.removeProperties(value, ...fields);
      }
    });
  },
};
