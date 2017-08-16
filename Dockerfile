FROM mhart/alpine-node:7
MAINTAINER Gil Barbara

WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
COPY engine.json /
RUN npm install

RUN adduser -u 9000 -D app
COPY . /usr/src/app
RUN chown -R app:app /usr/src/app

USER app

VOLUME /code
WORKDIR /code

CMD ["node", "/usr/src/app/bin/codeclimate-stylelint"]
