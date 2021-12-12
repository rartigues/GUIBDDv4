require('dotenv').config();
const express= require('express');
const app= express();
const cors= require('cors');

const db= require("./app/models");
db.sequelize.sync();

//middleware
app.use(express.json()); //body parser
app.use(cors());

//Routes


require('./app/routes/users.routes')(app);
// app.use("/auth", require('./app/routes/jwtAuth.routes'));
// app.use("/dashboard", require('./app/routes/dashboard.routes'));
app.listen(5000,()=>{
    console.log('server is running on port 5000');
});