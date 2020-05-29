start-server: babel-node app.js
start-dev: npm-run-all --parallel build-dev start-server
dev: nf start start-dev -e .env
node-prod: node production.js
build-prod: webpack -p --config webpack.config.prod.js
prod: nf start node-prod -e prod.env
