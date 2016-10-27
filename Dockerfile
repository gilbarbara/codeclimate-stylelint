FROM node

MAINTAINER Gil Barbara

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install

RUN useradd -m -u 9000 app

COPY . /usr/src/app
RUN chown -R app:app /usr/src/app

USER app

VOLUME /code

CMD ["node", "index.js"]
