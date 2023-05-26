const express = require('express');
const cors = require('cors');
// .env dosyası içerisindeki global değişkenleri çekmek için kullanılır.
const dotenv = require('dotenv');
dotenv.config();
const { API_PORT } = process.env;
const port = API_PORT || process.env.API_PORT;

// ----
const app = express();

const { connect } = require('./config/database');

// DB bağlantısı yapılır.
connect()
  .then((r) => {
    console.log('Database connected successful');
  })
  .catch((err) => {
    console.error(err);
  });
const corsOpts = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type'],
};

// response ve req içerisinden döndürülen json formatlarını algılar ve çözümler
app.use(express.json());
app.use(cors(corsOpts));

// routes/users dosyasındaki rotaları kullanır.
app.use('/api/users/', require('./routes/users'));
app.use('/api/ads/', require('./routes/ads'));
app.use('/api/comments/', require('./routes/comments'));

// Bilinmeyen bir adres girildiğinde algılar ve 404 kodu ile beraber hata mesajı döner
app.all('*', (req, res) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    },
  });
});

// /test route
app.get('/', (req, res) => {
  console.log(req);
  res.status(200).send('Hello world');
});

app.listen(port, () => {
  console.log(
    'server listening on port:' +
      port +
      '\n\n -- server bağlantısı yapılıyor -- \n'
  );
});
