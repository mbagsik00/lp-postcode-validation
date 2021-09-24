import { generateAlertMessage, AU_STATES } from './helpers.js';

describe('generateAlertMessage', () => {
    describe('Valid', () => {
        const validTestData = {
            state: 'NSW',
            postCode: 2000,
            suburb: 'Sydney'
        };

        test('returns type success if suburb, postCode, and state match', () => {
            const result = generateAlertMessage([{
                location: 'Sydney',
                state: 'NSW',
            }], validTestData);

            expect(result).toEqual({
                type: 'success',
                message: `The postcode, suburb and state entered are valid`
            })
        });
    });

    describe('Invalid', () => {
        const invalidTestData = {
            state: 'VIC',
            postCode: 1234,
            suburb: 'Sydney'
        };

        test('returns type danger if localities is an empty array', () => {
            const result = generateAlertMessage([], invalidTestData);

            expect(result).toEqual({
                type: 'danger',
                message: `The postcode ${invalidTestData.postCode} does not exist.`
            })
        });

        test('returns type danger if suburb do not exist', () => {
            const result = generateAlertMessage([{
                location: 'invalid'
            }], invalidTestData);
            
            expect(result).toEqual({
                type: 'danger',
                message: `The postcode ${invalidTestData.postCode} does not match the suburb ${invalidTestData.suburb}.`
            })
        });

        test('returns type danger if state do not match', () => {
            const result = generateAlertMessage([{
                location: 'Sydney',
                state: 'NSW',
            }], invalidTestData);
            
            expect(result).toEqual({
                type: 'danger',
                message: `The suburb ${invalidTestData.suburb} does not exist in the state ${AU_STATES[invalidTestData.state]}.`
            })
        });
    });
});
