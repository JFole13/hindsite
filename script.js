// makes public betting stats the initial landing page 
fetch('http://localhost:3000/getpublic')
        .then(function(response){
            return response.json()
        }).then(function(response){
            generateInitialDivs(response)
            generateInitial2Divs(response)
        }).catch(error => {
            throw error
        });

const publicDataLabels = ['ML', '70%> ML', '90%> ML', 'Close > Open', 'Favorites', 'Favorite Bets', 'Close Odds', 'Dogs', 
                    'Dog Bets', '-170> ML', '-200> ML', '-300> ML']

const teamDataLabels = ['Home ML', 'Away ML', 'Away -170> ML', 'Home -170> ML', 'Away -200> ML', 'Home -200> ML', 'Away Over 6', 
                        'Away Under 6', 'Home Over 6', 'Home Under 6', 'Away Puck Line', 'Home Puck Line', 'Away Rivals ML',
                        'Home Rivals ML']

const PublicColor = '44,40,44,0'

const teams = document.querySelectorAll('select')

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

    if(teamRequest != 'Betting'){
        fetch(`http://localhost:3000/getteam/${teamRequest}`)
        .then(function(response){
            return response.json()
        }).then(function(response){
            if(containerID == 'teams-1'){
                document.getElementById('team-1-data-container').innerHTML = ''
                teamContainer.style.background = `linear-gradient(270deg, rgba(57,57,57,1) 0%, ${hexToRgb(response[0].color)} 100%, rgba(0,212,255,1) 100%)`
                
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
                document.getElementById('team-1-img').style.opacity = '0'
            }else{
                document.getElementById('team-2-img').style.opacity = '0'
            }
        }).catch(error => {
            throw error
        });
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},1)`
  }
  
function generateDivs(data){
    console.log(data)
    let div, h3, p
    let dataArray = []
    
    // Have to have seperate loop to get data from response
    for(const [key, value] of Object.entries(data[0])){
        if(key != 'id'){
            dataArray.push(value)
        }
    }

    console.log(dataArray)
    
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

  
function generate2Divs(data){
    console.log(data)
    let div, h3, p
    let dataArray = []
    
    // Have to have seperate loop to get data from response
    for(const [key, value] of Object.entries(data[0])){
        if(key != 'id'){
            dataArray.push(value)
        }
    }

    console.log(dataArray)
    
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
        p.innerHTML = `${dataArray[2 * i - 2]} - ${dataArray[2 * i -1]}`
        
        div.appendChild(h3)
        div.appendChild(p)
        
        document.getElementById('team-2-data-container').appendChild(div)
        count++
    }
}

function generateInitialDivs(data){
    console.log(data)
    let div, h3, p
    let dataArray = []
    
    // Have to have seperate loop to get data from response
    for(const [key, value] of Object.entries(data[0])){
        if(key != 'id'){
            dataArray.push(value)
        }
    }

    console.log(dataArray)
    
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
    console.log(data)
    let div, h3, p
    let dataArray = []
    
    // Have to have seperate loop to get data from response
    for(const [key, value] of Object.entries(data[0])){
        if(key != 'id'){
            dataArray.push(value)
        }
    }

    console.log(dataArray)
    
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
        p.innerHTML = `${dataArray[2 * i - 2]} - ${dataArray[2 * i -1]}`
        
        div.appendChild(h3)
        div.appendChild(p)
        document.getElementById('team-2-data-container').appendChild(div)
        count++
    }
}