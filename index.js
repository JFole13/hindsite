const express = require('express')
const mysql = require('mysql')


const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'espn_db'
})

// Connect
db.connect((err) => {
    if(err) throw err
    console.log('MySQL Connected')
})

app.get('/getteams', (req, res) => {
    let sql = 'SELECT * FROM nhl_data'
    let query = db.query(sql, (err, results) => {
        if(err) throw err
        console.log(results)
        res.send('Posts fetched')
    })
})


app.listen('3000', () => {
    console.log('Server started on port 3000')
})