const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/database');
const cloudinaryConfig = require('./config/cloudinaryConfig');
const multer = require('multer');
require('dotenv').config();

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const orderRouter = require('./routes/orderRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const cartRouter = require('./routes/cartRoutes');

// Middleware
const uploadMiddleware = require('./middleware/upload');

const app = express();
const cors = require('cors');
// Multer setup (for file uploads)
const upload = multer({ dest: 'uploads/' });
app.use(cors());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);
app.use('/reviews', reviewRouter);
app.use('/carts', cartRouter);

// Error handling
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Connect to database
connectDB.connectDB();

// Define port
const port = 3003;

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;