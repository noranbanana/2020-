import requests
import time
import random

for i in range(10):
	value = random.randint(1,10)
	result = requests.get('https://api.thingspeak.com/update?api_key=8VWM96XDF08Y0XLT&field1='+str(value))
	time.sleep(20)
	if result == 0:
		i -= 1
		continue
