const express = require('express');
const app = express();
const DB = require('./database.js');
const cookies = require('cookie-parser');
const bcrypt = require('bcrypt');
const { Socker } = require('./sockets.js');

const authCookieName = 'token';

//Can take arguments for a port. 
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//making sure to use cookie middleware
app.use(express.json());
app.use(cookies());

//gives static content, which is what is in the public folder
app.use(express.static('public'));

/*
    These next functions take the paramaters of the request type,
    and a parameter function to do with the request. That arrow
    function parameter takes the request received and the response
    that will be sent, and does stuff to those.
*/

//Switches to this router when /api endpoints are used
var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/spells', async (_req, res) => {
    console.log('reached backend api call');
    const spells = await DB.getAllSpells();
    res.send(spells);
});


//Authentication functions
// GetAuth token for the provided credentials
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.name)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.name, req.body.password);
  
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
  });

apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.name);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });
  
  // DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});
  
  // GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
    const user = await DB.getUser(req.params.email);
    if (user) {
      const token = req?.cookies.token;
      res.send({ email: user.email, authenticated: token === user.token });
      return;
    }
    res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }


//if it is asked to be used, send index.html. Is default
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public'});
});

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });

// it can hear you
const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

new Socker(httpService);