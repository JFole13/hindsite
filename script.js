const teams = document.querySelectorAll('select')

for(let i = 0; i < teams.length; i++){
    teams[i].addEventListener('change', getTeamInfo)
}

let team_name
let teamRequest
let teamContainer
function getTeamInfo(){
    team_name = this.options[this.selectedIndex].text.split(" ");
    let team_name_for_img = this.options[this.selectedIndex].text

    if(team_name.length > 2){
        teamRequest = team_name[1] + ' ' + team_name[2]
    }else{
        teamRequest = team_name[1]
    }

    let containerID = this.id
    containerID == 'teams-1' ? teamContainer = document.getElementById('team-1-container') : teamContainer = document.getElementById('team-2-container')
    console.log(teamRequest)

    fetch(`http://localhost:3000/getteam/${teamRequest}`)
    .then(function(response){
        return response.json()
    }).then(function(response){
        if(containerID == 'teams-1'){
            teamContainer.style.background = `linear-gradient(270deg, rgba(57,57,57,1) 0%, ${hexToRgb(response[0].color)} 100%, rgba(0,212,255,1) 100%)`
            if(team_name_for_img != 'Public Betting'){
                document.getElementById('team-1-img').style.display = 'block'
                document.getElementById('team-1-img').src = `images/${team_name_for_img}.svg`
            }else{
                document.getElementById('team-1-img').style.display = 'none'
            }
        }else{
            teamContainer.style.background = `linear-gradient(90deg, rgba(57,57,57,1) 0%, ${hexToRgb(response[0].color)} 100%, rgba(0,212,255,1) 100%)`
            if(team_name_for_img != 'Public Betting'){
                document.getElementById('team-2-img').style.display = 'block'
                document.getElementById('team-2-img').src = `images/${team_name_for_img}.svg`
            }else{
                document.getElementById('team-2-img').style.display = 'none'
            }
        }
    }).catch(error => {
        throw error
    });


    //document.getElementById(this.id).style.background = 'linear-gradient(90deg, rgba(57,57,57,1) 0%, rgba(134,0,56,1) 100%, rgba(0,212,255,1) 100%)'
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},1)`
  }
  