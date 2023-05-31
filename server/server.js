const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('fake.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/recognition', (req, res) => {
    res.sendFile(__dirname + '/fake.json');
});

server.use(router);

const port = 3001;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
