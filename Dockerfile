FROM node:5

WORKDIR /graphql-explorer

ADD package.json npm-shrinkwrap.json /graphql-explorer/
RUN npm install

ADD . /graphql-explorer/
