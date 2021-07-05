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

// for class-transformer Type method
import 'reflect-metadata';
import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import UsersRoute from '@routes/users.route';
import ProjectsRoute from '@routes/projects.route';
import ReportsRoute from '@routes/reports.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new UsersRoute(), new AuthRoute(), new ProjectsRoute(), new ReportsRoute()]);

if (require.main === module) {
  // prevent from running in jest testing
  app.listen();
}

export default app;
