# Calculator Test

## Running

The project was developed using Node 12.18

* Install node using [nvm](https://github.com/nvm-sh/nvm). 
* `nvm install 12.18.0`

Install npm dependencies and run a server
* `cd calculator-app`
* `npm install`
* `ember serve`

* Visit the app at **`http://localhost:4200`**
* Visit the tests at **`http://localhost:4200/tests`** or run them at **`http://localhost:4200/tests?devmode`**

### Building

* `ember build --environment production` (production)

This will generate the deployment files in the dist folder.

## Run using docker

Build the image

`docker build -t egjimenezg/calculator-test .` 

Run docker container from image specifying the port

`docker run -p <PORT>:4200 -d egjimenezg/calculator-test` 

* Visit the app at **`http://localhost:<PORT>`**
* Visit the tests at **`http://localhost:<PORT>/tests`**


