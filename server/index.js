import express from 'express';
import path from 'path';
import cors from 'cors';
import Superagent from 'superagent';
import { AUPOST_URL, PORT } from './config.js';

const app = express();

app.use(express.static(path.join(path.resolve(), '..', 'build')));
app.use(cors());

app.get('/api/search', async (req, res) => {
    const q = req.query.q;
    const token = req.get('AUTH-KEY');

    if (!q) {
        return res
            .status(400)
            .send('Missing required query parameter "q"');
    }

    if (!token) {
        return res
            .status(401)
            .send('Missing authentication token');
    }

    try {
        const result = await Superagent
            .get(AUPOST_URL)
            .query({ q })
            .set('AUTH-KEY', token);

        const parseResult = JSON.parse(result.text);
        const localities = parseResult.localities;

        if (localities) {
            return res
                .status(200)
                .send(localities.locality);
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
