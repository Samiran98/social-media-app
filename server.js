const express = require("express");
const cors = require("cors");
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const checkAuth = require('./middleware/authentication');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for SoNet',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        // contact: {
        //   name: 'JSONPlaceholder',
        //   url: 'https://jsonplaceholder.typicode.com',
        // },
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            auth_key: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
          }
        }
    },
    // security: [{jwt: []}],
    // schemes: ['http', 'https'],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use(checkAuth)

// parse user routes here
app.use('/api',routes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`);
});

// datatase connection
const db = require("./models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });