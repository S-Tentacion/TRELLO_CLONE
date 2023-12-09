# Trello-Clone 

![Trello clone](https://github.com/S-Tentacion/TRELLO/blob/main/demo.gif)

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#steps-to-run-this-on-your-local)
  - [1. **Clone the application**](#1-clone-the-application)
  - [2. **Install necessary dependencies for the application**](#2-install-necessary-dependencies-for-the-application)
  - [3. **Create a .env file and copy the contents from .env.example**](#3-create-a-env-file-and-copy-the-contents-from-envexample)
  - [4. **Start the application**](#4-start-the-application)
- [What is next?](#Whats-next)
- [Tech Stack](#tech-stacks)

## Overview

This is a clone application for trello.

### [Demo](https://trello-clone-trackier.vercel.app) 

## Features 🤩

- Login/Register with JWT token authentication
- Ability to create/update/delete the board
- Ability to add/update/move/delete the card
- Background image library for the board
- Add labels to the card
- Supports adding of detail description in the card
- Assign a card to the user

## Requirements

1. [Node.js](https://nodejs.org/)
2. [npm](https://www.npmjs.com/)

## Steps to run this on your local

First install the MongoDB Compass for better visualization of data with MongoDB server.

1. Clone this repo using `git clone https://github.com/S-Tentacion/TRELLO.git`
2. Create _.env.local_ and add this env variable `LOCAL_MONGODB=mongodb://localhost:27017/trello`
    Add `JWT_SECRET_KEY=randomstrings`
3. Run `yarn install`
4. Run `yarn dev`

`For unsplash gallery, api key is needed which can be generated from unsplash website`

### If you want to run the project using docker

Install docker on your machine and start it

1. Create _.env.development_ file.
2. Add `LOCAL_MONGODB=mongodb://mongodb:27017/trello`

## What's next 🚀

- Add cypress testing ( Pending )

## Tech stacks

- Nextjs with typescript
- MongoDB for local development
- Mongo Atlas for production DB
- Chakra UI library
- react-beautiful-dnd For drag-n-drop

## Creds - Testing
- Email: shubham782000@gmail.com  
- Password: Shubham@123
- Or You can create your own board 

## Authors

- [@shubham](https://github.com/S-Tentacion)

# TRELLO_CLONE
