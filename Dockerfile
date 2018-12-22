FROM node:8
WORKDIR /app
RUN git clone https://github.com/gaurang-agarwal/MERN.git
WORKDIR /app/MERN/
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "server"]
VOLUME [ "/app/MERN/" ]