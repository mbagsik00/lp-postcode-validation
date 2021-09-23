import express from 'express';
import path from 'path';
import cors from 'cors';
import Superagent from 'superagent';
import { AUTH_KEY, AUPOST_URL, PORT } from './config.js';

const app = express();

app.use(express.static(path.join(path.resolve(), '..', 'build')));
app.use(cors());

app.get('/api/search', async (req, res) => {
    const q = req.query.q;

    if (!q) {
        return res
            .status(400)
            .send('Missing query parameter "q"');
    }

    try {
        const result = await Superagent
            .get(AUPOST_URL)
            .query({ q })
            .set('AUTH-KEY', AUTH_KEY);

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
