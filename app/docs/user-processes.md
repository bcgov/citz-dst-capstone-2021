# User Processes

This document describes the processes or use cases that users engage in when interacting with our POC prototype application.

### Login Process

**Who:** All User Personas
**When:** A registered user is not currently logged into the application.

When a user first comes to our application they are presented with a landing page that describes the project goals, application roles, and a link to an about view describing the project further.

![Landing Page](./images/screen-landing.png)

User selects the yellow **Login** button in the top right corner of the screen to navigate to the sign in view.

![Login Screen](./images/screen-login.png)

User enters email and password into fields.

User selects **Submit** to send login information to API to validate login process.

If a user successfully logs in, then they are redirected to their dashboard. Otherwise they remain on the sign in view.

## Register New User

**Who:** Submitter, Finance Analyst, Data Analyst, & Executive
**When:** A user is not registered in the system

To register a new user with our application, first navigate to the login screen by selecting the **Login** button in the top right corner of the screen.

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

Once all fields are filled out and pass validation, select **Submit** to register the new user in our application.

## Create a New Project

**Who:** Submitter
**When:** An approved project is not registered in the system.


## Complete a Quarterly Report

**Who:** Submitter, Finance Analyst, Data Analyst, & Executive
**When:** A user is not registered in the system


## Review a Quarterly Report

**Who:** Finance Analyst
**When:** A Submitter completes and submits a quarterly status report to the DIO.

