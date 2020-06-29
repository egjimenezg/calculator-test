# Calculator Test

# Prerequisites
* git
* [nvm](https://github.com/nvm-sh/nvm) or Node.js v12.18

## Running

**1. Install node 12.18.0 using [nvm](https://github.com/nvm-sh/nvm):**

* `nvm install 12.18.0`

**2. Clone the repository:**

`git clone https://github.com/egjimenezg/calculator-test`

`cd calculator-test/calculator-app`

**3. Install npm dependencies and run ember serve:**

* `npm install`
* `ember serve`

**4. Visit the app at:**

- **`http://localhost:4200`**

You can run the tests at

**`http://localhost:4200/tests`** or  **`http://localhost:4200/tests?devmode`**

### Building

If you want to generate the deployment files and run the project in a web server use the following command:

`cd calculator-test/calculator-app`

* `ember build --environment production` (production)

It will generate the deployment files in the dist folder.

## Run using docker

**1. Build the image:**

`docker build -t egjimenezg/calculator_test .` 

**2. Run docker container from created image or image hosted in docker hub specifying 
the local port on which the application will run.**

`docker run -p <PORT>:4200 -d egjimenezg/calculator_test` 

**3. Visit the app at `http://localhost:<PORT>`**

Or visit the tests at **`http://localhost:<PORT>/tests`**

