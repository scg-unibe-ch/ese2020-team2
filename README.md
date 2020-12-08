## Team 2: ESE2020 Project

## Prerequisite
You should have installed [NodeJS and npm](https://nodejs.org/en/download/) (they come as one) in order to run the application.  
Make sure the backend is running according to its [README](https://github.com/scg-unibe-ch/ese2020-project-scaffolding/blob/master/backend/README.md).

## Start
- navigate to the frontend folder `cd ese2020-project-scaffolding/frontend` within the same repo where you set up the backend
- run `npm install`
- run `npm run dev`
- open your browser with the url [http://localhost:4200](http://localhost:4200/)

**If you encounter CORS errors within your browser, add the [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) extension (version for Google Chrome) to your browser.**

## Login

To explore our website, we provide you with the following user and admin roles:
````
User: user
Password: notSecure12
Password reset answer: answer

Admin: admin
Password: notSecure12
Password reset answer: answer
````
We did not preload the database with other data like products, reviews, purchases et cetera. This way you can experience all the functionality and see for yourself if it is working.

We wish you a lot uf fun exploring our project.


##Troubleshooting

If something is not working please try to change the package.json:
````
from:   "main": "build/server.js"
to:     "main": "build/backend/src/server.js"
````
If this is not helping please contact us: [E-Mail](mailto:yves.zimmermann1@students.unibe.ch)

Best regards

**Team 2**

Harika Putta  
Marco Lord  
Blendi Shala  
Rocco Manz  
Yves Zimmermann


