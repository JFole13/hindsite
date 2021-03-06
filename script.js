// makes public betting stats the initial landing page 
fetch('http://localhost:3000/getpublic')
        .then(function(response){
            return response.json()
        }).then(function(response){

            generateInitialDivs(response)

            fetch('http://localhost:3000/getteams')
                .then(function(response2){
                    return response2.json()
                }).then(function(response2){
                    //getTrending2(response, response2)
                }).catch(error => {
                    throw error
                });
            
        }).catch(error => {
            throw error
        });



const publicDataLabels = ['ML', '70%> ML', '90%> ML', 'Close > Open', 'Favorite ML', 'Favorite Bets', 'Close Odds', 'Dog ML', 
                    'Dog Bets', '-170> ML', '-200> ML', '-300> ML']

const teamDataLabels = ['Away ML', 'Home ML', 'Away -170> ML', 'Home -170> ML', 'Away -200> ML', 'Home -200> ML', 'Away Over 6', 
                        'Home Over 6', 'Away Puck Line', 'Home Puck Line', 'Away Rivals ML', 'Home Rivals ML', 'Away Fave ML', 
                        'Home Fave ML', 'Away Dog ML', 'Home Dog ML']

const PublicColor = '44,40,44,0'

const teams = document.querySelectorAll('select')

const iterations = 32

for(let i = 0; i < teams.length; i++){
    teams[i].addEventListener('change', getTeamInfo)
}

function getTeamInfo(){

    // grabs team name when clicked on 
    let team_name = this.options[this.selectedIndex].text.split(" ");
    let team_name_for_img = this.options[this.selectedIndex].text

    // for teams with three words  (two-worded names had to be explicitly stated)
    let teamRequest
    if(team_name.length > 2){
        teamRequest = team_name[2]
        if(teamRequest == 'Jackets'){
            teamRequest = 'Blue Jackets'
        }else if(teamRequest == 'Wings'){
            teamRequest = 'Red Wings'
        }else if(teamRequest == 'Leafs'){
            teamRequest = 'Maple Leafs'
        }else if(teamRequest == 'Knights'){
            teamRequest = 'Golden Knights'
        }
    }else{
        teamRequest = team_name[1]
    }

    
    let teamContainer

    // lets you know what side you selected the team on
    let containerID = this.id
    containerID == 'teams-1' ? teamContainer = document.getElementById('team-1-name-container') : teamContainer = document.getElementById('team-2-name-container')

    if(teamRequest != 'Betting' && teamRequest != 'Streaks'){
        fetch(`http://localhost:3000/getteam/${teamRequest}`)
        .then(function(response){
            return response.json()
        }).then(function(response){
            if(containerID == 'teams-1'){
                document.getElementById('team-1-data-container').innerHTML = ''
                teamContainer.style.background = `linear-gradient(270deg, rgba(57,57,57,1) 0%, ${hexToRgb(response[0].color)} 100%, rgba(0,212,255,1) 100%)`
               

                let ele = document.getElementById('teams-1')

                for (let i = 0; i < ele.length; i++) {
                    if (ele[i].childNodes[0].nodeValue.toLowerCase().includes(ele.value.toLowerCase().replace('_', ' '))){
                        document.getElementById('teams-2').options[i].disabled = true
                    }else{
                        document.getElementById('teams-2').options[i].disabled = false

                    }
                }


                if(team_name_for_img != 'Public Betting'){
                    document.getElementById('team-1-img').style.opacity = '1'
                    document.getElementById('team-1-img').src = `images/${team_name_for_img}.svg`
                }else{
                    document.getElementById('team-1-img').style.opacity = '0'
                   
                }

                generateDivs(response)
            }else{
                document.getElementById('team-2-data-container').innerHTML = ''
                teamContainer.style.background = `linear-gradient(90deg, rgba(57,57,57,1) 0%, ${hexToRgb(response[0].color)} 100%, rgba(0,212,255,1) 100%)`
                
                let ele = document.getElementById('teams-2')

                for (let i = 0; i < ele.length; i++) {
                    if (ele[i].childNodes[0].nodeValue.toLowerCase().includes(ele.value.toLowerCase().replace('_', ' '))){
                        document.getElementById('teams-1').options[i].disabled = true
                    }else{
                        document.getElementById('teams-1').options[i].disabled = false

                    }
                }

                
                if(team_name_for_img != 'Public Betting'){
                    document.getElementById('team-2-img').style.opacity = '1'
                    document.getElementById('team-2-img').src = `images/${team_name_for_img}.svg`
                }else{
                    document.getElementById('team-2-img').style.opacity = '0'
                    
                }
                generate2Divs(response)
            }
        }).catch(error => {
            throw error
        });
    }else{
        fetch('http://localhost:3000/getpublic')
        .then(function(response){
            return response.json()
        }).then(function(response){
            if(containerID == 'teams-1'){
                document.getElementById('team-1-data-container').innerHTML = ''
                teamContainer.style.background = `linear-gradient(270deg, rgba(57,57,57,1) 0%, rgba(${PublicColor}) 100%, rgba(0,212,255,1) 100%)`
                document.getElementById('team-1-img').style.opacity = '0'
                
                if(teamRequest == 'Streaks'){
                    fetch('http://localhost:3000/getteams')
                    .then(function(response2){
                        return response2.json()
                    }).then(function(response2){
                        //getTrending(response, response2)
                    }).catch(error => {
                        throw error
                    });
                }else{

                    let ele = document.getElementById('teams-2')

                    for (let i = 0; i < ele.length; i++) {
                        if (ele[i].childNodes[0].nodeValue.toLowerCase().includes(ele.value.toLowerCase().replace('_', ' '))){
                            
                            document.getElementById('teams-1').options[i].disabled = true
                        }else{
                            document.getElementById('teams-1').options[i].disabled = false
    
                        }
                    }

                    console.log(ele[0].childNodes[0].nodeValue.toLowerCase())
                    console.log(ele.value)


                    generateInitialDivs(response)
                }
            }else{
                document.getElementById('team-2-data-container').innerHTML = ''
                teamContainer.style.background = `linear-gradient(90deg, rgba(57,57,57,1) 0%, rgba(${PublicColor}) 100%, rgba(0,212,255,1) 100%)`
                document.getElementById('team-2-img').style.opacity = '0'
                
                if(teamRequest == 'Streaks'){
                    fetch('http://localhost:3000/getteams')
                    .then(function(response2){
                        return response2.json()
                    }).then(function(response2){
                        //getTrending2(response, response2)
                    }).catch(error => {
                        throw error
                    });
                }else{

                    let ele = document.getElementById('teams-2')

                    for (let i = 0; i < ele.length; i++) {
                        if (ele[i].childNodes[0].nodeValue.toLowerCase().includes(ele.value.toLowerCase().replace('_', ' '))){
                            document.getElementById('teams-1').options[i].disabled = true
                        }else{
                            document.getElementById('teams-1').options[i].disabled = false
    
                        }
                    }

                    generateInitial2Divs(response)
                }

            }
        }).catch(error => {
            throw error
        });
    }
}


  
function generateDivs(data){
    
    let div, h3, p
    let dataArray = []
    
    // Have to have seperate loop to get data from response
    for(const [key, value] of Object.entries(data[0])){
        if(key != 'id'){
            dataArray.push(value)
        }
    }
    
    // alters loops and labels for either team or public selection
    let i, dataLables
    if(typeof dataArray[0] == 'string'){
        i = 3
        dataLables = teamDataLabels
    }else{
        i = 1
        dataLables = publicDataLabels
    }

    
    let teamName = document.getElementById('teams-2').value

    // count is for div naming
    let idCount = 0
    let count = 1


    let containerCount
    if(teamName != 'trending' && teamName != 'public'){
        containerCount = iterations + 3
    }else{
        containerCount = 19
    }

    let anotherCount = 0

    for(i; i < containerCount; i++){
        div = document.createElement('div')
        div.classList.add('data')
        div.id = 'team-1-container-' + idCount

        if(i % 3 == 2){
            div.style.borderRight = '1px solid #3C3D4C'
        }

        h3 =  document.createElement('h3')
        h3Team = document.createElement('h3')

        h3.innerHTML = dataLables[count - 1]

        p = document.createElement('p')

        if(i > 18){

                
                if(teamName == 'red_wings' || teamName == 'blue_jackets' || 
                    teamName == 'golden_knights' || teamName == 'maple_leafs'){
                    let underScoreIndex = teamName.indexOf('_')
                    h3.innerHTML = dataLables[anotherCount] 
                    h3Team.innerHTML = `(${teamName.charAt(underScoreIndex + 1).toUpperCase() + teamName.slice(underScoreIndex + 2)})`
                }else{
                    h3.innerHTML = dataLables[anotherCount]
                    h3Team.innerHTML = ` (${teamName.charAt(0).toUpperCase() + teamName.slice(1)})`
                }

                anotherCount++
                //split, to lower case it
                let words = dataLables[count - 1].split(' ')

                let label = ''
                for(let x = 0; x < words.length; x++){
    
                    label += words[x].toLowerCase() + '_'
                    label = label.replace('-', '')
                    label = label.replace('>', '')
                    
                }
    
                let request1, request2
                if(label == 'home_over_6_'){
                    request1 = `home_over_${teamName}_record`
                    request2 = `home_under_${teamName}_record`
                }else if(label == 'away_over_6_'){
                    request1 = `away_over_${teamName}_record`
                    request2 = `away_under_${teamName}_record`
                }else if(label == 'home_puck_line_'){
                    request1 = `home_line_${teamName}_record_win`
                    request2 = `home_line_${teamName}_record_loss`
                }else if(label == 'away_puck_line_'){
                    request1 = `away_line_${teamName}_record_win`
                    request2 = `away_line_${teamName}_record_loss`
                }else{
                    request1 = `${label}${teamName}_record_win`
                    request2 = `${label}${teamName}_record_loss`
                }

                p.innerHTML = `${data[0][request1]} - ${data[0][request2]}`
            }else{
                p.innerHTML = `${dataArray[2 * i - 3]} - ${dataArray[2 * i - 2]}`
            }
        
        
        div.appendChild(h3)
        div.appendChild(h3Team)
        div.appendChild(p)
        
        document.getElementById('team-1-data-container').appendChild(div)
        count++

        if(i == 18){
            count = 1
        }

        idCount++

    }

    let team = teamName.replace('_', ' ')

        if(team.includes(' ')){
            let underScoreIndex = team.indexOf(' ')
            team = team.charAt(0).toUpperCase() + team.slice(1, underScoreIndex) + ' ' + 
                    team.charAt(underScoreIndex + 1).toUpperCase() + team.slice(underScoreIndex + 2)
        }else{
            team = team.charAt(0).toUpperCase() + teamName.slice(1)
        }


        if(team != 'Trending' && team != 'Public'){
            fetch(`http://localhost:3000/getteam/${team}`)
            .then(function(response){
                return response.json()
            }).then(function(response){
                //console.log(response)

                for(let j = 16; j < iterations; j++){
                    if(document.getElementById('team-2-data-container').contains(document.getElementById('team-2-container-' + j))){
                        document.getElementById('team-2-container-' +  j).remove()
                    }
                }

                let anotherCount = 0
                for(let i = 16; i < iterations; i++){

                    


                    let words = dataLables[anotherCount].split(' ')
                    
                    let label = ''
                    for(let x = 0; x < words.length; x++){
    
                        label += words[x].toLowerCase() + '_'
                        label = label.replace('-', '')
                        label = label.replace('>', '')
                        
                    }    


                    let div = document.createElement('div')
                    div.id = 'team-2-container-' + i
                    div.classList.add('data')
                    document.getElementById('team-2-data-container').appendChild(div)
                    div.appendChild(document.createElement('h3'))

                    let h3Team = document.createElement('h3')
                    div.appendChild(h3Team)

                    div.appendChild(document.createElement('p'))

                    let teamNameforOpposingHeaders = document.getElementById('teams-1').value 
                    
                    if(teamNameforOpposingHeaders == 'red_wings' || teamNameforOpposingHeaders == 'blue_jackets' || 
                    teamNameforOpposingHeaders == 'golden_knights' || teamNameforOpposingHeaders == 'maple_leafs'){
                        let underScoreIndex = teamNameforOpposingHeaders.indexOf('_')
                        div.firstChild.innerHTML = dataLables[anotherCount] 
                        h3Team.innerHTML = `(${teamNameforOpposingHeaders.charAt(underScoreIndex + 1).toUpperCase() + teamNameforOpposingHeaders.slice(underScoreIndex + 2)})`
                    }else{
                        div.firstChild.innerHTML = dataLables[anotherCount]
                        h3Team.innerHTML = ` (${teamNameforOpposingHeaders.charAt(0).toUpperCase() + teamNameforOpposingHeaders.slice(1)})`
                    }

                    //+ ` (${teamNameforOpposingHeaders.charAt(underScoreIndex + 1).toUpperCase() + teamNameforOpposingHeaders.slice(underScoreIndex + 2)})`
                    //+ ` (${teamNameforOpposingHeaders.charAt(0).toUpperCase() + teamNameforOpposingHeaders.slice(1)})`    
                    let request1, request2
                    if(label == 'home_over_6_'){
                        request1 = `home_over_${teamNameforOpposingHeaders}_record`
                        request2 = `home_under_${teamNameforOpposingHeaders}_record`
                    }else if(label == 'away_over_6_'){
                        request1 = `away_over_${teamNameforOpposingHeaders}_record`
                        request2 = `away_under_${teamNameforOpposingHeaders}_record`
                    }else if(label == 'home_puck_line_'){
                        request1 = `home_line_${teamNameforOpposingHeaders}_record_win`
                        request2 = `home_line_${teamNameforOpposingHeaders}_record_loss`
                    }else if(label == 'away_puck_line_'){
                        request1 = `away_line_${teamNameforOpposingHeaders}_record_win`
                        request2 = `away_line_${teamNameforOpposingHeaders}_record_loss`
                    }else{
                        request1 = `${label}${teamNameforOpposingHeaders}_record_win`
                        request2 = `${label}${teamNameforOpposingHeaders}_record_loss`
                    }

                
                    div.lastChild.innerHTML = `${response[0][request1]} - ${response[0][request2]}`

                    anotherCount++
                    
                }
            }).catch(error => {
                throw error
            })
        }



}

  
function generate2Divs(data){
    let div, h3, p
    let dataArray = []
    
    // Have to have seperate loop to get data from response
    for(const [key, value] of Object.entries(data[0])){
        if(key != 'id'){
            dataArray.push(value)
        }
    }
    
    // alters loops and labels for either team or public selection
    let i, dataLables
    if(typeof dataArray[0] == 'string'){
        i = 3
        dataLables = teamDataLabels
    }else{
        i = 1
        dataLables = publicDataLabels
    }

    let teamName = document.getElementById('teams-1').value


    let containerCount
    if(teamName != 'trending' && teamName != 'public'){
        containerCount = iterations + 3
    }else{
        containerCount = 19
    }

    
  
    // count is for div naming
    let idCount = 0
    let count = 1
    let anotherCount = 0
    for(i; i < containerCount; i++){
        div = document.createElement('div')
        div.classList.add('data')
        div.id = 'team-2-container-' + idCount

        h3 =  document.createElement('h3')
        h3.innerHTML = dataLables[count - 1]

        let h3Team = document.createElement('h3')

        p = document.createElement('p')

      
       
        if(i > 18){


            if(teamName == 'red_wings' || teamName == 'blue_jackets' || 
                    teamName == 'golden_knights' || teamName == 'maple_leafs'){
                    let underScoreIndex = teamName.indexOf('_')
                    h3.innerHTML = dataLables[anotherCount] 
                    h3Team.innerHTML = `(${teamName.charAt(underScoreIndex + 1).toUpperCase() + teamName.slice(underScoreIndex + 2)})`
                }else{
                    h3.innerHTML = dataLables[anotherCount]
                    h3Team.innerHTML = ` (${teamName.charAt(0).toUpperCase() + teamName.slice(1)})`
            }
            
            anotherCount++
            
            //split, to lower case it
            let words = dataLables[count - 1].split(' ')

            let label = ''
            for(let x = 0; x < words.length; x++){

                label += words[x].toLowerCase() + '_'
                label = label.replace('-', '')
                label = label.replace('>', '')
                
            }

            let request1, request2
            if(label == 'home_over_6_'){
                request1 = `home_over_${teamName}_record`
                request2 = `home_under_${teamName}_record`
            }else if(label == 'away_over_6_'){
                request1 = `away_over_${teamName}_record`
                request2 = `away_under_${teamName}_record`
            }else if(label == 'home_puck_line_'){
                request1 = `home_line_${teamName}_record_win`
                request2 = `home_line_${teamName}_record_loss`
            }else if(label == 'away_puck_line_'){
                request1 = `away_line_${teamName}_record_win`
                request2 = `away_line_${teamName}_record_loss`
            }else{
                request1 = `${label}${teamName}_record_win`
                request2 = `${label}${teamName}_record_loss`
            }

            p.innerHTML = `${data[0][request1]} - ${data[0][request2]}`
        }else{
            p.innerHTML = `${dataArray[2 * i - 3]} - ${dataArray[2 * i - 2]}`
        }
        
        div.appendChild(h3)
        div.appendChild(h3Team)
        div.appendChild(p)
        
        document.getElementById('team-2-data-container').appendChild(div)
        count++

        idCount++

        if(i == 18){
            count = 1
        }
    }
        let team = teamName.replace('_', ' ')

        if(team.includes(' ')){
            let underScoreIndex = team.indexOf(' ')
            team = team.charAt(0).toUpperCase() + team.slice(1, underScoreIndex) + ' ' + 
                    team.charAt(underScoreIndex + 1).toUpperCase() + team.slice(underScoreIndex + 2)
        }else{
            team = team.charAt(0).toUpperCase() + teamName.slice(1)
        }

        if(team != 'Trending' && team != 'Public'){
            fetch(`http://localhost:3000/getteam/${team}`)
            .then(function(response){
                return response.json()
            }).then(function(response){

                for(let j = 16; j < iterations; j++){
                    if(document.getElementById('team-1-data-container').contains(document.getElementById('team-1-container-' + j))){
                    document.getElementById('team-1-container-' + j).remove()
                    }
                }

                let anotherCount = 0
                for(let i = 16; i < iterations; i++){


                    let words = dataLables[anotherCount].split(' ')

                    let label = ''
                    for(let x = 0; x < words.length; x++){

                        label += words[x].toLowerCase() + '_'
                        label = label.replace('-', '')
                        label = label.replace('>', '')
                        
                    }



                    let div = document.createElement('div')
                    div.id = 'team-1-container-' + i

                    if(i % 3 == 2){
                        div.style.borderRight = '1px solid #3C3D4C'
                    }

                    div.classList.add('data')
                    document.getElementById('team-1-data-container').appendChild(div)
                    div.appendChild(document.createElement('h3'))

                    let h3Team = document.createElement('h3')
                    div.appendChild(h3Team)


                    div.appendChild(document.createElement('p'))

                    let teamNameforOpposingHeaders = document.getElementById('teams-2').value 
                    
                    if(teamNameforOpposingHeaders == 'red_wings' || teamNameforOpposingHeaders == 'blue_jackets' || 
                    teamNameforOpposingHeaders == 'golden_knights' || teamNameforOpposingHeaders == 'maple_leafs'){
                        let underScoreIndex = teamNameforOpposingHeaders.indexOf('_')
                        div.firstChild.innerHTML = dataLables[anotherCount]
                        h3Team.innerHTML = `(${teamNameforOpposingHeaders.charAt(underScoreIndex + 1).toUpperCase() + teamNameforOpposingHeaders.slice(underScoreIndex + 2)})`
                    }else{
                        div.firstChild.innerHTML = dataLables[anotherCount]
                        h3Team.innerHTML = ` (${teamNameforOpposingHeaders.charAt(0).toUpperCase() + teamNameforOpposingHeaders.slice(1)})`
                    }
                    
                    //+ ` (${teamNameforOpposingHeaders.charAt(underScoreIndex + 1).toUpperCase() + teamNameforOpposingHeaders.slice(underScoreIndex + 2)})`
                    //+ ` (${teamNameforOpposingHeaders.charAt(0).toUpperCase() + teamNameforOpposingHeaders.slice(1)})`
                    let request1, request2
                if(label == 'home_over_6_'){
                    request1 = `home_over_${teamNameforOpposingHeaders}_record`
                    request2 = `home_under_${teamNameforOpposingHeaders}_record`
                }else if(label == 'away_over_6_'){
                    request1 = `away_over_${teamNameforOpposingHeaders}_record`
                    request2 = `away_under_${teamNameforOpposingHeaders}_record`
                }else if(label == 'home_puck_line_'){
                    request1 = `home_line_${teamNameforOpposingHeaders}_record_win`
                    request2 = `home_line_${teamNameforOpposingHeaders}_record_loss`
                }else if(label == 'away_puck_line_'){
                    request1 = `away_line_${teamNameforOpposingHeaders}_record_win`
                    request2 = `away_line_${teamNameforOpposingHeaders}_record_loss`
                }else{
                    request1 = `${label}${teamNameforOpposingHeaders}_record_win`
                    request2 = `${label}${teamNameforOpposingHeaders}_record_loss`
                }
                
                    div.lastChild.innerHTML = `${response[0][request1]} - ${response[0][request2]}`

                    console.log(label)
                    console.log(response[0][request1])
                    console.log(response[0][request2])


                    anotherCount++
                    
                }
            }).catch(error => {
                throw error
            });
        }
}

function generateInitialDivs(data){

    for(let j = 16; j < iterations; j++){
        if(document.getElementById('team-2-data-container').contains(document.getElementById('team-2-container-' + j))){
            document.getElementById('team-2-container-' +  j).remove()
        }
    }

    let div, h3, p
    let dataArray = []
    
    // Have to have seperate loop to get data from response
    for(const [key, value] of Object.entries(data[0])){
        if(key != 'id'){
            dataArray.push(value)
        }
    }
    
    // alters loops and labels for either team or public selection
    let i, dataLables
    if(typeof dataArray[0] == 'string'){
        i = 3
        dataLables = teamDataLabels
    }else{
        i = 1
        dataLables = publicDataLabels
    }

    // count is for div naming
    let count = 1
    for(i; i < Object.keys(data[0]).length / 2; i++){
        div = document.createElement('div')
        div.classList.add('data')
        div.id = 'team-1-container-' + count

        if(count % 3 == 0){
            div.style.borderRight = '1px solid #3C3D4C'
        }

        h3 =  document.createElement('h3')
        h3.innerHTML = dataLables[i - 1]
        p = document.createElement('p')
        p.innerHTML = `${dataArray[2 * i - 2]} - ${dataArray[2 * i -1]}`
        
        div.appendChild(h3)
        div.appendChild(p)
        
        document.getElementById('team-1-data-container').appendChild(div)
        count++
    }
}

function generateInitial2Divs(data){

    for(let j = 16; j < iterations; j++){
        if(document.getElementById('team-1-data-container').contains(document.getElementById('team-1-container-' + j))){
            document.getElementById('team-1-container-' +  j).remove()
        }
    }

    let div, h3, p
    let dataArray = []
    
    // Have to have seperate loop to get data from response
    for(const [key, value] of Object.entries(data[0])){
        if(key != 'id'){
            dataArray.push(value)
        }
    }
    
    // alters loops and labels for either team or public selection
    let i, dataLables
    if(typeof dataArray[0] == 'string'){
        i = 3
        dataLables = teamDataLabels
    }else{
        i = 1
        dataLables = publicDataLabels
    }

    // count is for div naming
    let count = 1
    for(i; i < Object.keys(data[0]).length / 2; i++){
        div = document.createElement('div')
        div.classList.add('data')
        div.id = 'team-2-container-' + count

        if(count % 3 == 0){
            div.style.borderRight = '1px solid #3C3D4C'
        }

        h3 =  document.createElement('h3')
        h3.innerHTML = dataLables[i - 1]
        p = document.createElement('p')
        p.innerHTML = `${dataArray[2 * i - 2]} - ${dataArray[2 * i - 1]}`
        
        div.appendChild(h3)
        div.appendChild(p)
        document.getElementById('team-2-data-container').appendChild(div)
        count++
    }
}

// gonna have to manipulate data within here (gonna be like functions above)
function getTrending(publicData, teamData){

    for(let j = 16; j < iterations; j++){
        if(document.getElementById('team-2-data-container').contains(document.getElementById('team-2-container-' + j))){
            document.getElementById('team-2-container-' +  j).remove()
        }
    }

    let data = []
    let publicDataArray = []
    let TeamDataArray = []
    for(const [key, value] of Object.entries(publicData[0])){
        if(key != 'id'){
            publicDataArray.push(value)
        }
    }

    for(const [key, value] of Object.entries(publicData)){
        if(key != 'id'){
            data.push(value)
        }
    }

    for(const [key, value] of Object.entries(teamData)){
        if(key != 'id'){
            TeamDataArray.push(value)
        }
    }

    let publicPercentagesArr = []

    let tempObject
    for(let i = 0; i < publicDataArray.length  / 2; i++){
        //dataArray[2 * i - 2] / (dataArray[2 * i - 2] + dataArray[2 * i - 1])
        if((publicDataArray[2 * i] + publicDataArray[2 * i + 1]) != 0){
            tempObject = {"title": Object.keys(data[0])[2 * i + 1], 
                          "percentage" : publicDataArray[2 * i] / (publicDataArray[2 * i] + publicDataArray[2 * i + 1])}

            
            //publicPercentagesArr.push(publicDataArray[2 * i] / (publicDataArray[2 * i] + publicDataArray[2 * i + 1]))
        }else{
            tempObject = {"title": Object.keys(data[0])[2 * i + 1], 
                          "percentage" : 0}       
            //publicPercentagesArr.push(0)
        }

        publicPercentagesArr.push(tempObject)
        //console.log(publicDataArray[2 * i] / (publicDataArray[2 * i] + publicDataArray[2 * i + 1]))
        // zero check
    }

    sortedPercentagesArr = insertionSort(publicPercentagesArr)

    let count = 1
    for(let i = sortedPercentagesArr.length - 1; i > 5; i--){
        div = document.createElement('div')
        div.classList.add('data')
        div.id = 'team-2-container-' + count
        div.style.background = 'rgba(76, 175, 80, 0.5)'

        h3 =  document.createElement('h3')

        let title = sortedPercentagesArr[i].title.split("_")
    
        for (let i = 0; i < title.length; i++) {
            if(title[i] == "ml"){
                title[i] = title[i][0].toUpperCase() + title[i][1].toUpperCase()
            }else if(title[i] == ''){
                
            }else{
                title[i] = title[i][0].toUpperCase() + title[i].substr(1);
            }
        }

        title.join(" ");

        let temp
        if(title[0] == ''){
            if(parseInt(title[1]) < 170){
                temp = title[1] + "%> " + title[2]
            }else{
                temp = '-' + title[1] + '> ' + title[2]
            }
        }else{
            temp = title[0] + " " + title[1]
        }
            
        h3.innerHTML = temp
        p = document.createElement('p')
        p.innerHTML = `${Math.round(sortedPercentagesArr[i].percentage * 100)}%`
        
        div.appendChild(h3)
        div.appendChild(p)
        document.getElementById('team-1-data-container').appendChild(div)
    }

    // create object with key and value in 

    // console.log(publicPercentagesArr)
    // console.log(sortedPercentagesArr)
    // console.log(publicDataArray)
    // console.log(TeamDataArray)
    
    //console.log(data[0])
}

function getTrending2(publicData, teamData){

    for(let j = 16; j < iterations; j++){
        if(document.getElementById('team-1-data-container').contains(document.getElementById('team-1-container-' + j))){
            document.getElementById('team-1-container-' +  j).remove()
        }
    }

    let data = []
    let publicDataArray = []
    let tData = []
    let TeamDataArray = []
    for(const [key, value] of Object.entries(publicData[0])){
        if(key != 'id'){
            publicDataArray.push(value)
        }
    }

    for(const [key, value] of Object.entries(publicData)){
        if(key != 'id'){
            data.push(value)
        }
    }

    // for(const [key, value] of Object.entries(teamData[0])){
    //     if(key != 'id'){
    //         TeamDataArray.push(value)
    //     }
    // }

    for(const [key, value] of Object.entries(teamData)){
        if(key != 'id'){
            tData.push(value)
        }
    }

    // console.log(publicDataArray)
    // console.log(data)
    // console.log(tData[0])

    let publicPercentagesArr = []
    let teamPercentagesArr = []

    let tempObject
    for(let i = 0; i < publicDataArray.length  / 2; i++){
        if((publicDataArray[2 * i] + publicDataArray[2 * i + 1]) != 0){
            tempObject = {"title": Object.keys(data[0])[2 * i + 1], 
                          "percentage" : publicDataArray[2 * i] / (publicDataArray[2 * i] + publicDataArray[2 * i + 1])}
        }else{
            tempObject = {"title": Object.keys(data[0])[2 * i + 1], 
                          "percentage" : 0}       
        }
        publicPercentagesArr.push(tempObject)
    }

    let tempArr = []
    for (const record in tData[0]) {
        //console.log(`${record}: ${tData[0][record]}`);
        if(record.includes('win') || (record.includes('over'))){
            if(record.includes('wings')){
                if(record.includes('loss') || record.includes('under')){

                }else{

                    tempArr.push(tData[0][record])
                }
            }else{
                tempArr.push(tData[0][record])
            }
        }
        
        if(record.includes('loss') || record.includes('under')){
            if(record.includes('wings')){
                let count = (record.match(/win/g) || []).length 
                if(count > 1){
                    
                }else{
                    tempArr.push(tData[0][record])
                }
            }else{
                tempArr.push(tData[0][record])
            }

            // fix the divide by sero thing
            if(tempArr[0] / (tempArr[0] + tempArr[1]) == 0 || (tempArr[0] == 0 && tempArr[1] == 0)){
                tempObject={'title': record,
                            'percentage' : 0}

            }else{
                tempObject={'title': record,
                'percentage' : tempArr[0] / (tempArr[0] + tempArr[1])}
            }

            console.log(record)
            console.log(tempArr)

            teamPercentagesArr.push(tempObject)

            tempArr = []
        }

        
    }

    // for(let i = 4; i < Object.keys(tData[0]).length; i++){
    //     //console.log(Object.keys(tData[0])[i])
    //     console.log(tData[0].id)

    //     // for(let j = 0; j < Object.keys(tData[i]).length / 2; j++){
    //     //         if((tData[2 * i] + tData[2 * i + 1]) != 0){
    //     //         tempObject = {"title": Object.keys(tData[0])[2 * i + 1], 
    //     //                       "percentage" : tData[2 * i] / (tData[2 * i] + tData[2 * i + 1])}
    //     //     }else{
    //     //         tempObject = {"title": Object.keys(tData[0])[2 * i + 1], 
    //     //                       "percentage" : 0}       
    //     //     }
    //     //     teamPercentagesArr.push(tempObject)
    //     // }
    // }

    console.log(teamPercentagesArr)
    sortedPercentagesArr = insertionSort(publicPercentagesArr)

    let count = 1
    for(let i = sortedPercentagesArr.length - 1; i > 5; i--){
        div = document.createElement('div')
        div.classList.add('data')
        div.id = 'team-2-container-' + count
        div.style.background = 'linear-gradient(180deg, rgba(61,255,0,0.18) 0%, rgba(61,255,0,0.18) 100%)'

        h3 =  document.createElement('h3')

        let title = sortedPercentagesArr[i].title.split("_")


        for (let i = 0; i < title.length; i++) {
            if(title[i] == "ml"){
                title[i] = title[i][0].toUpperCase() + title[i][1].toUpperCase()
            }else if(title[i] == ''){
               
            }else{
                title[i] = title[i][0].toUpperCase() + title[i].substr(1);
            }
        }

        title.join(" ");

        let temp
        if(title[0] == ''){
            if(parseInt(title[1]) < 170){
                temp = title[1] + "%> " + title[2]
            }else{
                temp = '-' + title[1] + '> ' + title[2]
            }
            
        }else{
            temp = title[0] + " " + title[1]
        }



        // if(temp[0] <= 3 && isNum){
        //     temp = 
        // }

        h3.innerHTML = temp
        p = document.createElement('p')
        p.innerHTML = `${Math.round(sortedPercentagesArr[i].percentage * 100)}%`
        
        div.appendChild(h3)
        div.appendChild(p)
        document.getElementById('team-2-data-container').appendChild(div)
    }




    // create object with key and value in 

    // console.log(publicPercentagesArr)
    // console.log(sortedPercentagesArr)
    // console.log(publicDataArray)
    // console.log(TeamDataArray)
    
    //console.log(data[0])
}

// i think inside inserstion sort we should save some shit

function insertionSort(arr){
    //Start from the second element.
    for(let i = 1; i < arr.length;i++){

        //Go through the elements behind it.
        for(let j = i - 1; j > -1; j--){
            
            //value comparison using ascending order.
            if(arr[j + 1].percentage < arr[j].percentage){

                //swap
                [arr[j+1],arr[j]] = [arr[j],arr[j + 1]];

            }
        }
    };

  return arr;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},1)`
  }
