/* Amplify Params - DO NOT EDIT
	API_RECIPESAPP_GRAPHQLAPIIDOUTPUT
	API_RECIPESAPP_PROFILETABLE_ARN
	API_RECIPESAPP_PROFILETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

// Configuration du client DynamoDB
const client = new DynamoDBClient({ region: process.env.REGION });
const docClient = DynamoDBDocumentClient.from(client);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        const { userName, request } = event;
        const { userAttributes } = request;
        const { sub, email } = userAttributes;
        const tableName = process.env.API_RECIPESAPP_PROFILETABLE_NAME;
        const params = {
            TableName: tableName,
            Item: {
                id: sub,
                name: userName,
                email: email,
                avatar: "https://www.avatar.com",
                description: "Test description",
                birthdate: "1998-08-21"
            }
        };

        await docClient.send(new PutCommand(params));
        context.succeed(event);
    } catch (error) {
        console.error('Error:', error);
        callback(error);
    }
};
