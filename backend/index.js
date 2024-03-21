const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 5000;

app.use(cors({methods: 'GET, POST, DELETE'}));
app.use(express.json());

// retrieves data from .csv file and returns as array of note objects
app.get('/notes', (req, res) => {
    try{
        const notes = parseLines('noteData.csv'); // note: could be replaced with variable if we expand this
        res.json(notes)

    } catch(error) {
        console.error('Error reading CSV:', error)
        res.status(500).json({error: 'Internal server error'});
    }
    
})

// posts note to .csv file
app.post('/notes', (req, res) => {
    const {id, title, description} = req.body
    const data = `\n${id}, ${title}, ${description}`
    const filepath = 'noteData.csv'
    fs.appendFileSync(filepath, data, (err) => {
        if(err) {
            console.error('Append Error:', err);
            return;
        }
        console.log('Successful appendation! (is that a real word?)')
    })
    
    const notes = parseLines('noteData.csv');
    res.json(notes)
})

app.delete('/notes/:id', (req, res) => {
    const idToDelete = req.params.id;

    // Read the CSV file
    fs.readFile('noteData.csv', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // splits data into lines
        const lines = data.trim().split('\n');

        // Filter out line with the matching ID
        const filteredLines = lines.filter(line => {
            const [lineId] = line.split(','); // Get the ID from the line
            return lineId !== idToDelete; // Exclude the line with the matching ID
        });

        // Join the filtered lines into a single string
        const newData = filteredLines.join('\n');

        // Write the updated data back to the file
        fs.writeFileSync('noteData.csv', newData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            console.log('Line deleted successfully! Nice work!');
        });

        const notes = parseLines('noteData.csv');
        res.json(notes)
    });
});

// takes in file path and returns array of note objects
function parseLines(path) {
    const data = fs.readFileSync(path, 'utf-8');

    // pull data from csv file and add to note obj
    const lines = data.trim().split('\n');
    console.log(lines)

    if(!lines[0]) {
        return [];
    }
    
    return lines.map(line => {
        const [id, title, content] = line.split(',').map(item => item.trim());
        return { id: id, title: title, content: content };
    });
}


app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})



