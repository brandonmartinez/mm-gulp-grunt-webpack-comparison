# mm-gulp-grunt-webpack-comparison
Source and presentation for my talk, _Gulp, Grunt, WebPack: What’s a Dev to Choose?_

# Abstract
There are so many web packaging and task running options available to the front-end web developer: Gulp, Grunt, WebPack, and more! But the question is, is there one to rule them all?

Which option is best for static sites? Node.js web applications? Integrating with other languages and frameworks? We’ll dive into the differences, and similarities, between the frameworks and their offerings.

# Slides

Slides are available via the `slides\index.html` web page.

# Code Samples
This presentation relies heavily on a code demonstration. In order to compare Gulp, Grunt, and WebPack a small single page Todo Manager web application is included in this project.

Ultimately, each of the platforms will produce similar, if not identical, outputs for comparison. An _express.js_ server is included to run the samples locally.

## Actions To Achieve Using Each Platform
- Minimal configuration and setup of platform
- Compile SASS and Minify
- Combine JavaScript Into Single File and Minify
- Minify HTML
- Allow for local development and testing
- Publish all files into distribution folder that is deployment ready

## Prerequisites

The following global packages or tools are required to run the code samples:

* [Yarn](https://yarnpkg.com/en/docs/install) (NPM can be used instead)
* babel
* browserify
* grunt-cli
* gulp-cli

For the global npm packages, you can run the following command to get your system up-to-date. Afterwards, you can then run `yarn install` to restore all of the packages needed to run the code sample.

`yarn global add babel-cli browserify grunt-cli gulp-cli`

_You can just run `yarn install` to get all of the packages required here; the step-by-step is meant to be instructional if you are starting a new project from scratch._

## Running the Code Samples

For each of the technologies we're reviewing there are a two scenarios, `build` and `serve`. `build` is used to generate a deployable artifact to a web server. `serve` is used for local testing via an _express.js_ web server.

### Grunt

To build artifacts, you can run `grunt build` from the command line. Artifacts are put into the `.dist/grunt/` directory.

To serve via a local webserver, you can run `grunt serve` and then browse to [localhost:3000](http://localhost:3000/).

### Gulp

To build artifacts, you can run `gulp build` from the command line. Artifacts are put into the `.dist/gulp/` directory.

To serve via a local webserver, you can run `gulp serve` and then browse to [localhost:3000](http://localhost:3001/).

### webpack

Unlike the other two technologies, which are Javascript task runners, webpack is actually a Javascript _bundler_. As such, a couple scenarios have been created to show how webpack could be used in a workflow. Each of these can be run either via `npm run` or using `yarn`, which is what we'll use here.

* `yarn webpack:scripts`: this generates a Javascript file that could be used in an application. It is **not** a complete application, only put to show webpack being used in its simplest scenario.
* `yarn webpack:grunt:build`: similar to `grunt build` with the main exception being that _webpack_ is used instead of the normal `scripts` task.
* `yarn webpack:grunt:serve`: similar to `grunt serve` with the main exception being that _webpack_ is used instead of the normal `scripts` task.
* `yarn webpack:gulp:build`: similar to `gulp build` with the main exception being that _webpack_ is used instead of the normal `scripts` task.
* `yarn webpack:gulp:serve`: similar to `gulp serve` with the main exception being that _webpack_ is used instead of the normal `scripts` task.