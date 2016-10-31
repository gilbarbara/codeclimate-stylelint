FROM node:slim
MAINTAINER Gil Barbara

WORKDIR /usr/src/app
COPY package.json /usr/src/app/

RUN npm install --only=production

RUN useradd -m -u 9000 app
COPY . /usr/src/app
RUN chown -R app:app /usr/src/app

USER app

VOLUME /code
WORKDIR /code


CMD ["node", "/usr/src/app/index.js"]
