import espn_scraper as espn
import json
import datetime

''' Pretty print json helper '''
def ppjson(data):
    print(json.dumps(data, indent=2, sort_keys=True))

url = espn.get_game_url("boxscore", "nhl", 401406953)
soup = espn.get_url(url)
away_team = soup.select('.ScoreCell__TeamName--displayName')[0].text
home_team = soup.select('.ScoreCell__TeamName--displayName')[1].text
away_score = soup.select('.h2')[0].text
home_score = soup.select('.h2')[1].text
print(away_team, away_score, home_team, home_score)

x = datetime.datetime(2022, 2, 20)

url = espn.get_date_scoreboard_url("nhl", 2022)
json_data = espn.get_url(url)
ppjson(json_data)