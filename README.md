# securityCam-server

[![Build Status](https://travis-ci.org/rackdon/securityCam-server.svg?branch=master)](https://travis-ci.org/rackdon/securityCam-server)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Code Climate](https://codeclimate.com/github/rackdon/securityCam-server/badges/gpa.svg)](https://codeclimate.com/github/rackdon/securityCam-server)
[![Test Coverage](https://codeclimate.com/github/rackdon/securityCam-server/badges/coverage.svg)](https://codeclimate.com/github/rackdon/securityCam-server/coverage)


[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Overview

securityCam-server is a [nodeJS](https://nodejs.org/api/) server, built on top  of [express](http://expressjs.com/) for notifications and [mongoDB](https://www.mongodb.com/) database management of [SecurityCam-app](https://github.com/rackdon/securityCam-app)


## QuickStart


- Install

  ```
  npm run installScript
  npm install
  ```

- Run server

  ```
  grunt start
  ```


Node 5.4.1 or later is needed. You can install it following the next steps

  ```
  sudo apt-get install -y nodejs
  sudo apt-get install -y npm
  sudo npm cache clean -f
  sudo npm install -g n
  sudo n 5.4.1
  # Check installation
  node -v

  ```
