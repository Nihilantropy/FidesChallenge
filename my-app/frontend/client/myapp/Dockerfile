FROM node:22-alpine3.19 AS development

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# default to port 19006 for node, and 19001 and 19002 (tests) for debug
ARG PORT=19006
ENV PORT $PORT
EXPOSE 19006 19001 19002

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/my-app && chown root:root /opt/my-app
WORKDIR /opt/my-app
ENV PATH /opt/my-app/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm ci

ENV REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.15

# Copy the project files
COPY . /opt/my-app

CMD [ "npx", "expo", "start" ]