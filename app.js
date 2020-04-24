const express = require('express');
const morgan = require('morgan');
const storeapps = require('./playstore.js')
const cors = require('cors')


const app = express();

app.use(morgan('common'));
app.use(cors())

app.get('/apps', (req, res) => {
    const {
        search = "",
        sort,
        genre
    } = req.query;

    console.log(genre);

    if (genre) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res
                .status(400)
                .send('sort must include the given dropdown values')
        }
    }

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('sort must be one of title or rank')
        }
    }

    let results = storeapps
        .filter(apps =>
            apps
            .App
            .toLowerCase()
            .includes(search.toLowerCase()));

    if (sort) {
        results
            .sort((a, b) => b[sort] - a[sort]);
    }

    // console.log(results);

    res.json(results);
})

app.listen(8001, () => {
    console.log('Server started on port 8001');
});