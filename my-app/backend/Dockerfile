# Specify the Node.js base image
FROM node:22-alpine3.19 AS development

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Set the working directory inside the container
WORKDIR /code

# default to port 80 for node, and 9229 and 9230 (tests) for debug
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 9229 9230

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s \
  CMD node healthcheck.js

# copy in our source code last, as it changes the most
COPY . /code

# Start the application
CMD ["npm", "start"]