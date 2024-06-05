/* Amplify Params - DO NOT EDIT
    API_RECIPESAPP_GRAPHQLAPIIDOUTPUT
    API_RECIPESAPP_PROFILETABLE_ARN
    API_RECIPESAPP_PROFILETABLE_NAME
    AUTH_RECIPESAPP4F20ED6A_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { CognitoIdentityProviderClient, AdminAddUserToGroupCommand } = require('@aws-sdk/client-cognito-identity-provider');

// Configuration du client DynamoDB et Cognito
const ddbClient = new DynamoDBClient({ region: process.env.REGION });
const docClient = DynamoDBDocumentClient.from(ddbClient);
const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.REGION });

exports.handler = async (event, context, callback) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        const { userName, request } = event;
        const { userAttributes } = request;
        const { sub, email } = userAttributes;
        const tableName = process.env.API_RECIPESAPP_PROFILETABLE_NAME;

        // Ajouter l'utilisateur au groupe "Members" dans Cognito
        const groupParams = {
            GroupName: 'Members',
            UserPoolId: process.env.AUTH_RECIPESAPP4F20ED6A_USERPOOLID,
            Username: userName
        };
        const addUserToGroupCommand = new AdminAddUserToGroupCommand(groupParams);
        await cognitoClient.send(addUserToGroupCommand);

        // Créer une entrée dans la table Profile
        const now = new Date().toISOString();
        const params = {
            TableName: tableName,
            Item: {
                id: sub,
                createdAt: now,
                name: "Ronan",
                surname: "Scotet",
                pseudo: userName,
                email: email,
                avatar: "https://www.avatar.com",
                description: "Test description",
                birthdate: "1998-08-21",
                owner: sub,
                updatedAt: now,
                __typename: "Profile"
            }
        };
        await docClient.send(new PutCommand(params));

        context.succeed(event);
    } catch (error) {
        console.error('Error:', error);
        callback(error);
    }
};

