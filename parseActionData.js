const { jsonp } = require('express/lib/response');
const mysql = require('mysql')
let actionjson = require('/Users/jesse/OneDrive/Desktop/projects/hindsite/actionNetworkData.json');
let espnjson = require('/Users/jesse/OneDrive/Desktop/projects/hindsite/espnData.json') 

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

const espnData = espnjson.content



let gameArray = []
let gameObject
for(let i = 0; i < espnData.length; i++){
    gameObject = {}
    gameObject.away_team = espnData[i].teamOneName
    gameObject.away_score = espnData[i].teamOneScore
    gameObject.away_win = espnData[i].teamOneWinner
    gameObject.home_team = espnData[i].teamTwoName
    gameObject.home_score = espnData[i].teamTwoScore
    gameObject.home_win = espnData[i].teamTwoWinner
    gameArray.push(gameObject)
}

console.log(gameArray)

let ml_record_win = 0
let ml_record_loss = 0
for(let i = 0; i < gameArray.length; i++){
    for(let j = 0; j < actionjson.length; j++){
        if(gameArray[i].away_team == actionjson[j].away_team){
            UpdatePublicML(gameArray[i], actionjson[j])
        }
    }
}

sendData()



function UpdatePublicML(espnObject, actionObject){
    if(actionObject.away_bets_percentage > actionObject.home_bets_percentage){
        espnObject.away_win ? ml_record_win++ : ml_record_loss++
    }else{
        espnObject.home_win ? ml_record_win++ : ml_record_loss++
    }
}

function sendData(){
    sql = 'SELECT ml_record_win, ml_record_loss FROM public_betting_data'

    db.query(sql, function (err, result) {  
        if (err) throw err;  
        console.log("1 record selected"); 
        sql = `UPDATE public_betting_data SET ml_record_win = ${ml_record_win + result[0].ml_record_win},
                                         ml_record_loss = ${ml_record_loss + result[0].ml_record_loss}  WHERE id = 1`
    
        db.query(sql, function (err, result) {  
            if (err) throw err;  
            console.log("1 record updated");  
        })  
    })
}
