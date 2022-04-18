const { jsonp } = require('express/lib/response');
const mysql = require('mysql')
let actionjson = require('/Users/jesse/OneDrive/Desktop/projects/hindsite/testData.json');
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

let ml_record_win = 0
let ml_record_loss = 0
let seventy_ml_record_win = 0
let seventy_ml_record_loss = 0
let ninety_ml_record_win = 0
let ninety_ml_record_loss = 0
let vs_ml_record_win = 0
let vs_ml_record_loss = 0
let favorite_ml_record_win = 0
let favorite_ml_record_loss = 0
let favorite_bets_ml_record_win = 0
let favorite_bets_ml_record_loss = 0
let close_ml_record_win = 0
let close_ml_record_loss = 0
let dog_ml_record_win = 0
let dog_ml_record_loss = 0
let dog_bets_ml_record_win = 0
let dog_bets_ml_record_loss = 0
let one_seventy_ml_record_win = 0
let one_seventy_ml_record_loss = 0
let two_hundred_ml_record_win = 0
let two_hundred_ml_record_loss = 0
let three_hundred_ml_record_win = 0
let three_hundred_ml_record_loss = 0
for(let i = 0; i < gameArray.length; i++){
    for(let j = 0; j < actionjson.length; j++){
        if(gameArray[i].away_team == actionjson[j].away_team){
            updatePublicML(gameArray[i], actionjson[j])
            update70PublicML(gameArray[i], actionjson[j])
            update90PublicML(gameArray[i], actionjson[j])
            updateClosingVersusOpeningOdds(gameArray[i], actionjson[j])
            updateFavoritesML(gameArray[i], actionjson[j])
            updateFavoriteBetsML(gameArray[i], actionjson[j])
            updateCloseOddsML(gameArray[i], actionjson[j])
            updateDogsML(gameArray[i], actionjson[j])
            updateDogBetsML(gameArray[i], actionjson[j])
            update170ML(gameArray[i],actionjson[j])
            update200ML(gameArray[i],actionjson[j])
            update300ML(gameArray[i],actionjson[j])
        }
    }
}

sendData()

// bet percentages 50-50 check
// open and closing odds are the same

function updatePublicML(espnObject, actionObject){
    if(actionObject.away_bets_percentage != actionObject.home_bets_percentage){
        if(actionObject.away_bets_percentage > actionObject.home_bets_percentage){
            espnObject.away_win ? ml_record_win++ : ml_record_loss++
        }else{
            espnObject.home_win ? ml_record_win++ : ml_record_loss++
        }
    }
}

function update70PublicML(espnObject, actionObject){
    if(actionObject.away_bets_percentage >= 70  && actionObject.away_bets_percentage < 90){
        espnObject.away_win ? seventy_ml_record_win++ : seventy_ml_record_loss++
    }else if(actionObject.home_bets_percentage >= 70 && actionObject.home_bets_percentage < 90){
        espnObject.home_win ? seventy_ml_record_win++ : seventy_ml_record_loss++
    }
}

function update90PublicML(espnObject, actionObject){
    if(actionObject.away_bets_percentage >= 90){
        espnObject.away_win ? ninety_ml_record_win++ : ninety_ml_record_loss++
    }else if(actionObject.home_bets_percentage >= 90){
        espnObject.home_win ? ninety_ml_record_win++ : ninety_ml_record_loss++
    }
}

function updateClosingVersusOpeningOdds(espnObject, actionObject){

    // checks to see if they opened at even odds
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('-')){
        if(parseInt(actionObject.away_opening_odds) > parseInt(actionObject.away_closing_odds)
            && actionObject.away_opening_odds != actionObject.home_opening_odds){
            espnObject.away_win ? vs_ml_record_win++ : vs_ml_record_loss++
        }else if(parseInt(actionObject.home_opening_odds) > parseInt(actionObject.home_closing_odds)
            && actionObject.away_opening_odds != actionObject.home_opening_odds){
            espnObject.home_win ? vs_ml_record_win++ : vs_ml_record_loss++
        }
    }else{
        if(actionObject.away_opening_odds.includes('-')){
            if(parseInt(actionObject.away_opening_odds) > parseInt(actionObject.away_closing_odds)){
                espnObject.away_win ? vs_ml_record_win++ : vs_ml_record_loss++
            }
        }else if(actionObject.home_opening_odds.includes('-')){
            if(parseInt(actionObject.home_opening_odds) > parseInt(actionObject.home_closing_odds)){
                espnObject.home_win ? vs_ml_record_win++ : vs_ml_record_loss++
            }
        }
    }
}

function updateFavoritesML(espnObject, actionObject){
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('-')){
        if(parseInt(actionObject.away_opening_odds) < parseInt(actionObject.home_opening_odds)){
            espnObject.away_win ? favorite_ml_record_win++ : favorite_ml_record_loss++
        }else if(parseInt(actionObject.home_opening_odds) < parseInt(actionObject.away_opening_odds)){
            espnObject.home_win ? favorite_ml_record_win++ : favorite_ml_record_loss++
        }
    }else if(actionObject.away_opening_odds.includes('+') && actionObject.home_opening_odds.includes('+')){
        if(parseInt(actionObject.away_opening_odds) < parseInt(actionObject.home_opening_odds)){
            espnObject.away_win ? favorite_ml_record_win++ : favorite_ml_record_loss++
        }else if(parseInt(actionObject.home_opening_odds) < parseInt(actionObject.away_opening_odds)){
            espnObject.home_win ? favorite_ml_record_win++ : favorite_ml_record_loss++
        }
    }else{
        if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('+')){
            espnObject.away_win ? favorite_ml_record_win++ : favorite_ml_record_loss++
        }else if(actionObject.home_opening_odds.includes('-') && actionObject.away_opening_odds.includes('+')){
            espnObject.home_win ? favorite_ml_record_win++ : favorite_ml_record_loss++
        }
    }
}

function updateFavoriteBetsML(espnObject, actionObject){
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('-')){
        if(actionObject.away_opening_odds != actionObject.home_opening_odds){
            if(parseInt(actionObject.away_opening_odds) < parseInt(actionObject.home_opening_odds)){
                if(actionObject.away_bets_percentage > actionObject.home_bets_percentage){
                    espnObject.away_win ? favorite_bets_ml_record_win++ : favorite_bets_ml_record_loss++
                }
            }else if(parseInt(actionObject.away_opening_odds) > parseInt(actionObject.home_opening_odds)){
                if(actionObject.away_bets_percentage > actionObject.home_bets_percentage){
                    espnObject.home_win ? favorite_bets_ml_record_win++ : favorite_bets_ml_record_loss++
                }
            }
        }
    }else if(actionObject.away_opening_odds.includes('+') && actionObject.home_opening_odds.includes('+')){
        if(actionObject.away_opening_odds != actionObject.home_opening_odds){
            if(parseInt(actionObject.away_opening_odds) < parseInt(actionObject.home_opening_odds)){
                if(actionObject.away_bets_percentage > actionObject.home_bets_percentage){
                    espnObject.away_win ? favorite_bets_ml_record_win++ : favorite_bets_ml_record_loss++
                }
            }else if(parseInt(actionObject.away_opening_odds) > parseInt(actionObject.home_opening_odds)){
                if(actionObject.away_bets_percentage > actionObject.home_bets_percentage){
                    espnObject.home_win ? favorite_bets_ml_record_win++ : favorite_bets_ml_record_loss++
                }
            }
        }
    }else{
        if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('+')){
            if(actionObject.away_bets_percentage > actionObject.home_bets_percentage){
                espnObject.away_win ? favorite_bets_ml_record_win++ : favorite_bets_ml_record_loss++
            }
        }else if(actionObject.home_opening_odds.includes('-') && actionObject.away_opening_odds.includes('+')){
            if(actionObject.home_bets_percentage > actionObject.away_bets_percentage){
                espnObject.home_win ? favorite_bets_ml_record_win++ : favorite_bets_ml_record_loss++
            }
        }
    }
}

function updateCloseOddsML(espnObject, actionObject){
    // checks if odds are -140 or closer
    if(parseInt(actionObject.away_opening_odds) <= 140 && parseInt(actionObject.away_opening_odds) >= -140
        && parseInt(actionObject.home_opening_odds) <= 140 && parseInt(actionObject.home_opening_odds) >= -140){
        if(actionObject.away_bets_percentage != actionObject.home_bets_percentage){
            if(actionObject.away_bets_percentage > actionObject.home_bets_percentage){
                espnObject.away_win ? close_ml_record_win++ : close_ml_record_loss++
            }else{
                espnObject.home_win ? close_ml_record_win++ : close_ml_record_loss++
            }
        }
    }
}

function updateDogsML(espnObject, actionObject){
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('-')){
        if(actionObject.away_opening_odds != actionObject.home_opening_odds){
            if(parseInt(actionObject.away_opening_odds) > parseInt(actionObject.home_opening_odds)){
                espnObject.away_win ? dog_ml_record_win++ : dog_ml_record_loss++
            }else{
                espnObject.home_win ? dog_ml_record_win++ : dog_ml_record_loss++
            }
        }
    }else if(actionObject.away_opening_odds.includes('+') && actionObject.home_opening_odds.includes('+')){
        if(parseInt(actionObject.away_opening_odds) > parseInt(actionObject.home_opening_odds)){
            espnObject.away_win ? dog_ml_record_win++ : dog_ml_record_loss++
        }else if(parseInt(actionObject.home_opening_odds) > parseInt(actionObject.away_opening_odds)){
            espnObject.home_win ? dog_ml_record_win++ : dog_ml_record_loss++
        }
    }else{
        if(actionObject.away_opening_odds.includes('+') && actionObject.home_opening_odds.includes('-')){
            espnObject.away_win ? dog_ml_record_win++ : dog_ml_record_loss++
        }else if(actionObject.home_opening_odds.includes('+') && actionObject.away_opening_odds.includes('-')){
            espnObject.home_win ? dog_ml_record_win++ : dog_ml_record_loss++
        }
    }
}

function updateDogBetsML(espnObject, actionObject){
    if(actionObject.away_opening_odds.includes('-') && actionObject.home_opening_odds.includes('-')){
        if(actionObject.away_opening_odds != actionObject.home_opening_odds){
            if(parseInt(actionObject.away_opening_odds) > parseInt(actionObject.home_opening_odds)){
                if(actionObject.away_bets_percentage > actionObject.home_bets_percentage){
                    espnObject.away_win ? dog_bets_ml_record_win++ : dog_bets_ml_record_loss++
                }
            }else if(parseInt(actionObject.away_opening_odds) < parseInt(actionObject.home_opening_odds)){
                if(actionObject.away_bets_percentage < actionObject.home_bets_percentage){
                    espnObject.home_win ? dog_bets_ml_record_win++ : dog_bets_ml_record_loss++
                }
            }
        }
    }else if(actionObject.away_opening_odds.includes('+') && actionObject.home_opening_odds.includes('+')){
        if(actionObject.away_opening_odds != actionObject.home_opening_odds){
            if(parseInt(actionObject.away_opening_odds) > parseInt(actionObject.home_opening_odds)){
                if(actionObject.away_bets_percentage > actionObject.home_bets_percentage){
                    espnObject.away_win ? dog_bets_ml_record_win++ : dog_bets_ml_record_loss++
                }
            }else if(parseInt(actionObject.away_opening_odds) < parseInt(actionObject.home_opening_odds)){
                if(actionObject.away_bets_percentage < actionObject.home_bets_percentage){
                    espnObject.home_win ? dog_bets_ml_record_win++ : dog_bets_ml_record_loss++
                }
            }
        }
    }else{
        if(actionObject.away_opening_odds.includes('+') && actionObject.home_opening_odds.includes('-')){
            if(actionObject.away_bets_percentage > actionObject.home_bets_percentage){
                espnObject.away_win ? dog_bets_ml_record_win++ : dog_bets_ml_record_loss++
            }
        }else if(actionObject.home_opening_odds.includes('+') && actionObject.away_opening_odds.includes('-')){
            if(actionObject.home_bets_percentage > actionObject.away_bets_percentage){
                espnObject.home_win ? dog_bets_ml_record_win++ : dog_bets_ml_record_loss++
            }
        }
    }
    console.log(actionObject.away_team + ' ' + dog_bets_ml_record_win)
    console.log(actionObject.home_team + ' ' + dog_bets_ml_record_loss + '\n')

}


function update170ML(espnObject, actionObject){
    if(actionObject.away_opening_odds.includes('-') && Math.abs(parseInt(actionObject.away_opening_odds)) >= 170 && Math.abs(parseInt(actionObject.away_opening_odds)) < 200){
        espnObject.away_win ? one_seventy_ml_record_win++ : one_seventy_ml_record_loss++
    }else if(actionObject.home_opening_odds.includes('-') && Math.abs(parseInt(actionObject.home_opening_odds)) >= 170 && Math.abs(parseInt(actionObject.home_opening_odds)) < 200){
        espnObject.home_win ? one_seventy_ml_record_win++ : one_seventy_ml_record_loss++
    }
}
function update200ML(espnObject, actionObject){
    if(actionObject.away_opening_odds.includes('-') && Math.abs(parseInt(actionObject.away_opening_odds)) >= 200 && Math.abs(parseInt(actionObject.away_opening_odds)) < 300){
        espnObject.away_win ? two_hundred_ml_record_win++ : two_hundred_ml_record_loss++
    }else if(actionObject.home_opening_odds.includes('-') && Math.abs(parseInt(actionObject.home_opening_odds)) >= 200 && Math.abs(parseInt(actionObject.home_opening_odds)) < 300){
        espnObject.home_win ? two_hundred_ml_record_win++ : two_hundred_ml_record_loss++
    }
}

function update300ML(espnObject, actionObject){
    if(actionObject.away_opening_odds.includes('-') && Math.abs(parseInt(actionObject.away_opening_odds)) >= 300){
        espnObject.away_win ? three_hundred_ml_record_win++ : three_hundred_ml_record_loss++
    }else if(actionObject.home_opening_odds.includes('-') && Math.abs(parseInt(actionObject.home_opening_odds)) >= 300){
        espnObject.home_win ? three_hundred_ml_record_win++ : three_hundred_ml_record_loss++
    }
}



function sendData(){
    sql = 'SELECT * FROM public_betting_data'

    const test = '.200_ml_record_win'

    db.query(sql, function (err, result) {  
        if (err) throw err;  
        sql = `UPDATE public_betting_data SET ml_record_win = ${ml_record_win + result[0].ml_record_win},
                                         ml_record_loss = ${ml_record_loss + result[0].ml_record_loss}, 
                                         _70_ml_record_win = ${seventy_ml_record_win + result[0]._70_ml_record_win}, 
                                         _70_ml_record_loss = ${seventy_ml_record_loss + result[0]._70_ml_record_loss},
                                         _90_ml_record_win = ${ninety_ml_record_win + result[0]._90_ml_record_win},
                                         _90_ml_record_loss = ${ninety_ml_record_loss + result[0]._90_ml_record_loss},
                                         close_open_record_win = ${vs_ml_record_win + result[0].close_open_record_win},
                                         close_open_record_loss = ${vs_ml_record_loss + result[0].close_open_record_loss},
                                         favorite_ml_record_win = ${favorite_ml_record_win + result[0].favorite_ml_record_win},
                                         favorite_ml_record_loss = ${favorite_ml_record_loss + result[0].favorite_ml_record_loss},
                                         favorite_bets_ml_record_win = ${favorite_bets_ml_record_win + result[0].favorite_bets_ml_record_win},
                                         favorite_bets_ml_record_loss = ${favorite_bets_ml_record_loss + result[0].favorite_bets_ml_record_loss},
                                         close_odds_record_win = ${close_ml_record_win + result[0].close_odds_record_win},
                                         close_odds_record_loss = ${close_ml_record_loss + result[0].close_odds_record_loss},
                                         dog_ml_record_win = ${dog_ml_record_win + result[0].dog_ml_record_win},
                                         dog_ml_record_loss = ${dog_ml_record_loss + result[0].dog_ml_record_loss},
                                         dog_bets_ml_record_win = ${dog_bets_ml_record_win + result[0].dog_bets_ml_record_win},
                                         dog_bets_ml_record_loss = ${dog_bets_ml_record_loss + result[0].dog_bets_ml_record_loss},
                                         _170_ml_record_win = ${one_seventy_ml_record_win + result[0]._170_ml_record_win},
                                         _170_ml_record_loss = ${one_seventy_ml_record_loss + result[0]._170_ml_record_loss},
                                         _200_ml_record_win = ${two_hundred_ml_record_win + result[0]._200_ml_record_win},
                                         _200_ml_record_loss = ${two_hundred_ml_record_loss + result[0]._200_ml_record_loss},
                                         _300_ml_record_win = ${three_hundred_ml_record_win + result[0]._300_ml_record_win},
                                         _300_ml_record_loss = ${three_hundred_ml_record_loss + result[0]._300_ml_record_loss}
                                         WHERE id = 1`
    
        db.query(sql, function (err, result) {  
            if (err) throw err;  
            console.log("Action Data records updated");  
        })  
    })
}
