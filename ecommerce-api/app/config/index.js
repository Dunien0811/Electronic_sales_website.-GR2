const config = {
  database: {
    connection: 'postgres://xwgeygnw:9sVtHWvLF5T88utbDk4VDuUAeOubjZNT@trumpet.db.elephantsql.com/xwgeygnw',
  },
  api: {
    host: "0.0.0.0",
    port: 80,
  },
  jwt: {
    secretKey: "secretKey123",
  },
  sendgrid: {
    secretKey: null,
    fromEmail: null,
  },
  webClient: {
    url: "https://ecommerce-api-ask7.onrender.com",
  },
};

module.exports = config;
