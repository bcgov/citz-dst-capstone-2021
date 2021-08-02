# User Processes

This document describes the processes or use cases that users engage in when interacting with our POC prototype application.

### Login Process

**Who:** All User Personas
**When:** A registered user is not currently logged into the application.

When a user first comes to the application they are presented with a landing page that describes the project goals, application roles, and a link to an about view describing the project further.

![Landing Page](./images/screen-landing.png)

User selects the yellow **Login** button in the top right corner of the screen to navigate to the sign in view.

![Login Screen](./images/screen-login.png)

User enters email and password into fields.

User selects **Submit** to send login information to API to validate login process.

If a user successfully logs in, then they are redirected to their dashboard. Otherwise they remain on the sign in view.

---

## Register New User

**Who:** Submitter, Finance Analyst, Data Analyst, & Executive
**When:** A user is not registered in the system

To register a new user with the application, first navigate to the login screen by selecting the **Login** button in the top right corner of the screen.

Click the **Sign Up** link below the login form to navigate to the sign up form for new users.

![Sign Up Screen](./images/screen-sign-up.png)

Enter relevant user information.

Each field in the form must be validated before the user information is submitted to register a new user:
- **First Name** and **Last Name** fields must be alphanumeric and each be between 1 and 50 characters long.
- **Email** is required and must be a valid email address.
- **Password** is required must contain at least 8 characters, one uppercase character, one number and one special character. Both passwords must match.
- **Job Title** is required and must be alphanumeric and be between 1 and 50 characters long.
- **Role** is required and the user must select either Admin, Submitter, Finance Analyst, Executive, or User roles. The default role is User.
- **Ministry** is required and the user must select from a list of BC Government ministries.

Once all fields are filled out and pass validation, select **Submit** to register the new user in the application.

---

## Create a New Project

**Who:** Submitter
**When:** An approved project is not registered in the system.

When a project is approved for funding by the DIO it can then be entered into the application for quarterly status reporting. This helps reduce manual effort seen in the original reporting process by having the Submitter enter project information and contacts once instead of every report.

When a Submitter logs into the application, they are presented with a list of projects that exist in the system.

![Project List](./images/screen-project-list.png)

Select the **Create New Project** button above the project list table to begin entering a new project into the application.

The new project form is a multi-step form where fields are grouped by type. Each step must be completed and validated before the user can move to the next step. 

### Step 1: Project Identification

![New Project Form Step 1](./images/screen-new-project-step-1.png)

The first step involves the project identification information. All fields must be validated before the user can continue:
- **Project Name** is required, must be alphanumeric, and must be between 1 and 50 characters in length.
- **Project Description** must be text and not exceed 400 characters in length.
- **Ministry** is required and user must select from a list of BC Government ministries.
- **CPS Identifier** is required, must be alphanumeric, and must be between 1 and, and must be 11 characters long.
- **Ministry Project Number** is required, must be alphanumeric, and must be between 2 and 10 characters in length.

Select the **Next** button once all fields are filled out and validated.

### Step 2: Project Contacts

![New Project Form Step 2](./images/screen-new-project-step-2.png)

The second step involves selecting the contacts for the project. All fields must be filled out before the user continues and duplicate contacts are allowed:
- **Project Manager** is the primary Submitter for the project and must be an existing user.
- **Project Sponsor** must be an existing user.
- **Project Manager** must be an existing user.

Select the **Next** button once all fields are filled out and validated.

### Step 3: Project Timeline Information

The third step is where the start and estimated completion dates of a project are entered. Here the user can also add the key milestones for the project. The start date and estimated date of completion must be entered before the user can continue to the next step, but the application does not require milestones to be added at this step.

![New Project Form Step 3a](./images/screen-new-project-step-3a.png)

Both **Start Date** and **Estimated Completion** must be valid dates. Date picker elements are used to enforce this.

#### Add a Milestone

The number of milestones a project has can vary in length and not all projects have milestones. To support this, milestones must be created one at a time and then added to the project.

First, select the **Add New Milestone** button to bring up the **Create New Milestone** form.

![New Project Form Step 3b](./images/screen-new-project-step-3b.png)

Fill out the form with milestone information.

Not all fields must be filled out, but all fields must be validated before a new milestone can be added to the project:

- **Milestone Name** is required, must be alphanumeric, and must be between 1 and 50 characters in length.
- **Start** is required and must be a valid date. A date picker element is used to enforce this.
- **Planned Finish Date** is required and must be a valid date. A date picker element is used to enforce this.
- **Comments** is only required if the status is *Yellow* or *Red*, must be text, and must not exceed 400 characters in length.
- **Progress** is required and must be a number between 0 and 100; the default is 0.
- **Status** is required and the user must select one of the options from the status dropdown; default is *Green*.

Select the **Add Milestone** button when it becomes enabled after all fields are validated to add a milestone to the project.

![New Project Form Step 3c](./images/screen-new-project-step-3c.png)

Confirm a card for the milestone appears in the view and contains information entered.

Repeat for each milestone.

Select the **Next** button once this step passes validation and all of the project's milestones are entered.

#### Edit a Milestone

Milestones can be edited when creating a project and after a project is created.

Select the **Pencil Icon** on the card of the milestone you wish to edit to bring up the **Edit Milestone** form.

This form is similar to the **Create New Milestone** form but will be populated with the milestone's information.

Edit the field or fields you wish to update.

Select **Update** when the fields are updated to your satisfaction.

> If a field is updated to be no longer valid, the **Update** button will be disabled.

#### Delete a Milestone

Milestones can only be deleted when creating a project.

Select the **Trashcan Icon** on the card of the milestone you wish to delete.

The milestone will then be deleted and no longer display in the view.

### Step 4: Business Case Objectives

The fourth step is where business case objectives are added. These objectives must be entered individually similar to how milestones are entered.

![New Project Form Step 4a](./images/screen-new-project-step-4a.png)

#### Add a New Business Case Objective

First, select the **Add New Objective** button to bring up the **Create New Objective** form.

![New Project Form Step 4b](./images/screen-new-project-step-4b.png)

Not all fields must be filled out, but all fields must be validated before a new objective can be added to the project:
- **Objective Name** is required, must be alphanumeric, and must be between 1 and 50 characters in length.
- **Objective Description** is optional, but must be text and not exceed 400 characters in length.
- **Comments** is required if the status is *Yellow* or *Red*, must be text, and must not exceed 400 characters in length.
- **Target Completion Date** is required and must be a valid date. A date picker element is used to enforce this.
- **Status** is required and the user must select one of the options from the status dropdown; default is *Green*.
- **Objective Phase** is optional, but must be alphanumeric, and must be between 1 and 50 characters in length.
- **Objective Asset** is optional, but must be alphanumeric, and must be between 1 and 50 characters in length.

Select the **Add Objective** button when it becomes enabled after all fields are validated to add a objective to the project.

![New Project Form Step 4c](./images/screen-new-project-step-4c.png)

Confirm a card for the objective appears in the view and contains information entered.

Repeat for each objective.

Select the **Next** button once all of the project's objectives are entered.

#### Edit a New Business Case Objective

#### Delete a New Business Case Objective

### Step 5: Key Performance Indicators

The fifth and final step is where key performance indicators, or KPIs, are added. KPIs must be entered individually similar to how milestones and objectives are entered.

![New Project Form Step 5a](./images/screen-new-project-step-5a.png)

#### Add a New Key Performance Indicator

First, select the **Add New KPI** button to bring up the **Create Key Performance Indicator** form.

![New Project Form Step 5b](./images/screen-new-project-step-5b.png)

Not all fields must be filled out, but all fields must be validated before a new objective can be added to the project:
- **KPI Name** is required, must be alphanumeric, and must be between 1 and 50 characters in length.
- **KPI Description** is optional, but must be text and not exceed 400 characters in length.
- **KPI Unit** is required and must be alphanumeric.
- **Baseline Value** is required and must be a number.
- **Target Value** is required and must be a number.
- **Target Completion Date** is required and must be a valid date. A date picker element is used to enforce this.
- **KPI Classification** is not required, but either **Output**, **Outcome** or both should be selected depending on the KPI type.

Select the **Add KPI** button when it becomes enabled after all fields are validated to add a KPI to the project.

![New Project Form Step 5c](./images/screen-new-project-step-5c.png)

Confirm a card for the KPI appears in the view and contains information entered.

Repeat for each KPI.

Select the **Submit** button once all of the project's KPIs are entered. This will transmit the project data and create a new project in the application.

#### Edit a New Key Performance Indicator

#### Delete a New Key Performance Indicator

---

## Complete a Quarterly Report

**Who:** Submitter
**When:** A project exists and must be reported on for current quarter.

---

## Review a Quarterly Report

**Who:** Finance Analyst
**When:** A Submitter completes and submits a quarterly status report to the DIO.

