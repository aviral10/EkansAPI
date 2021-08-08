# EkansAPI

## Setup
- Run `npm install` inside both of the folders seperately to install different dependencies.
- Once done, run server_side first by running `npm start` inside server_side folder this runs the server that serves the game data
- Run client side by running `npm start` inside client_side folder. It will open up the browser displaying the state of the board.
- Spin up python, a sample code is inside `test.py` to make API requests.

## API endpoints
- I don't know if making POST requests through URL works or not, but the method used below does.
- gridState: GET Request, use as `requests.get('http://127.0.0.1:3000/gridState')`
- advance: POST Request, use as `requests.post('http://127.0.0.1:3000/advance', data = {'snake':'1', 'food':'0'}`
- `{'snake':'1', 'food':'0'}` 0: top, 1: right, 2: down, 3: left.
- Just 2 endpoints for now. Will add more in future.
- for more queries........just ask me ;_;