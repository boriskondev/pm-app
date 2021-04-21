## PM APP
This application is a simple project management solution for the company I am currently working in.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)

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
* React
* CSS 
  * Vanilla CSS created for the project's purposes following the company's 
    visual guidelines. The company website can be found [here](https://publicis-dialog.bg/).
* NodeJS
* MongoDB Atlas

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
* Register
* Log in
* Create/edit client
* Create/edit project
* Create/edit/complete/delete task
* See overall status of active tasks
* See overall status of active tasks per user

## Status
The project is currently under development with many important features to be implemented:

* New pages:
  * Profile - with edit profile option
  * Search - by task, project and client
  * Add absence
    * Email notifications option
  * Admin
  
* Page updates:
  * Homepage - sort option by name, task count and department
  * ~~User status - icons instead of buttons~~
  * Add/edit task - better date picker component
  * Add/edit task - radio buttons for responsible field
  * Where applicable - better tables design
  * Clients and projects deletion

* Misc:
  * Wrong password validation
  * For later - change the basic validation with dedicated validation components
  * Considerable code refactoring and improvements
  * Transforming class components into functional components
  * Deployment 
  * Real-life users tests

