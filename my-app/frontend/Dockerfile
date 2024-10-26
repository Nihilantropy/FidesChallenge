FROM node:22-alpine3.19 
# AS development

#ARG NODE_ENV=development
#ENV NODE_ENV $NODE_ENV

# default to port 19000 for node, and 19001 and 19002 (tests) for debug
ARG PORT=19000
ENV PORT $PORT

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with node and change perms
RUN mkdir /opt/my-app && chown node:node /opt/my-app

ENV PATH /opt/my-app/.bin:$PATH

EXPOSE 8081 19000 19001 19002

RUN export PATH=$PATH:/opt/my-app/node_modules/.bin

# Start the config post mount volums
CMD ["config.sh"]