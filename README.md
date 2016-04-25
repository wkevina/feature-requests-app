# Feature Requests

[![Build Status](https://travis-ci.org/wkevina/feature-requests-app.svg?branch=master)](https://travis-ci.org/wkevina/feature-requests-app)

This project is a simple web app that tracks requests to add or change features of a software application.

## Requirements

- Python 3.4+
- pyvenv or venv module (included with Python 3.3+) or virtualenv
- nodejs
- npm
- Linux or Mac OS X

## Setup

### Getting the source
First, clone this project to your machine. For example, open a command line and do:

    $ cd /my/projects/dir/
    $ git clone https://github.com/wkevina/feature-requests-app
    $ cd feature-requests-app

### Environment
Great, now we need to set up our environment to run Feature Requests.
It is recommend to install dependencies and run inside a Python virtual environment.

To make a virtual environment, do one of the following:

1. If you have pyvenv available, try:

        $ pyvenv env

2. If you get a `command not found` error, try:

        $ python3 -m venv env

3. If you prefer to use virtualenv, try:

        $ virtualenv --python=python3 env

Finally, to activate this environment, do:

    $ source env/bin/activate

That works for both bash and zsh. If you're using fish or csh, there is `activate.fish` and `activate.csh`, respectively.

### Dependencies
Assuming your virtual environment is active, from the project root directory (i.e. feature-requests-app), do:

    $ pip install -r requirements.txt
    $ npm install

`pip` and `npm` will pull down everything the app needs.

### Initialization

We need to set up the database real quick before we can start running anything.

    $ python manage.py migrate
    $ python manage.py loaddata initial.json

## Running

Okay, we can finally run the thing. Just do:

    $ python manage.py runserver

And that's it. Open [http://localhost:8000](http://localhost:8000) in your favorite browser to see Feature Requests in action!
