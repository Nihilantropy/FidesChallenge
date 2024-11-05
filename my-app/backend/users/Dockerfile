# Specify the Node.js base image
FROM node:22-alpine3.19 AS development

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# Set the working directory inside the container
WORKDIR /code

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci

# copy in our source code last, as it changes the most
COPY . /code

# Start the application
CMD ["npm", "start"]