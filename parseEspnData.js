const { jsonp } = require('express/lib/response');
const mysql = require('mysql')
let json = require('/Users/jesse/OneDrive/Desktop/projects/hindsite/espnData.json');

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

let AwayTeam = {
    name : 'name',
    record : 'record'
}


let HomeTeam = {
    name : 'name',
    record : 'record'
}

let sql

for(let i = 0; i < json.content.length; i++){
    AwayTeam.name = json.content[i].teamOneName
    AwayTeam.record = json.content[i].teamOneRecord
    HomeTeam.name = json.content[i].teamTwoName
    HomeTeam.record = json.content[i].teamTwoRecord

    sql = `UPDATE nhl_data SET record = '${AwayTeam.record}' WHERE team_name= '${AwayTeam.name}'`
    
    db.query(sql, function (err, result) {  
        if (err) throw err;  
        console.log("1 record updated");  
    });  

    sql = `UPDATE nhl_data SET record = '${HomeTeam.record}' WHERE team_name= '${HomeTeam.name}'`
    
    db.query(sql, function (err, result) {  
        if (err) throw err;  
        console.log("1 record updated");  
    });  


}

// bounce back will require a win/loss counter
