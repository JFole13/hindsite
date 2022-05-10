const e = require('express');
const res = require('express/lib/response');
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

let awayCountWin = 0
let awayCountLoss = 0
let homeCountWin = 0
let homeCountLoss = 0

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
let awayFaveWinArr = []
let awayFaveLossArr = []
let homeFaveWinArr = []
let homeFaveLossArr = []
let awayDogWinArr = []
let awayDogLossArr = []
let homeDogWinArr = []
let homeDogLossArr = []
let teamAwayWinArr = []
let teamAwayLossArr = []
let teamHomeWinArr = []
let teamHomeLossArr = []
let teamAway170WinArr = []
let teamAway170LossArr = []
let teamHome170WinArr = []
let teamHome170LossArr = [] 
let teamAway200WinArr = []
let teamAway200LossArr = []
let teamHome200WinArr = []
let teamHome200LossArr = []
let teamAwayOver6Arr = []
let teamAwayUnder6Arr = []
let teamHomeOver6Arr = []
let teamHomeUnder6Arr = []
let teamAwayLineWinArr = []
let teamAwayLineLossArr = []
let teamHomeLineWinArr = []
let teamHomeLineLossArr = []
let teamAwayRivalWinArr = []
let teamAwayRivalLossArr = []
let teamHomeRivalWinArr = []
let teamHomeRivalLossArr = []
let teamAwayFaveWinArr = []
let teamAwayFaveLossArr = []
let teamHomeFaveWinArr = []
let teamHomeFaveLossArr = []
let teamAwayDogWinArr = []
let teamAwayDogLossArr = []
let teamHomeDogWinArr = []
let teamHomeDogLossArr = []


for(let i = 0; i < gameArray.length; i++){
    for(let j = 0; j < actionjson.length; j++){
        if(gameArray[i].away_team == actionjson[j].away_team){
            awayCountWin = 0
            awayCountLoss = 0
            homeCountWin = 0
            homeCountLoss = 0

            updateTeamML(gameArray[i], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateTeam170ML(gameArray[i], actionjson[j], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateTeam200ML(gameArray[i], actionjson[j], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateTeam300ML(gameArray[i], actionjson[j], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateTeamTotal(gameArray[i], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            // updateTeamGoals(gameArray[i])
            updateTeamLines(gameArray[i], actionjson[j], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateTeamRivalsML(gameArray[i], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            //updateTeamFaveRivals(gameArray[i], actionjson[j])
            updateTeamFaveML(gameArray[i], actionjson[j], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateTeamDogML(gameArray[i], actionjson[j], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateSelectedTeamML(gameArray[i], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateSelectedTeam170ML(gameArray[i], actionjson[j], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateSelectedTeam200ML(gameArray[i], actionjson[j], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateSelectedTeamTotal(gameArray[i], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateSelectedTeamLines(gameArray[i], actionjson[j], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateSelectedTeamRival(gameArray[i], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateSelectedTeamFave(gameArray[i], actionjson[j], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
            updateSelectedTeamDog(gameArray[i], actionjson[j], awayCountWin, awayCountLoss, homeCountWin, homeCountLoss)
        }
    }
}

sendHomeAwayData()


function updateTeamML(espnObject, awayWin, awayLoss, homeWin, homeLoss){
    if(espnObject.away_win){
        awayWin++
        homeLoss++
    }else{
        awayLoss++
        homeWin++
    }

    awayWinArr.push(awayWin)
    awayLossArr.push(awayLoss)
    homeWinArr.push(homeWin)
    homeLossArr.push(homeLoss)
}

function updateTeam170ML(espnObject, actionObject, awayWin, awayLoss, homeWin, homeLoss){
    if(actionObject.away_opening_odds.includes('-') && Math.abs(parseInt(actionObject.away_opening_odds)) >= 170 && Math.abs(parseInt(actionObject.away_opening_odds)) < 200){
        espnObject.away_win ? awayWin++ : awayLoss++
    }else if(actionObject.home_opening_odds.includes('-') && Math.abs(parseInt(actionObject.home_opening_odds)) >= 170 && Math.abs(parseInt(actionObject.home_opening_odds)) < 200){
        espnObject.home_win ? homeWin++ : homeLoss++
    }

    away170WinArr.push(awayWin)
    away170LossArr.push(awayLoss)
    home170WinArr.push(homeWin)
    home170LossArr.push(homeLoss)    
}

function updateTeam200ML(espnObject, actionObject, awayWin, awayLoss, homeWin, homeLoss){
    if(actionObject.away_opening_odds.includes('-') && Math.abs(parseInt(actionObject.away_opening_odds)) >= 200 && Math.abs(parseInt(actionObject.away_opening_odds)) < 300){
        espnObject.away_win ? awayWin++ : awayLoss++
    }else if(actionObject.home_opening_odds.includes('-') && Math.abs(parseInt(actionObject.home_opening_odds)) >= 200 && Math.abs(parseInt(actionObject.home_opening_odds)) < 300){
        espnObject.home_win ? homeWin++ : homeLoss++
    }

    away200WinArr.push(awayWin)
    away200LossArr.push(awayLoss)
    home200WinArr.push(homeWin)
    home200LossArr.push(homeLoss) 
}

function updateTeam300ML(espnObject, actionObject, awayWin, awayLoss, homeWin, homeLoss){
    if(actionObject.away_opening_odds.includes('-') && Math.abs(parseInt(actionObject.away_opening_odds)) >= 300){
        espnObject.away_win ? awayWin++ : awayLoss++
    }else if(actionObject.home_opening_odds.includes('-') && Math.abs(parseInt(actionObject.home_opening_odds)) >= 300){
        espnObject.home_win ? homeWin++ : homeLoss++
    }

    away300WinArr.push(awayWin)
    away300LossArr.push(awayLoss)
    home300WinArr.push(homeWin)
    home300LossArr.push(homeLoss) 
}

function updateTeamTotal(espnObject, awayWin, awayLoss, homeWin, homeLoss){
    if(parseInt(espnObject.away_score) + parseInt(espnObject.home_score) > 6){
        awayWin++
        homeWin++
    }else{
        awayLoss++
        homeLoss++
    }

    awayOver6Arr.push(awayWin)
    awayUnder6Arr.push(awayLoss)
    homeOver6Arr.push(homeWin)
    homeUnder6Arr.push(homeLoss)

}

// function updateTeamGoals(espnObject){
//     away_goals = parseInt(espnObject.away_score)
//     home_goals = parseInt(espnObject.home_score)

//     awayGoalsArr.push(away_goals)
//     homeGoalsArr.push(home_goals)
// }

function updateTeamLines(espnObject, actionObject, awayWin, awayLoss, homeWin, homeLoss){
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('-')){
        if(actionObject.away_opening_odds != actionObject.home_opening_odds){
            if(parseInt(actionObject.away_opening_odds) < parseInt(actionObject.home_opening_odds)){
                (parseInt(espnObject.away_score) - parseInt(espnObject.home_score) > 1) ? awayWin++ : awayLoss++
            }else{
            (parseInt(espnObject.home_score) - parseInt(espnObject.away_score) > 1) ? homeWin++ : homeLoss++

            }
        }
    }else{
        if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('+')){
            (parseInt(espnObject.away_score) - parseInt(espnObject.home_score) > 1) ? awayWin++ : awayLoss++  
        }else if(actionObject.home_opening_odds.includes('-') && actionObject.away_opening_odds.includes('+')){
            (parseInt(espnObject.home_score) - parseInt(espnObject.away_score) > 1) ? homeWin++ : homeLoss++
        }
    }

    awayLineWinArr.push(awayWin)
    awayLineLossArr.push(awayLoss)
    homeLineWinArr.push(homeWin)
    homeLineLossArr.push(homeLoss)

}

function updateTeamRivalsML(espnObject, awayWin, awayLoss, homeWin, homeLoss){
    if(central.includes(espnObject.away_team) && central.includes(espnObject.home_team)){
        if(espnObject.away_win){
            awayWin++
            homeLoss++
        }else{
            awayLoss++
            homeWin++
        }
    }else if(pacific.includes(espnObject.away_team) && pacific.includes(espnObject.home_team)){
        if(espnObject.away_win){
            awayWin++
            homeLoss++
        }else{
            awayLoss++
            homeWin++
        }
    }else if(atlantic.includes(espnObject.away_team) && atlantic.includes(espnObject.home_team)){
        if(espnObject.away_win){
            awayWin++
            homeLoss++
        }else{
            awayLoss++
            homeWin++
        }
    }else if(metropolitan.includes(espnObject.away_team) && metropolitan.includes(espnObject.home_team)){
        if(espnObject.away_win){
            awayWin++
            homeLoss++
        }else{
            awayLoss++
            homeWin++
        }
    }

    awayRivalWinArr.push(awayWin)
    awayRivalLossArr.push(awayLoss)
    homeRivalWinArr.push(homeWin)
    homeRivalLossArr.push(homeLoss)

}

function updateTeamFaveML(espnObject, actionObject, awayWin, awayLoss, homeWin, homeLoss){
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('-')){
       if(actionObject.away_opening_odds != actionObject.home_opening_odds){
           if(parseInt(actionObject.away_opening_odds) < parseInt(actionObject.home_opening_odds)){
               espnObject.away_win ? awayWin++ : awayLoss++
           }else{
               espnObject.home_win ? homeWin++ : homeLoss++
           }
       } 
    }else{
        if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('+')){
            espnObject.away_win ? awayWin++ : awayLoss++
        }else if(actionObject.away_opening_odds.includes('+') && actionObject.home_opening_odds.includes('-')){
            espnObject.home_win ? homeWin++ : homeLoss++
        }
    }

    awayFaveWinArr.push(awayWin)
    awayFaveLossArr.push(awayLoss)
    homeFaveWinArr.push(homeWin)
    homeFaveLossArr.push(homeLoss)

}

function updateTeamDogML(espnObject, actionObject, awayWin, awayLoss, homeWin, homeLoss){
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('-')){
        if(actionObject.away_opening_odds != actionObject.home_opening_odds){
            if(parseInt(actionObject.away_opening_odds) > parseInt(actionObject.home_opening_odds)){
                espnObject.away_win ? awayWin++ : awayLoss++
            }else{
                espnObject.home_win ? homeWin++ : homeLoss++
            }
        }
    }else{
        if(actionObject.away_opening_odds.includes('+') && actionObject.home_opening_odds.includes('-')){
            espnObject.away_win ? awayWin++ : awayLoss++
        }else if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('+')){
            espnObject.home_win ? homeWin++ : homeLoss++
        }
    }

    awayDogWinArr.push(awayWin)
    awayDogLossArr.push(awayLoss)
    homeDogWinArr.push(homeWin)
    homeDogLossArr.push(homeLoss)
}

function updateSelectedTeamML(espnObject, awayWin, awayLoss, homeWin, homeLoss){
    if(espnObject.away_win){
        awayWin++
        homeLoss++
    }else{
        awayLoss++
        homeWin++
    }

    teamAwayWinArr.push(awayWin)
    teamAwayLossArr.push(awayLoss)
    teamHomeWinArr.push(homeWin)
    teamHomeLossArr.push(homeLoss)
}

function updateSelectedTeam170ML(espnObject, actionObject, awayWin, awayLoss, homeWin, homeLoss){
    if(actionObject.away_opening_odds.includes('-') && Math.abs(parseInt(actionObject.away_opening_odds)) >= 170 && Math.abs(parseInt(actionObject.away_opening_odds)) < 200){
        espnObject.away_win ? awayWin++ : awayLoss++
    }else if(actionObject.home_opening_odds.includes('-') && Math.abs(parseInt(actionObject.home_opening_odds)) >= 170 && Math.abs(parseInt(actionObject.home_opening_odds)) < 200){
        espnObject.home_win ? homeWin++ : homeLoss++
    }

    teamAway170WinArr.push(awayWin)
    teamAway170LossArr.push(awayLoss)
    teamHome170WinArr.push(homeWin)
    teamHome170LossArr.push(homeLoss)  
}

function updateSelectedTeam200ML(espnObject, actionObject, awayWin, awayLoss, homeWin, homeLoss){
    if(actionObject.away_opening_odds.includes('-') && Math.abs(parseInt(actionObject.away_opening_odds)) >= 200 && Math.abs(parseInt(actionObject.away_opening_odds)) < 300){
        espnObject.away_win ? awayWin++ : awayLoss++
    }else if(actionObject.home_opening_odds.includes('-') && Math.abs(parseInt(actionObject.home_opening_odds)) >= 200 && Math.abs(parseInt(actionObject.home_opening_odds)) < 170){
        espnObject.home_win ? homeWin++ : homeLoss++
    }

    teamAway200WinArr.push(awayWin)
    teamAway200LossArr.push(awayLoss)
    teamHome200WinArr.push(homeWin)
    teamHome200LossArr.push(homeLoss)  
}

function updateSelectedTeamTotal(espnObject, awayWin, awayLoss, homeWin, homeLoss){
    if(parseInt(espnObject.away_score) + parseInt(espnObject.home_score) > 6){
        awayWin++
        homeWin++
    }else{
        awayLoss++
        homeLoss++
    }

    teamAwayOver6Arr.push(awayWin)
    teamAwayUnder6Arr.push(awayLoss)
    teamHomeOver6Arr.push(homeWin)
    teamHomeUnder6Arr.push(homeLoss)
}

function updateSelectedTeamLines(espnObject, actionObject, awayWin, awayLoss, homeWin, homeLoss){
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('-')){
        if(actionObject.away_opening_odds != actionObject.home_opening_odds){
            if(parseInt(actionObject.away_opening_odds) < parseInt(actionObject.home_opening_odds)){
                (parseInt(espnObject.away_score) - parseInt(espnObject.home_score) > 1) ? awayWin++ : awayLoss++
            }else{
            (parseInt(espnObject.home_score) - parseInt(espnObject.away_score) > 1) ? homeWin++ : homeLoss++

            }
        }
    }else{
        if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('+')){
            (parseInt(espnObject.away_score) - parseInt(espnObject.home_score) > 1) ? awayWin++ : awayLoss++  
        }else if(actionObject.home_opening_odds.includes('-') && actionObject.away_opening_odds.includes('+')){
            (parseInt(espnObject.home_score) - parseInt(espnObject.away_score) > 1) ? homeWin++ : homeLoss++
        }
    }

    teamAwayLineWinArr.push(awayWin)
    teamAwayLineLossArr.push(awayLoss)
    teamHomeLineWinArr.push(homeWin)
    teamHomeLineLossArr.push(homeLoss)
}

function updateSelectedTeamRival(espnObject, awayWin, awayLoss, homeWin, homeLoss){
    if(central.includes(espnObject.away_team) && central.includes(espnObject.home_team)){
        if(espnObject.away_win){
            awayWin++
            homeLoss++
        }else{
            awayLoss++
            homeWin++
        }
    }else if(pacific.includes(espnObject.away_team) && pacific.includes(espnObject.home_team)){
        if(espnObject.away_win){
            awayWin++
            homeLoss++
        }else{
            awayLoss++
            homeWin++
        }
    }else if(atlantic.includes(espnObject.away_team) && atlantic.includes(espnObject.home_team)){
        if(espnObject.away_win){
            awayWin++
            homeLoss++
        }else{
            awayLoss++
            homeWin++
        }
    }else if(metropolitan.includes(espnObject.away_team) && metropolitan.includes(espnObject.home_team)){
        if(espnObject.away_win){
            awayWin++
            homeLoss++
        }else{
            awayLoss++
            homeWin++
        }
    }

    teamAwayRivalWinArr.push(awayWin)
    teamAwayRivalLossArr.push(awayLoss)
    teamHomeRivalWinArr.push(homeWin)
    teamHomeRivalLossArr.push(homeLoss)

}

function updateSelectedTeamFave(espnObject, actionObject, awayWin, awayLoss, homeWin, homeLoss){
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('-')){
        if(actionObject.away_opening_odds != actionObject.home_opening_odds){
            if(parseInt(actionObject.away_opening_odds) < parseInt(actionObject.home_opening_odds)){
                espnObject.away_win ? awayWin++ : awayLoss++
            }else{
                espnObject.home_win ? homeWin++ : homeLoss++
            }
        } 
     }else{
         if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('+')){
             espnObject.away_win ? awayWin++ : awayLoss++
         }else if(actionObject.away_opening_odds.includes('+') && actionObject.home_opening_odds.includes('-')){
             espnObject.home_win ? homeWin++ : homeLoss++
         }
     }
 
     teamAwayFaveWinArr.push(awayWin)
     teamAwayFaveLossArr.push(awayLoss)
     teamHomeFaveWinArr.push(homeWin)
     teamHomeFaveLossArr.push(homeLoss)
}

function updateSelectedTeamDog(espnObject, actionObject, awayWin, awayLoss, homeWin, homeLoss){
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('-')){
        if(actionObject.away_opening_odds != actionObject.home_opening_odds){
            if(parseInt(actionObject.away_opening_odds) > parseInt(actionObject.home_opening_odds)){
                espnObject.away_win ? awayWin++ : awayLoss++
            }else{
                espnObject.home_win ? homeWin++ : homeLoss++
            }
        }
    }else{
        if(actionObject.away_opening_odds.includes('+') && actionObject.home_opening_odds.includes('-')){
            espnObject.away_win ? awayWin++ : awayLoss++
        }else if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('+')){
            espnObject.home_win ? homeWin++ : homeLoss++
        }
    }

    teamAwayDogWinArr.push(awayWin)
    teamAwayDogLossArr.push(awayLoss)
    teamHomeDogWinArr.push(homeWin)
    teamHomeDogLossArr.push(homeLoss)
}



// function updateTeamFaveRivals(espnObject, actionObject){
//     if(central.includes(espnObject.away_team) && central.includes(espnObject.home_team) && espnObject.away_opening_odds.includes('-')){
//         if(espnObject.away_win){
//             away_fave_rival_record_win++
//         }
//     }
// }

function sendHomeAwayData(){
    // console.log(away170WinArr)
    // console.log(away170LossArr)
    // console.log(home170WinArr)
    // console.log(home170LossArr)

    for(let i = 0; i < gameArray.length; i++){

        let sql = `SELECT * FROM team_fave_record where team_name = '${gameArray[i].away_team}'`

        let tempTeam = gameArray[i].home_team.toLowerCase().replace(' ', '_')

        let winDog = `away_dog_ml_${tempTeam}_record_win`
        let lossDog = `away_dog_ml_${tempTeam}_record_loss`

        db.query(sql, function (err, result) {  
            if (err) throw err;  
            
    
            sql = `UPDATE team_fave_record SET away_dog_ml_${tempTeam}_record_win = ${teamAwayDogWinArr[i] + result[0][winDog]},
                                                away_dog_ml_${tempTeam}_record_loss = ${teamAwayDogLossArr[i] + result[0][lossDog]}
           
                                                WHERE team_name = '${gameArray[i].away_team}'`

    
            db.query(sql, function (err, result) {  
                if (err) throw err; 
                
            })   
        }) 

    }

    

    for(let i = 0; i < gameArray.length; i++){

        let sql = `SELECT * FROM team_fave_record where team_name = '${gameArray[i].home_team}'`

        let tempTeam = gameArray[i].away_team.toLowerCase().replace(' ', '_')

        let winDog = `home_dog_ml_${tempTeam}_record_win`
        let lossDog = `home_dog_ml_${tempTeam}_record_loss`

        db.query(sql, function (err, result) {  
            if (err) throw err;  
            
    
            sql = `UPDATE team_fave_record SET home_dog_ml_${tempTeam}_record_win = ${teamHomeDogWinArr[i] + result[0][winDog]},
                                                home_dog_ml_${tempTeam}_record_loss = ${teamHomeDogLossArr[i] + result[0][lossDog]}
           
                                                WHERE team_name = '${gameArray[i].home_team}'`

         
            
            db.query(sql, function (err, result) {  
                if (err) throw err; 
                
            }) 
        }) 

    }

    for(let i = 0; i < gameArray.length; i++){

        let sql = `SELECT * FROM nhl_data where team_name = '${gameArray[i].away_team}'`

        let tempTeam = gameArray[i].home_team.toLowerCase().replace(' ', '_')
        //console.log(tempTeam)
        // = tempTeam.join('_').toLowerCase()
        let opposingTeamWin = `away_ml_${tempTeam}_record_win`
        let opposingTeamLoss = `away_ml_${tempTeam}_record_loss`
        let win170 = `away_170_ml_${tempTeam}_record_win`
        let loss170 = `away_170_ml_${tempTeam}_record_loss`
        let win200 = `away_200_ml_${tempTeam}_record_win`
        let loss200 = `away_200_ml_${tempTeam}_record_loss`
        let winOver = `away_over_${tempTeam}_record`
        let lossUnder = `away_under_${tempTeam}_record`
        let winLine = `away_line_${tempTeam}_record_win`
        let lossLine = `away_line_${tempTeam}_record_loss`
        let winRival = `away_rivals_ml_${tempTeam}_record_win`
        let lossRival = `away_rivals_ml_${tempTeam}_record_loss`
        let winFave = `away_fave_ml_${tempTeam}_record_win`
        let lossFave = `away_fave_ml_${tempTeam}_record_loss`







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
                                               away_line_record_win = ${awayLineWinArr[i] + result[0].away_line_record_win},
                                               away_line_record_loss = ${awayLineLossArr[i] + result[0].away_line_record_loss},
                                               away_rival_record_win = ${awayRivalWinArr[i] + result[0].away_rival_record_win},
                                               away_rival_record_loss = ${awayRivalLossArr[i] + result[0].away_rival_record_loss},
                                               away_fave_record_win = ${awayFaveWinArr[i] + result[0].away_fave_record_win},
                                               away_fave_record_loss = ${awayFaveLossArr[i] + result[0].away_fave_record_loss},
                                               away_dog_record_win = ${awayDogWinArr[i] + result[0].away_dog_record_win},
                                               away_dog_record_loss = ${awayDogLossArr[i] + result[0].away_dog_record_loss},
                                               away_ml_${tempTeam}_record_win = ${teamAwayWinArr[i] + result[0][opposingTeamWin]},
                                               away_ml_${tempTeam}_record_loss = ${teamAwayLossArr[i] + result[0][opposingTeamLoss]},
                                               away_170_ml_${tempTeam}_record_win = ${teamAway170WinArr[i] + result[0][win170]},
                                               away_170_ml_${tempTeam}_record_loss = ${teamAway170LossArr[i] + result[0][loss170]},
                                               away_200_ml_${tempTeam}_record_win = ${teamAway200WinArr[i] + result[0][win200]},
                                               away_200_ml_${tempTeam}_record_loss = ${teamAway200LossArr[i] + result[0][loss200]},
                                               away_over_${tempTeam}_record = ${teamAwayOver6Arr[i] + result[0][winOver]},
                                               away_under_${tempTeam}_record = ${teamAwayUnder6Arr[i] + result[0][lossUnder]},
                                               away_line_${tempTeam}_record_win = ${teamAwayLineWinArr[i] + result[0][winLine]},
                                               away_line_${tempTeam}_record_loss = ${teamAwayLineLossArr[i] + result[0][lossLine]},
                                               away_rivals_ml_${tempTeam}_record_win = ${teamAwayRivalWinArr[i] + result[0][winRival]},
                                               away_rivals_ml_${tempTeam}_record_loss = ${teamAwayRivalLossArr[i] + result[0][lossRival]},
                                               away_fave_ml_${tempTeam}_record_win = ${teamAwayFaveWinArr[i] + result[0][winFave]},
                                               away_fave_ml_${tempTeam}_record_loss = ${teamAwayFaveLossArr[i] + result[0][lossFave]}
                                               
                                               
                            WHERE team_name = '${gameArray[i].away_team}'`

                            // total_games = ${1 + result[0].total_games},
                            // away_goals = ${awayGoalsArr[i] + result[0].away_goals},
                            // total_games = ${1 + result[0].total_games},
                            // home_goals = ${homeGoalsArr[i] + result[0].away_goals},
            
                    db.query(sql, function (err, result) {  
                        if (err) throw err; 
                        
                    })   
                }) 
    }


    for(let i = 0; i < gameArray.length; i++){

        let sql = `SELECT * FROM nhl_data where team_name = '${gameArray[i].home_team}'`

        let tempTeam = gameArray[i].away_team.toLowerCase().replace(' ', '_')
        //console.log(tempTeam)


        let opposingTeamWin = `home_ml_${tempTeam}_record_win`
        let opposingTeamLoss = `home_ml_${tempTeam}_record_loss`
        let win170 = `home_170_ml_${tempTeam}_record_win`
        let loss170 = `home_170_ml_${tempTeam}_record_loss`
        let win200 = `home_200_ml_${tempTeam}_record_win`
        let loss200 = `home_200_ml_${tempTeam}_record_loss`
        let winOver = `home_over_${tempTeam}_record`
        let lossUnder = `home_under_${tempTeam}_record`
        let winLine = `home_line_${tempTeam}_record_win`
        let lossLine = `home_line_${tempTeam}_record_loss`
        let winRival = `home_rivals_ml_${tempTeam}_record_win`
        let lossRival = `home_rivals_ml_${tempTeam}_record_loss`
        let winFave = `home_fave_ml_${tempTeam}_record_win`
        let lossFave = `home_fave_ml_${tempTeam}_record_loss`


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
                                               home_line_record_win = ${homeLineWinArr[i] + result[0].home_line_record_win},
                                               home_line_record_loss = ${homeLineLossArr[i] + result[0].home_line_record_loss},
                                               home_rival_record_win = ${homeRivalWinArr[i] + result[0].home_rival_record_win},
                                               home_rival_record_loss = ${homeRivalLossArr[i] + result[0].home_rival_record_loss},
                                               home_fave_record_win = ${homeFaveWinArr[i] + result[0].home_fave_record_win},
                                               home_fave_record_loss = ${homeFaveLossArr[i] + result[0].home_fave_record_loss},
                                               home_dog_record_win = ${homeDogWinArr[i] + result[0].home_dog_record_win},
                                               home_dog_record_loss = ${homeDogLossArr[i] + result[0].home_dog_record_loss},
                                               home_ml_${tempTeam}_record_win = ${teamHomeWinArr[i] + result[0][opposingTeamWin]},
                                               home_ml_${tempTeam}_record_loss = ${teamHomeLossArr[i] + result[0][opposingTeamLoss]},
                                               home_170_ml_${tempTeam}_record_win = ${teamHome170WinArr[i] + result[0][win170]},
                                               home_170_ml_${tempTeam}_record_loss = ${teamHome170LossArr[i] + result[0][loss170]},
                                               home_200_ml_${tempTeam}_record_win = ${teamHome200WinArr[i] + result[0][win200]},
                                               home_200_ml_${tempTeam}_record_loss = ${teamHome200LossArr[i] + result[0][loss200]},
                                               home_over_${tempTeam}_record = ${teamHomeOver6Arr[i] + result[0][winOver]},
                                               home_under_${tempTeam}_record = ${teamHomeUnder6Arr[i] + result[0][lossUnder]},
                                               home_line_${tempTeam}_record_win = ${teamHomeLineWinArr[i] + result[0][winLine]},
                                               home_line_${tempTeam}_record_loss = ${teamHomeLineLossArr[i] + result[0][lossLine]},
                                               home_rivals_ml_${tempTeam}_record_win = ${teamHomeRivalWinArr[i] + result[0][winRival]},
                                               home_rivals_ml_${tempTeam}_record_loss = ${teamHomeRivalLossArr[i] + result[0][lossRival]},
                                               home_fave_ml_${tempTeam}_record_win = ${teamHomeRivalWinArr[i] + result[0][winFave]},
                                               home_fave_ml_${tempTeam}_record_loss = ${teamHomeRivalLossArr[i] + result[0][lossFave]}
                                        
                
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