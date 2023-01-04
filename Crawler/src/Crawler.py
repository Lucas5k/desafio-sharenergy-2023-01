import requests
import time
from parsel import Selector
import json


def fetch(url: str):
	try:
		response = requests.get(url, timeout=3)
		time.sleep(1)
		if response.status_code == 200:
			return response.text
	except requests.ReadTimeout:
		return None


def scrape_status_code(html_content):
	selector = Selector(text=html_content)

	status = selector.css(
		"li.ThumbnailGrid_thumbnail__177T1 div.Thumbnail_title__2iqYK::text"
	).getall()
	
	return status


def state_of_saving():
	page = fetch('http://localhost:8010/proxy/')

	status = scrape_status_code(page)

	all_status_code = [{ 'status_code': status_code } for status_code in status]

	with open('status_code.json', 'w') as file:
		json_to_write = json.dumps(
			all_status_code
		)

		file.write(json_to_write)


# state_of_saving()