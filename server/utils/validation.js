export function validateQueryParams(req, res) {
    const postCode = req.query.postCode;
    const token = req.get('AUTH-KEY');

    if (!postCode) {
        return res
            .status(400)
            .send('Missing required query parameter "postCode"');
    }

    if (postCode.length !== 4) {
        return res
            .status(400)
            .send('Query parameter "postCode" must be 4 characters');
    }

    if (!token) {
        return res
            .status(401)
            .send('Missing authentication token');
    }
}
