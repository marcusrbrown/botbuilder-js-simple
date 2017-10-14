const builder = require('botbuilder');
const restify = require('restify');

const server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978,
  () => console.log(`${server.name} listening to ${server.url}`));

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector, session => session.send(`You said ${session.message.text}`));
