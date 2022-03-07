const e = require('express');
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
    gameObject.away_record = espnData[i].teamOneRecord
    gameObject.home_team = espnData[i].teamTwoName
    gameObject.home_score = espnData[i].teamTwoScore
    gameObject.home_win = espnData[i].teamTwoWinner
    gameObject.home_record = espnData[i].teamTwoRecord
    gameArray.push(gameObject)
    
}

const central = ['Avalanche', 'Blackhawks', 'Blues', 'Coyotes', 'Jets', 'Predators', 'Stars', 'Wild']
const pacific = ['Canucks', 'Ducks', 'Golden Knights', 'Flames', 'Kings', 'Kraken', 'Oilers', 'Sharks']
const atlantic = ['Bruins', 'Canadiens', 'Lightning', 'Maple Leafs', 'Panthers', 'Red Wings', 'Sabres', 'Senators']
const metropolitan = ['Blue Jackets', 'Capitals', 'Devils', 'Flyers', 'Hurricanes', 'Islanders', 'Penguins', 'Rangers']


let away_ml_record_win = 0
let away_ml_record_loss = 0 
let home_ml_record_win = 0 
let home_ml_record_loss = 0
let home_170_ml_record_win = 0
let home_170_ml_record_loss = 0
let away_170_ml_record_win = 0
let away_170_ml_record_loss = 0
let home_200_ml_record_win = 0
let home_200_ml_record_loss = 0
let away_200_ml_record_win = 0
let away_200_ml_record_loss = 0
let away_300_ml_record_win = 0
let away_300_ml_record_loss = 0
let home_300_ml_record_win = 0
let home_300_ml_record_loss = 0
let away_over_record = 0
let away_under_record = 0
let home_over_record = 0
let home_under_record = 0
let away_goals = 0
let home_goals = 0
let away_line_record_win = 0
let away_line_record_loss = 0
let home_line_record_win = 0
let home_line_record_loss = 0
let away_rival_record_win = 0
let away_rival_record_loss = 0
let home_rival_record_win = 0
let home_rival_record_loss = 0
let away_fave_rival_record_win = 0
let away_fave_rival_record_loss = 0
let home_fave_rival_record_loss = 0
let home_fave_rival_record_win = 0


let awayWinArr = []
let awayLossArr = []
let homeWinArr = []
let homeLossArr = []
let away170WinArr = []
let away170LossArr = []
let home170WinArr = []
let home170LossArr = []
let away200WinArr = []
let away200LossArr = []
let home200WinArr = []
let home200LossArr = []
let away300WinArr = []
let away300LossArr = []
let home300WinArr = []
let home300LossArr = []
let awayOver6Arr = []
let awayUnder6Arr = []
let homeOver6Arr = []
let homeUnder6Arr = []
let awayGoalsArr = []
let homeGoalsArr = []
let awayLineWinArr = []
let awayLineLossArr = []
let homeLineWinArr = []
let homeLineLossArr = []
let awayRivalWinArr = []
let awayRivalLossArr = []
let homeRivalWinArr = []
let homeRivalLossArr = []
let awayFaveRivalWinArr = []
let awayFaveRivalLoseArr = []
let homeFaveRivalWinArr = []
let homeFaveRivalLoseArr = []

for(let i = 0; i < gameArray.length; i++){
    for(let j = 0; j < actionjson.length; j++){
        if(gameArray[i].away_team == actionjson[j].away_team){
            away_ml_record_win = 0
            away_ml_record_loss = 0
            home_ml_record_win = 0
            home_ml_record_loss = 0
            home_170_ml_record_win = 0
            home_170_ml_record_loss = 0
            away_170_ml_record_win = 0
            away_170_ml_record_loss = 0
            home_200_ml_record_win = 0
            home_200_ml_record_loss = 0
            away_200_ml_record_win = 0
            away_200_ml_record_loss = 0
            away_300_ml_record_win = 0
            away_300_ml_record_loss = 0
            home_300_ml_record_win = 0
            home_300_ml_record_loss = 0
            away_over_record = 0
            away_under_record = 0
            home_over_record = 0
            home_under_record = 0
            away_goals = 0
            home_goals = 0
            away_line_record_win = 0
            away_line_record_loss = 0
            home_line_record_win = 0
            home_line_record_loss = 0
            away_rival_record_win = 0
            away_rival_record_loss = 0
            home_rival_record_win = 0
            home_rival_record_loss = 0
            away_fave_rival_record_win = 0
            away_fave_rival_record_loss = 0
            home_fave_rival_record_win = 0
            home_fave_rival_record_loss = 0
            updateTeamML(gameArray[i])
            updateTeam170ML(gameArray[i], actionjson[j])
            updateTeam200ML(gameArray[i], actionjson[j])
            updateTeam300ML(gameArray[i], actionjson[j])
            updateTeamTotal(gameArray[i])
            updateTeamGoals(gameArray[i])
            updateTeamLines(gameArray[i], actionjson[j])
            updateTeamRivalsML(gameArray[i])
            //updateTeamFaveRivals(gameArray[i], actionjson[j])
        }
    }
}

sendHomeAwayData()


function updateTeamML(espnObject){
    if(espnObject.away_win){
        away_ml_record_win++
        home_ml_record_loss++
    }else{
        away_ml_record_loss++
        home_ml_record_win++
    }

    awayWinArr.push(away_ml_record_win)
    awayLossArr.push(away_ml_record_loss)
    homeWinArr.push(home_ml_record_win)
    homeLossArr.push(home_ml_record_loss)
}

function updateTeam170ML(espnObject, actionObject){
    if(actionObject.away_opening_odds.includes('-') && Math.abs(parseInt(actionObject.away_opening_odds)) >= 170 && Math.abs(parseInt(actionObject.away_opening_odds)) < 200){
        espnObject.away_win ? away_170_ml_record_win++ : away_170_ml_record_loss++
    }else if(actionObject.home_opening_odds.includes('-') && Math.abs(parseInt(actionObject.home_opening_odds)) >= 170 && Math.abs(parseInt(actionObject.home_opening_odds)) < 200){
        espnObject.home_win ? home_170_ml_record_win++ : home_170_ml_record_loss++
    }

    away170WinArr.push(away_170_ml_record_win)
    away170LossArr.push(away_170_ml_record_loss)
    home170WinArr.push(home_170_ml_record_win)
    home170LossArr.push(home_170_ml_record_loss)    
}

function updateTeam200ML(espnObject, actionObject){
    if(actionObject.away_opening_odds.includes('-') && Math.abs(parseInt(actionObject.away_opening_odds)) >= 200 && Math.abs(parseInt(actionObject.away_opening_odds)) < 300){
        espnObject.away_win ? away_200_ml_record_win++ : away_200_ml_record_loss++
    }else if(actionObject.home_opening_odds.includes('-') && Math.abs(parseInt(actionObject.home_opening_odds)) >= 200 && Math.abs(parseInt(actionObject.home_opening_odds)) < 300){
        espnObject.home_win ? home_200_ml_record_win++ : home_200_ml_record_loss++
    }

    away200WinArr.push(away_200_ml_record_win)
    away200LossArr.push(away_200_ml_record_loss)
    home200WinArr.push(home_200_ml_record_win)
    home200LossArr.push(home_200_ml_record_loss) 
}

function updateTeam300ML(espnObject, actionObject){
    if(actionObject.away_opening_odds.includes('-') && Math.abs(parseInt(actionObject.away_opening_odds)) >= 300){
        espnObject.away_win ? away_300_ml_record_win++ : away_300_ml_record_loss++
    }else if(actionObject.home_opening_odds.includes('-') && Math.abs(parseInt(actionObject.home_opening_odds)) >= 300){
        espnObject.home_win ? home_300_ml_record_win++ : home_300_ml_record_loss++
    }

    away300WinArr.push(away_300_ml_record_win)
    away300LossArr.push(away_300_ml_record_loss)
    home300WinArr.push(home_300_ml_record_win)
    home300LossArr.push(home_300_ml_record_loss) 
}

function updateTeamTotal(espnObject){
    if(parseInt(espnObject.away_score) + parseInt(espnObject.home_score) > 6){
        away_over_record++
        home_over_record++
    }else{
        away_under_record++
        home_under_record++
    }

    awayOver6Arr.push(away_over_record)
    awayUnder6Arr.push(away_under_record)
    homeOver6Arr.push(home_over_record)
    homeUnder6Arr.push(home_under_record)

}

function updateTeamGoals(espnObject){
    away_goals = parseInt(espnObject.away_score)
    home_goals = parseInt(espnObject.home_score)

    awayGoalsArr.push(away_goals)
    homeGoalsArr.push(home_goals)
}

function updateTeamLines(espnObject, actionObject){
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('+')){
        (parseInt(espnObject.away_score) - parseInt(espnObject.home_score) > 1) ? away_line_record_win++ : away_line_record_loss++  
    }else if(actionObject.home_opening_odds.includes('-') && actionObject.away_opening_odds.includes('+')){
        (parseInt(espnObject.home_score) - parseInt(espnObject.away_score) > 1) ? home_line_record_win++ : home_line_record_loss++
    }

    awayLineWinArr.push(away_line_record_win)
    awayLineLossArr.push(away_line_record_loss)
    homeLineWinArr.push(home_line_record_win)
    homeLineLossArr.push(home_line_record_loss)

}

function updateTeamRivalsML(espnObject){
    if(central.includes(espnObject.away_team) && central.includes(espnObject.home_team)){
        if(espnObject.away_win){
            away_rival_record_win++
            home_rival_record_loss++
        }else{
            away_rival_record_loss++
            home_rival_record_win++
        }
    }else if(pacific.includes(espnObject.away_team) && pacific.includes(espnObject.home_team)){
        if(espnObject.away_win){
            away_rival_record_win++
            home_rival_record_loss++
        }else{
            away_rival_record_loss++
            home_rival_record_win++
        }
    }else if(atlantic.includes(espnObject.away_team) && atlantic.includes(espnObject.home_team)){
        if(espnObject.away_win){
            away_rival_record_win++
            home_rival_record_loss++
        }else{
            away_rival_record_loss++
            home_rival_record_win++
        }
    }else if(metropolitan.includes(espnObject.away_team) && metropolitan.includes(espnObject.home_team)){
        if(espnObject.away_win){
            away_rival_record_win++
            home_rival_record_loss++
        }else{
            away_rival_record_loss++
            home_rival_record_win++
        }
    }

    awayRivalWinArr.push(away_rival_record_win)
    awayRivalLossArr.push(away_rival_record_loss)
    homeRivalWinArr.push(home_rival_record_win)
    homeRivalLossArr.push(home_rival_record_loss)

}

// function updateTeamFaveRivals(espnObject, actionObject){
//     if(central.includes(espnObject.away_team) && central.includes(espnObject.home_team) && espnObject.away_opening_odds.includes('-')){
//         if(espnObject.away_win){
//             away_fave_rival_record_win++
//         }
//     }
// }

function sendHomeAwayData(){
    console.log(awayRivalWinArr)
    console.log(awayRivalLossArr)
    console.log(homeRivalWinArr)
    console.log(homeRivalLossArr)



    for(let i = 0; i < gameArray.length; i++){

        let sql = `SELECT * FROM nhl_data where team_name = '${gameArray[i].away_team}'`

        db.query(sql, function (err, result) {  
                    if (err) throw err;  
                    
            
                
            
                    sql = `UPDATE nhl_data SET away_ml_record_win = ${awayWinArr[i] + result[0].away_ml_record_win}, 
                                               away_ml_record_loss = ${awayLossArr[i] + result[0].away_ml_record_loss},
                                               away_170_ml_record_win = ${away170WinArr[i] + result[0].away_170_ml_record_win},
                                               away_170_ml_record_loss = ${away170LossArr[i] + result[0].away_170_ml_record_loss},
                                               away_200_ml_record_win = ${away200WinArr[i] + result[0].away_200_ml_record_win},
                                               away_200_ml_record_loss = ${away200LossArr[i] + result[0].away_200_ml_record_loss},
                                               away_over_record = ${awayOver6Arr[i] + result[0].away_over_record},
                                               away_under_record = ${awayUnder6Arr[i] + result[0].away_under_record},
                                               total_games = ${1 + result[0].total_games},
                                               away_goals = ${awayGoalsArr[i] + result[0].away_goals},
                                               away_line_record_win = ${awayLineWinArr[i] + result[0].away_line_record_win},
                                               away_line_record_loss = ${awayLineLossArr[i] + result[0].away_line_record_loss},
                                               away_rival_record_win = ${awayRivalWinArr[i] + result[0].away_rival_record_win},
                                               away_rival_record_loss = ${awayRivalLossArr[i] + result[0].away_rival_record_loss}
                                               
                            
                            WHERE team_name = '${gameArray[i].away_team}'`
            
                    db.query(sql, function (err, result) {  
                        if (err) throw err; 
                        
                    })   
                }) 
    }

    for(let i = 0; i < gameArray.length; i++){

        let sql = `SELECT * FROM nhl_data where team_name = '${gameArray[i].home_team}'`

        db.query(sql, function (err, result) {  
                    if (err) throw err;  
                    
            
                    sql = `UPDATE nhl_data SET home_ml_record_win = ${homeWinArr[i] + result[0].home_ml_record_win}, 
                                               home_ml_record_loss = ${homeLossArr[i] + result[0].home_ml_record_loss},
                                               home_170_ml_record_win = ${home170WinArr[i] + result[0].home_170_ml_record_win},
                                               home_170_ml_record_loss = ${home170LossArr[i] + result[0].home_170_ml_record_loss},
                                               home_200_ml_record_win = ${home200WinArr[i] + result[0].home_200_ml_record_win},
                                               home_200_ml_record_loss = ${home200LossArr[i] + result[0].home_200_ml_record_loss},
                                               home_over_record = ${homeOver6Arr[i] + result[0].home_over_record},
                                               home_under_record = ${homeUnder6Arr[i] + result[0].home_under_record},
                                               total_games = ${1 + result[0].total_games},
                                               home_goals = ${homeGoalsArr[i] + result[0].away_goals},
                                               home_line_record_win = ${homeLineWinArr[i] + result[0].home_line_record_win},
                                               home_line_record_loss = ${homeLineLossArr[i] + result[0].home_line_record_loss},
                                               home_rival_record_win = ${homeRivalWinArr[i] + result[0].home_rival_record_win},
                                               home_rival_record_loss = ${homeRivalLossArr[i] + result[0].home_rival_record_loss}
                                               
                                               
                            WHERE team_name = '${gameArray[i].home_team}'`
            
                    db.query(sql, function (err, result) {  
                        if (err) throw err; 
                        
                    })   
                }) 
    }
    console.log('Espn Data records updated')
}

//have to wait till thers goals and games for every team so we dont divide by 0
// away_goals_scored_average = ${result[0].away_goals / result[0].total_games}
// home_goals_scored_average = ${result[0].home_goals / result[0]. total_games}