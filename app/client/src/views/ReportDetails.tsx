//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,git
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import React from 'react';
import {
  Box,
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

const ReportDetails: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();

  return (
    <h1>Report Details View</h1>
  );
}

export default ReportDetails;
