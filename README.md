## PM APP
This generically named application is a simple project management solution for the company I am currently working in.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Project status](#project-status)

## General info
The application is inspired by a cryptic project management system, created with Drupal. The company I am working in 
have been using it for tracking the progress of the team's tasks for our projects and clients for several years now. 
Here is an example of its homepage:

![Legacy homepage](./img/legacy-homepage.jpg)

The system was written once and rarely maintained, it's technology got old and there are a bunch of architectural,
logical and UX details, which need a significant optimization. That is why I decided to rebuild the system from ground up 
and completely overhaul the way it looks and functions.

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
$ cd ../client
$ npm install
$ npm start
$ cd ../server
$ npm install
$ npm start
```