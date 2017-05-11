const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

/**
 * Setup the Express route to search CDNJS libraries
 */
app.get('/api/search', async (req, res) => {
    try {
        const searchValue = req.query.q;
        if (!searchValue) {
            return res.json({
                error: 'Missing required parameter `q`',
            });
        }
        const searchResponse = await getLibrariesFromCdnjs({searchValue});
        if (searchResponse.httpStatus !== 200) {
            return res.status(500).end();
        }
        return res.json(searchResponse.searchResults);
    } catch (e) {
       return res.status(500).end();
    }
});


/**
 * Gets libraries from CDNJS by search parameter
 * @param {string} searchValue - the term to search for in the library name
 * @returns {Promise.<Object>} - A promise that contains a string of JSON
 * {
 *  total {Number} - The total number of search results
 *  results {Object} - Array of results
 *      {
 *         name {string} Name of the library
 *         latest {string} Url of the latest library
 *      }
 * }
 */
async function getLibrariesFromCdnjs({searchValue}) {
    try {
        const response = await fetch(`https://api.cdnjs.com/libraries?search=${searchValue}&fields=version,description,homepage,keywords,repository,author`);
        const searchResults = await response.json();
        searchResults.searchValue = searchValue;
        const httpStatus = response.status;
        return {
            searchResults,
            httpStatus,
        };
    } catch (ex) {
        console.error(ex);
        throw new Error('Error retrieving search results from CDNJS', ex);
    }
}