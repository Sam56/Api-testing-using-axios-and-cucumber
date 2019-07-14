Feature: API Testing Exercise
nabone authentication



Scenario:  Fail with 401 error invalid api key
  When send POST request to "http://api.openweathermap.org/data/3.0/stations?appid=8659182afb89bad57", the data is
    """
    {
    "external_id": "SF_TEST001",
    "name": "San Francisco Test Station",
    "latitude": 37.76,
    "longitude": -122.43,
    "altitude": 150
}
    """
    Then the post status should be 401

Scenario Outline:  Create station <StationId>
  When send POST request to "http://api.openweathermap.org/data/3.0/stations?appid=8659182afb89bad558b38fde3c4c5797", the data is
    """
    {
    "external_id": <Id>,
    "name": <StationId>,
    "latitude": <latitude>,
    "longitude": <longitude>,
    "altitude": <altitude>
}
    """
    Then the post status should be 201

 Examples: 
    | StationId | Id | latitude | longitude|altitude|
    | "DEMO_TEST001" | "Team Demo Test Station 001" | 33.33|-122.43|222|
    | "DEMO_TEST002" |  "Team Demo Test Station 002" | 44.44 |-122.44|111|
  

  Scenario:  Get stations
  When retrieve GET request to "http://api.openweathermap.org/data/3.0/stations?appid=8659182afb89bad558b38fde3c4c5797"
    Then the get status should be 200
    Then capture the station id


     Scenario:  Delete stations
  When Delete the stations created and the delete status should be 204


       Scenario:  Verify the stations are deleted
  When retrive the stations deleted and the get status should be 404 and the body should have 'Station not found'
   