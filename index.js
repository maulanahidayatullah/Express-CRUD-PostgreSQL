const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./connection')
const port = 3000
const response = require('./response')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    const query = 'SELECT * FROM "Artist"';
    db.query(query, (error, result) => {
        if (!error) {
            response(200, result.rows, 'Get Data', res)
        }
        console.log(error);
    })
})

app.post('/store', (req, res) => {
    const { artistName, packageName, imageUrl, releaseDate, sampleUrl } = req.body
    const query = `INSERT INTO "Artist" ("ArtistName", "PackageName", "ImageURL", "ReleaseDate", "SampleURL") VALUES ('${artistName}', '${packageName}', '${imageUrl}', '${releaseDate}', '${sampleUrl}' )`;
    db.query(query, (error, result) => {
        if (!error) {
            response(200, 'Post Data', 'Data Added Successfully', res)
        }
        console.log(error);
    })
})

app.put('/update', (req, res) => {
    const { id, artistName, packageName, imageUrl, releaseDate, sampleUrl } = req.body
    const query = `UPDATE "Artist" set "ArtistName" = '${artistName}', "PackageName" = '${packageName}', "ImageURL" = '${imageUrl}', "ReleaseDate" = '${releaseDate}', "SampleURL" = '${sampleUrl}' where id=${id}`;
    db.query(query, (error, result) => {
        if (!error) {
            response(200, 'Update Data', 'Data Updated Successfully', res)
        }
        console.log(error);
    })
})

app.delete('/delete', (req, res) => {
    const { id } = req.body
    const query = `DELETE from "Artist" where id='${id}'`;
    db.query(query, (error, result) => {
        if (!error) {
            response(200, 'Delete Data', 'Data Deleted Successfully', res)
        }
        console.log(error);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

db.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('connect');
    }
})