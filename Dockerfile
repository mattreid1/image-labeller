# Use NodeJS 12
FROM node:12

# Set the Docker working director as /usr/src/app
# Copy everything in this machines directory to Docker's /usr/src/app
WORKDIR /usr/src/app
COPY ./src /usr/src/app
RUN npm install

# Execute the command and expose port 3000
CMD node index.js
EXPOSE 3000