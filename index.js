var request = require('request');
var ENDPOINT = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/';
var KEY = 'f495997a78dd437ca4eb40ea4932aee8';

var data =  {
     "documents": [
         {
             "language": "en",
             "id": "1",
             "text": "Slickly stylish & synthetically streamlined. A superb sci-fi thriller that stimulates the eyes & mind."
         },
         {
             "language": "en",
             "id": "2",
             "text": "GHOST IN THE SHELL: pretty cool. Wish the action had been better, but pretty cool."
         },
         {
             "language": "en",
             "id": "3",
             "text": "Ghost in the Shell was spectacularly bad. Then.....spider tank!!! I nearly wet myself. Hate dissing movies but this was seriously poor."
         }
     ]
 };

 var TYPES = [
     'sentiment',
     'keyPhrases'
 ];




TYPES.forEach(type => {
    request({
        headers: {
            'Ocp-Apim-Subscription-Key': KEY,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: `${ENDPOINT}${type}`,
        method: 'POST',
        json: true,
        body: data
    }, (error, response, body) => {
        body.documents.forEach(item => {
            if(item.score) console.log(item.score);
            if(item.keyPhrases) item.keyPhrases.forEach(phrase => {
                console.log(phrase);
            });
        });
    });
});