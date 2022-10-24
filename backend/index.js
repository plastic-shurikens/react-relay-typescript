const express = require('express');
const request = require('request'); // "Request" library
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { URLSearchParams } = require('url');
const { graphqlHTTP } = require('express-graphql');
const {graphql, buildSchema, printSchema} = require('graphql');
const fs = require('fs');
const axios = require('axios');
const bodyParser = require('body-parser');

const schema = require('./schema')

require('dotenv').config(); 

const redis = require('redis')

const client = redis.createClient({
  url: 'redis://localhost:6379'
})

const client_id = process.env.client_id; // Your client id
const client_secret = process.env.client_secret; // Your secret
const redirect_uri = process.env.redirect_uri;

const app = express();
const port = 3000;	

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

// const newSchema = printSchema(schema);

// const oldSchema = fs.readFileSync('../frontend/schema.graphql', {encoding:'utf8'});

// if(oldSchema !== newSchema) {
// 	fs.writeFile('../frontend/schema.graphql', printSchema(schema), err => {
// 		if (err) {
// 			console.error(err, 'writeFileErr');
// 		}
// 		// file written successfully
// 	});
// }

app.use(express.static(__dirname + '/public')).use(cors()).use(cookieParser());

function generateRandomString(length) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

const stateKey = 'spotify_auth_state';

app.get('/login', function login(req, res){
  let state = generateRandomString(16);
	app.set('state', state)
  res.cookie(stateKey, state);
  // your application requests authorization
  const scope = 'streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' + 
  // "response_type=code&client_id=2b1f788f6497474080471368506fcb38&scope=user-read-private+user-read-email&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=pyr6xluXxkaOr0R5"
    new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }).toString()
  );
})

app.use('/graphql',
	graphqlHTTP(async () => {
		if(!client.isOpen){
			await client.connect();
		}
		const token = await client.get('firstToken');
		return {
			schema,
			context: {token},
			graphiql: true,
		}
	},
	)
);

app.use('/', async (req, res) => {
	res.send('Server is Running');
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
})
