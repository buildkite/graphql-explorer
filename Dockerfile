FROM yarnpkg/node-yarn:latest

WORKDIR /graphql-explorer

ADD package.json yarn.lock /graphql-explorer/
RUN yarn --pure-lockfile

ADD . /graphql-explorer/
