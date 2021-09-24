export const AU_STATES = {
    NSW: 'New South Wales',
    QLD: 'Queensland',
    SA: 'South Australia',
    TAS: 'Tasmania',
    VIC: 'Victoria',
    WA: 'West Australia'
};

export function generateAlertMessage(localities, { postCode, suburb, state }) {
    if (!localities || localities.length === 0) {
        return {
            type: 'danger',
            message: `The postcode ${postCode} does not exist.`
        }
    }

    // Check suburb exists in the result
    const suburbExist = localities.find((loc) => loc.location.toLowerCase() === suburb);

    if (!suburbExist) {
        return {
            type: 'danger',
            message: `The postcode ${postCode} does not match the suburb ${suburb}.`
        };
    }

    // If suburb exists in the result check if it has the same state
    if (suburbExist.state !== state) {
        return {
            type: 'danger',
            message: `The suburb ${suburb} does not exist in the state ${AU_STATES[state]}.`
        };
    }

    // Postcode, suburb and state match
    return {
        type: 'success',
        message: 'The postcode, suburb and state entered are valid'
    }
}
