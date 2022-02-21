from textwrap import indent
import espn_scraper as espn
import json
import datetime

''' Pretty print json helper '''
def ppjson(data):
    print(json.dumps(data, indent=2, sort_keys=True))


x = datetime.datetime(2022, 2, 20)

url = espn.get_date_scoreboard_url("nhl", 2022)
json_data = espn.get_url(url)
ppjson(json_data)



with open('espnData.json', 'w') as outfile:
    json.dump(json_data, outfile, indent=2)
