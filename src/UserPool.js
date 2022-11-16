import {CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-2_4rm7Wbp5o',
    ClientId: '2gtqmi83nb9t0e7poh9ael83ei'
};

export default new CognitoUserPool(poolData);