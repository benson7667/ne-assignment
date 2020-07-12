## Getting Started
### Prerequisite
- Install nodejs on your machine: https://nodejs.org/en/

Run the development server:

```bash
npm install && npm run dev
# or
yarn install && yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser view the application.

## Docker Commands
### Prerequisite
- Get Docker on your machine: https://docs.docker.com/get-docker/

Run the docker command on your terminal
```
docker build -t benson7667/ne-assignment .
docker run -d -p 3000:3000 benson7667/ne-assignment:latest
```
Open [http://localhost:3000](http://localhost:3000) with your browser view the application.
