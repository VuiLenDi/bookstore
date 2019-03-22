# based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

RUN apt-get update \
    && apt-get install -y curl

# Install node
# Using Debian, as root
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

# install angular/cli
RUN npm -g install @angular/cli

#copy soure to app
COPY ./ /app/
RUN cd /app && \
    npm install && \
    ng build

RUN cp -r /app/dist/front-end/* /usr/share/nginx/html

RUN rm -Rf /app

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

