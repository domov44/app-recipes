// This file is used to override the REST API resources configuration
import { AmplifyApiRestResourceStackTemplate, AmplifyProjectInfo } from '@aws-amplify/cli-extensibility-helper';

// We followed the documentation here : https://docs.amplify.aws/gen1/javascript/build-a-backend/restapi/override-api-gateway/ to fixe cors automatically in apigateway for the /rag endpoint, for new endpoints you need to add another line bellow with your new path.
export function override(resources: AmplifyApiRestResourceStackTemplate, amplifyProjectInfo: AmplifyProjectInfo) {
    resources.restApi.body.paths['/rag'].options['x-amazon-apigateway-integration'].responses.default.responseParameters['method.response.header.Access-Control-Allow-Headers'] = { 'Fn::Sub': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Token'" };
}