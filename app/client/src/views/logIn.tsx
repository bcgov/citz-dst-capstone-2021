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

// import { useKeycloak } from '@react-keycloak/web';
import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import { Flex } from 'rebass';
//import CreateFormMetadata from "../components/profileCreate/CreateFormMetadata";
//import CreateFormMigration from "../components/profileCreate/CreateFormMigration";
//import CreateFormPO from "../components/profileCreate/CreateFormPO";
//import CreateFormProject from "../components/profileCreate/CreateFormProject";
//import CreateFormRequest from "../components/profileCreate/CreateFormRequest";
//import CreateFormTC from "../components/profileCreate/CreateFormTC";
import { ROUTE_PATHS } from "../constants";
import { Form } from 'react-final-form';
import useCommonState from "../hooks/useCommonState";
import useRegistryApi from "../hooks/useRegistryApi";
import {
  promptErrToastWithText,
  promptSuccessToastWithText,
} from "../utils/promptToastHelper";
import { transformForm } from "../utils/transformDataHelper";
import Wizard, { WizardPage } from "../utils/Wizard";
import { keyframes } from "@emotion/core";
import Axios from "axios";



const LogIn: React.FC = () => {
  const api = useRegistryApi();
  const [goBackToDashboard, setGoBackToDashboard] = useState(false);

  if (goBackToDashboard) {
    return <Redirect to={ROUTE_PATHS.DASHBOARD} />;
  }
  return (
    <Wizard>
      <Flex>
        <LoginForm />
      </Flex>
    </Wizard>
  );
};

export default LogIn;