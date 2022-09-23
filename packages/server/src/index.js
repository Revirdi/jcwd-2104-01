require('dotenv/config');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const bearerToken = require('express-bearer-token');

// Routers
const userRouter = require('./routers/user');
const addressRouter = require('./routers/address');
const rajaongkirRouter = require('./routers/rajaongkir');
const cartRouter = require('./routers/cart');
const productRouter = require('./routers/product');

// Config
app.use(cors());
app.use(bearerToken());
app.use('/public', express.static('public'));
app.use(express.json());

// router
app.use('/users', userRouter);

app.use('/carts', cartRouter);

app.get('/api', (req, res) => {
  res.send(`Hello, this is my API`);
});

app.use('/users', userRouter);
app.use('/addresses', addressRouter);
app.use('/rajaongkir', rajaongkirRouter);
app.use('/product', productRouter);

app.use((error, req, res, next) => {
  console.log({ error });
  const errorObj = { status: 'ERROR', message: error.message, detail: error };
  const httpCode = typeof error.code == 'number' ? error.code : 500;
  res.status(httpCode).send(errorObj);
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(`ERROR: ${error.message}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
