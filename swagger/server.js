const express = require('express');
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { router } = require('./routes/users');
const swagger  = require('./swagger.json')
const YAML = require('yaml')
const fs = require("fs")


const file  = fs.readFileSync('./swagger.yml', 'utf8')
const swaggerDocument = YAML.parse(file)
const app = express();
app.use(cors({
  origin:"*"
}))
app.use(express.json())
app.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', router)
const server = app.listen(3000, ()=>{
console.log( console.log(`http://localhost:${3000}`, server.address()))
})