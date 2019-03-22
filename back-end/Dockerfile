# based on Nginx, to have only the compiled app, ready for production with Nginx
FROM node:10

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for
#ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait-for

#copy soure to app
COPY ./ /app/
RUN cd /app && \
    npm install

WORKDIR /app

CMD ["node"]

