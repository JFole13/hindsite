const { jsonp } = require('express/lib/response');
let json = require('/Users/jesse/OneDrive/Desktop/projects/hindsite/espnData.json');

// for(let i = 0; i < json.content.length; i++){
    
// }

let Team = {
    team_name : `${json.content[0].teamOneName}`,
    record : `${json.content[0].teamOneRecord}`
}

module.exports = {Team}


console.log(json.content[0].teamOneRecord);