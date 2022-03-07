const express = require('express')
const mysql = require('mysql')

const {Team} = require("./parseEspnData.js")
const {Public} = require("./parseActionData.js")

// require parseactiondata

const app = express()

// Create connection

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

app.all('/', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
});

// Select posts
app.get('/getteams', (req, res) => {
    let sql = 'SELECT * FROM nhl_data'
    let query = db.query(sql, (err, results) => {
        if(err) throw err
        console.log(results)
        res.send('Posts fetched')
    })
})

// Select single post
app.get('/getteam/:name', (req, res) => {
    let sql = `SELECT * FROM nhl_data WHERE team_name='${req.params.name}'`
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send(result)
    })
})

// Update posts
app.get('/updateteam/:name', (req, res) => {
    let newRecord = Team.record
    let sql = `UPDATE nhl_data SET record = '${newRecord}' WHERE team_name= '${req.params.name}'`
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('Post updated')
    })
})

app.get('/getpublic', (req, res) => {
    let sql = 'SELECT * FROM public_betting_data WHERE id=1'
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send(result)
    })
})

app.listen('3000', () => {
    console.log('Server started on port 3000')
})