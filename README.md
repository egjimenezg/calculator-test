# Calculator Test

## Running

The project was developed using Node 12.18

* Install node using [nvm](https://github.com/nvm-sh/nvm). 
* `nvm install 12.18.0`

Install npm dependencies and run a server
* `cd calculator-app`
* `npm install`
* `ember serve`


### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Run using docker

Build the image  

`docker build -t egjimenezg/calculator-test .` 

Run docker container from image 

`docker run -p <PORT>:4200 -d egjimenezg/calculator-test` 

* Visit the app at **http://localhost:<PORT>`**
* Visit the tests at **`http://localhost:<PORT>/tests`**


