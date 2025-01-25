/* Amplify Params - DO NOT EDIT
	API_RECIPESAPP_CATEGORYTABLE_ARN
	API_RECIPESAPP_CATEGORYTABLE_NAME
	API_RECIPESAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_RECIPESAPP_GRAPHQLAPIIDOUTPUT
	API_RECIPESAPP_GRAPHQLAPIKEYOUTPUT
	API_RECIPESAPP_INGREDIENTTABLE_ARN
	API_RECIPESAPP_INGREDIENTTABLE_NAME
	API_RECIPESAPP_PROFILETABLE_ARN
	API_RECIPESAPP_PROFILETABLE_NAME
	API_RECIPESAPP_RECIPETABLE_ARN
	API_RECIPESAPP_RECIPETABLE_NAME
	AUTH_RECIPESAPP4F20ED6A_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const recipe = require('./routes/recipe');
const seed = require('./routes/seed');

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.use('/rag', recipe);
app.use('/rag', seed);

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app