// ######################## EXPRESS SET UP ########################
const express = require('express');
const app = express();
app.use(express.json());   

// database connection
const records = require('./database/records')



// POST ROUTES
app.post('/history', (req, res) => {
    try {
        const { session_id, fact_id } = req.body;

        // validator for both parameters
        if (typeof(session_id) !== 'string' || session_id.trim() === '') {
            return res.status(400).json({ error_msg: 'Invalid session_id query.' });
        }

        if (typeof(fact_id) !== 'string' || fact_id.trim() === '') {
            return res.status(400).json({ error_msg: 'Invalid fact_id query.' });
        }
        // clean the parameter data
        const cleanedSessionID = session_id.trim(); 
        const cleanedFactID = fact_id.trim();

        // push into the list (create one if it does not exist)
        if (!records[cleanedSessionID]) {
            records[cleanedSessionID] = [];
        }

        // unique fact_id enforcement
        const historyList = records[cleanedSessionID];
        
        const duplicateIdx = historyList.indexOf(cleanedFactID);

        if (duplicateIdx !== -1) {
            historyList.splice(duplicateIdx, 1);                // remove it from the list if already exists
        }
        historyList.push(cleanedFactID);

        // if list length > 5
        if (historyList.length > 5) {
            historyList.shift();
        }
        
        return res.status(200).json({ 'session_id': cleanedSessionID, 'fact_id': cleanedFactID, 'message': 'Fact successfully recorded.' });
        
    } catch (error) {
        console.error('Error recording the fact', error)
        res.status(500).send('An error has occured while recording the fact.');
    }
});


// READ ROUTES
app.get('/history', (req, res) => {
    try {
        const { session_id } = req.query;
        // invalid session id
        if (typeof(session_id) !== 'string' || session_id.trim() === '') {
            return res.status(400).json({ error_msg: 'Invalid session_id query.' });
        }

        const cleaned = session_id.trim();
        const history = records[cleaned] || [];                                          // empty list if it does not exists. 

    
        return res.status(200).json({ 'session_id': cleaned, 'history': history });

   } catch (error) {
        console.error('Error retrieving the fact history.', error)
        res.status(500).send('An error has occured while retrieving the fact history.');
    }
});


module.exports = app;