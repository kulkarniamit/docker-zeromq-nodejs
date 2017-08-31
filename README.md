# Docker-ZeroMQ-Nodejs
A simple example to launch docker containers with zeromq and nodejs services

## Why?
* Use docker-compose.yml to orchestrate two linked containers providing different services
* Consume services of a python program using a distributed messaging queue ZeroMQ
* Use NodeJS and ExpressJS to serve requests for an endpoint

## Prerequisites
* Docker 

## How to run this project?
```bash
$ git clone https://github.com/kulkarniamit/docker-zeromq-nodejs.git
$ cd docker-zeromq-nodejs
$ docker-compose build 
Building pythonservice
Step 1/15 : FROM ubuntu:16.04
 ---> ccc7a11d65b1
Step 2/15 : RUN apt-get update && apt-get -y install libtool
...
...
$ docker-compose up
Creating dockerzeromqnodejs_pythonservice_1 ...
Creating dockerzeromqnodejs_pythonservice_1 ... done
Creating dockerzeromqnodejs_web_1 ...
Creating dockerzeromqnodejs_web_1 ... done
Attaching to dockerzeromqnodejs_pythonservice_1, dockerzeromqnodejs_web_1
web_1            | Example app listening on port 80

# Open another terminal
$ curl localhost:8080
```

## What's happening?
* `docker-compose.yml` helped us in creating two containers using `pyDockerfile` and `webDockerfile`
* `webDockerfile` created a container running nodejs and expressjs listening on port 80
* `pyDockerfile` created a container running python program listening for requests on port 5000
* The python container is linked to the webserver container
* The node webserver accepts requests on `/` and sends a request to python server using ZeroMQ sockets
* The python server listening on port 5000 receives the request from node, performs some work and responds using ZeroMQ sockets
