/* Amplify Params - DO NOT EDIT
	API_RECIPESAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_RECIPESAPP_GRAPHQLAPIIDOUTPUT
	API_RECIPESAPP_GRAPHQLAPIKEYOUTPUT
	AUTH_RECIPESAPP4F20ED6A_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const {
    CognitoIdentityProviderClient,
    GetUserCommand,
    AdminListGroupsForUserCommand
} = require('@aws-sdk/client-cognito-identity-provider');

const userPoolId = process.env.AUTH_RECIPESAPP4F20ED6A_USERPOOLID;
const region = process.env.REGION;

const client = new CognitoIdentityProviderClient({ region });

const adminMiddleware = async (req, res, next) => {
    try {
        const event = req.apiGateway.event;

        console.log(`EVENT: ${JSON.stringify(event)}`);

        const token = event.headers.token;

        if (!token) {
            console.error('Token is missing');
            return res.status(400).json({ message: 'Token is required' });
        }

        const AccessToken = token.split(" ")[1];

        const getUserCommand = new GetUserCommand({
            AccessToken: AccessToken,
        });

        const user = await client.send(getUserCommand);

        const email = user.UserAttributes.find(attr => attr.Name === 'email')?.Value;
        const sub = user.UserAttributes.find(attr => attr.Name === 'sub')?.Value;
        const username = user.Username;

        if (!email) {
            console.error('Email not found for user');
            return res.status(400).json({ message: 'User email not found' });
        }

        const groupCommand = new AdminListGroupsForUserCommand({
            UserPoolId: userPoolId,
            Username: username,
        });

        const groupData = await client.send(groupCommand);

        const groups = groupData.Groups.map((group) => group.GroupName);
        console.log('User groups:', groups);

        if (!(groups.includes('Admins'))) {
            console.error('User has not the right permision');
            return res.status(403).json({
                message: 'Hight permision required',
            });
        }

        req.user = {
            username,
            email,
            sub,
            groups,
        };

        next();
    } catch (error) {
        console.error('Error during admin check:', error);
        res.status(500).json({
            message: 'An error occurred during admin verification',
            error: error.message,
        });
    }
};

module.exports = adminMiddleware;