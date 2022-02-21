from bs4 import BeautifulSoup
import requests
import json

url = 'https://www.actionnetwork.com/nhl/public-betting'
#url = 'https://ethans_fake_twitter_site.surge.sh/'
response = requests.get(url, timeout=5)
content = BeautifulSoup(response.content, "html.parser")

scoresArray = []

oddsArray = []
for outcome in content.find_all('tr'):
    oddsArray = outcome.find_all('div', attrs={"class": "public-betting__open-cell"})

# print(oddsArray)
# print(oddsArray[0])

openingOddsArray = []
closingOddsArray = []
betPercentageArray = []
gameArray = []
for game in content.find_all('tr'):

    openingOddsArray = game.find_all('div', attrs={"class": "public-betting__open-cell"})
    closingOddsArray = game.find_all('span', attrs={"class": "custom-1qynun2 ena22472"})
    betPercentageArray = game.find_all('span', attrs={"class": "highlight-text__children"})

    away_opening_odds = None
    home_opening_odds = None
    away_closing_odds = None
    home_closing_odds = None
    away_bets_percentage = None
    home_bets_percentage = None

   
    if(len(openingOddsArray) > 0):
        away_opening_odds = openingOddsArray[0]
        home_opening_odds = openingOddsArray[1]

    if(len(closingOddsArray) > 0):
        away_closing_odds = closingOddsArray[0]
        home_closing_odds = closingOddsArray[1]
    
    if(len(betPercentageArray) > 0):
        away_bets_percentage = betPercentageArray[0]
        home_bets_percentage = betPercentageArray[1]

    gameObject = {
        "outcome": str(game.find('div', attrs={"class": "public-betting__game-status"})),
        "away_team": str(game.find('div', attrs={"class": "game-info__team--desktop"})),
        "home_team": str(game.find('span', attrs={"class": "game-info__team--desktop"})),
        "away_opening_odds": str(away_opening_odds),
        "home_opening_odds": str(home_opening_odds),
        "away_closing_odds": str(away_closing_odds),
        "home_closing_odds": str(home_closing_odds),
        "away_bets_percentage": str(away_bets_percentage),
        "home_bets_percentage": str(home_bets_percentage)
    }
    gameArray.append(gameObject)
    
    


with open('gameData.json', 'w') as outfile:
    json.dump(gameArray, outfile)
