import express from 'express';
import cors from 'cors';
import Superagent from 'superagent';
import { AUPOST_URL, PORT } from './config.js';
import { validateQueryParams } from './utils/validation.js';

const app = express();

app.use(express.static('../build'));
app.use(cors());

app.get('/api/search', async (req, res) => {
    validateQueryParams(req);

    try {
        const postCode = req.query.postCode;
        const token = req.get('AUTH-KEY');

        const result = await Superagent
            .get(AUPOST_URL)
            .query({ q: postCode })
            .set('AUTH-KEY', token);

        const parseResult = JSON.parse(result.text);
        const localities = parseResult.localities;

        if (localities) {
            const locality = Array.isArray(localities.locality)
                ? localities.locality
                : [localities.locality];

            return res
                .status(200)
                .send(locality);
        }

        return res
            .status(200)
            .send([]);
    } catch (err) {
        return res
            .status(400)
            .send(err.message);
    }
});

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});
