const {
  Given,
  When,
  Then,And
} = require('cucumber');
const axios = require('axios');
var expect = require('expect');
const jest  = require('jest');
let post_response,get_response,delete_response;

let station_id =[];
//// Your Step Definitions /////
When(/^send POST request to "([^"]*)", the data is$/, async function (url, docString) {
 
  var headers= {
    'Content-Type': 'application/json'
  }
  post_response= await axios.post(url,JSON.parse(docString),{headers:headers}).then(function(response){
  
    return response;
  }).catch(function(response)
  {  
        return response.response;
  });
});



When(/^retrieve GET request to "([^"]*)"/, async function (url) {
 
  var headers= {
    'Content-Type': 'application/json'
  }
  get_response= await axios.get(url,{headers:headers}).then(function(response){
   //console.log(response.data)
    return response;
  }).catch(function(response)
  {  
   
    return response.response;
  });
});




Then('capture the station id', async function () {

  
  for(i=0;i<get_response.data.length;i++)
  {
    station_id.push(get_response.data[i].id)
 
  }
  
  

});

When('Delete the stations created and the delete status should be {int}', async function (status) {
  for(i=0;i<station_id.length;i++)
  {
    var url =`http://api.openweathermap.org/data/3.0/stations/${station_id[i]}?appid=8659182afb89bad558b38fde3c4c5797`

   
    var headers= {
      'Content-Type': 'application/json'
    }
    delete_response= await axios.delete(url,{headers:headers}).then(function(response){
     //console.log(response.data)
      return response;
    }).catch(function(response)
    {  
     
      return response.response;
    });
    expect (await delete_response.status).toEqual(status)
  }
  
});


Then('the post status should be {int}', async function (status) {

  expect (await post_response.status).toEqual(status)
  });
  Then('the get status should be {int}', async function (status) {

    expect (await get_response.status).toEqual(status)
    });
    

    When('retrive the stations deleted and the get status should be {int} and the body should have {string}', async function (status,message) {
      for(i=0;i<station_id.length;i++)
      {
        var url =`http://api.openweathermap.org/data/3.0/stations/${station_id[i]}?appid=8659182afb89bad558b38fde3c4c5797`
    
       
        var headers= {
          'Content-Type': 'application/json'
        }
        get_response= await axios.get(url,{headers:headers}).then(function(response){
         //console.log(response.data)
          return response;
        }).catch(function(response)
        {  
         
          return response.response;
        });
        expect (await get_response.status).toEqual(status)
        expect(await get_response.data.message).toEqual(message);
      }
      
    });