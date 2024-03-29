## PM APP

This application is a simple project management solution for the company I am currently working in.

The life version is already deployed and can be seen here https://mtest3.netlify.app/

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)

## General info

The application is inspired by a cryptic project management system, created with Drupal. The company I am working in
has been using it for tracking the progress of the team's weekly tasks, projects and clients for several years.
Here is an example of its homepage:

![Legacy homepage](./img/legacy-homepage.jpg)

The system was written once and rarely maintained, it's technology got old and there are architectural, logical and
UX details, which need a significant optimization. That is why I decided to rebuild the system from ground up and completely
overhaul the way it looks and functions.

## Technologies

The project is created with:

- React
- CSS
  - Vanilla CSS created for the project's purposes following the company's
    visual guidelines. The company website can be found [here](https://publicis-dialog.bg/).
- NodeJS
- MongoDB Atlas

## Setup

To run this project, install it locally using npm:

```
cd ../client
npm install
npm start
cd ../server
npm install
npm start
```

## Features

The application allows you to:

- Register
- Log in
- Add/edit client
- Add/edit project
- Add/edit/complete/delete task
- Add absence and send notification email
- See overall status of active tasks
- See overall status of active tasks per user
- Search by client/project/task name
- Edit profile name and password

## Status

The project is currently under development with many important features to be implemented:

- Considerable code refactoring and improvements
- Real-life users tests
- Admin page
