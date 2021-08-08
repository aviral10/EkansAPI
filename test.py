import requests

response = requests.post('http://127.0.0.1:3000/advance', data = {'snake':'1', 'food':'0'})
print(response.json())