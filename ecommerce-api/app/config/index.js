const config = {
  database: {
    connection: 'postgres://postgres:dunien811@localhost:5432/db',
  },
  api: {
    host: "localhost",
    port: 8080,
  },
  jwt: {
    secretKey: "secretKey123",
  },
  sendgrid: {
    secretKey: null,
    fromEmail: null,
  },
  webClient: {
    url: "http://localhost:3007",
  },
};

module.exports = config;
