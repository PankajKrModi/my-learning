If you don't want to use the cache as part of the build then set the option --no-cache=true as part of the docker build command.

FROM node:10-alpine
RUN mkdir -p src/app
WORKDIR src/app
COPY package.json /src/app/package.json
RUN npm install                               // if package.json file is changed then this command runs again
COPY . /src/app
EXPOSE 3069
CMD ["npm","start"]

docker build -t my-nodejs-app:v1 .

docker run -d --name my-running-app -p 3000:3069 my-nodejs-app

docker run -d --name my-production-running-app -e NODE_ENV=production -p 3000:3000 my-nodejs-app // -e for setting the name 
//for different environment 

===================================================
Optimise Dockerfile with onbuild command

FROM node:7
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ONBUILD COPY package.json /usr/src/app/
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/app
CMD [ "npm", "start" ]

we can build this image but the application specific commands won't be executed until the built image is used as a base image.
They'll then be executed as part of the base image's build.

FROM node:7-onbuild
EXPOSE 3000 

curl http://docker:3000
========================================
Docker ignore files contain files to ignore that takes more build time and introduce security threats in image
To prevent sensitive files or directories from being included by mistake in images, you can add a file named .dockerignore

cat Dockerfile
docker build -t password .
docker run password ls/app    //look at the output of docker image named password 

The following command would include passwords.txt in our .dockerignore file and ensure that it didn't accidentally end up in a container. 
The .dockerignore file would be stored in source control and share with the team to ensure that everyone is consistent.

echo passwords.txt >> .dockerignore

The ignore file supports directories and Regular expressions to define the restrictions, very similar to .gitignore.

If you need to use the passwords as part of a RUN command then you need to copy, 
execute and delete the files as part of a single RUN command. Only the final state of the Docker container is persisted inside the image. 
 
 
 
 
 