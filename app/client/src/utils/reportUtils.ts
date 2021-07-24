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

import { Milestone } from '../types';

export const getProjectProgress = (start: Date, end: Date, milestones: Milestone[]): number => {
  // find project period
  const projectPeriod = end.getTime() - start.getTime();

  // get each milestone's progress and period
  const progresses = milestones.map(m => {
    const period = new Date(m.estimatedEnd).getTime() - new Date(m.start).getTime();
    let progress = (m.progress * period) / projectPeriod;
    progress = progress > 100 ? 100 : progress;
    return { progress, period };
  });

  // get weighted average of progresses by period
  const denominator = progresses.reduce((a, c) => a + c.period * c.progress, 0);
  const nominator = progresses.reduce((a, c) => a + c.period, 0);
  return Math.round(denominator / nominator);
};

export default {
  getProjectProgress,
};
