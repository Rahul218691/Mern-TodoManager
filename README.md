# Mern-TodoManager 

Simple Todo application with task progress indication using fusion charts\
Used sendInBlue service for sending email https://www.sendinblue.com/.
JWT Based User Authentication

# Features
User Register\
User Login\
ForgotPassword\
Add TODO, DELETE TODO, List Tasks,Mark Task as Complete, Delete a todo task.\
Task representation on fusion charts which displays the % of completed and incompleted tasks.\
User update Password\
User edit Profile


To Run ->\
Clone the repository

Add .env file inside backend folder

NODE_ENV=development\
MONGO_URI=MongoURL\
JWT_SECRET=SECRETTOKEN\
NODEMAILER_USER=SENDINBlueEmail\
NODEMAILER_PASS=SENDINBLUEPASSWORD\
SMTP_HOST=SENDINBLUEHOST\
SMTP_PORT=587

node app.js to run backend\
npm start to run frontend



