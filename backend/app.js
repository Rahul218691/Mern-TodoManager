require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {notFound,errorHandler} = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');



connectDB();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}




app.use('/v1/api/auth',require('./routes/authRoute'));
app.use('/v1/api/task',require('./routes/taskRoute'));
app.use('/v1/api/password',require('./routes/passwordRoute'));
app.use('/v1/api/user',require('./routes/userRoutes'));

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`App listining to port ${PORT}`)
})