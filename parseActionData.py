import json

with open('gameData.json') as json_data:
    jsonData = json.load(json_data)


def parseAlphaData(data):
    print(data)

def parseNumericalData(data):
    print(data)

for i in jsonData:
    parseAlphaData(i['outcome'])
    parseAlphaData(i['away_team'])
    parseAlphaData(i['home_team'])
    parseNumericalData(i['away_opening_odds'])
    parseNumericalData(i['home_opening_odds'])
    parseNumericalData(i['away_closing_odds'])
    parseNumericalData(i['home_closing_odds'])
    parseNumericalData(i['away_bets_percentage'])
    parseNumericalData(i['home_bets_percentage'])
        


