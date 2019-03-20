const fetch = require('node-fetch');

const RandomJokesController = () => {
  
  const randomJokes = async (req, res) => {
    try {
      const remoteResponse = await fetch('http://api.icndb.com/jokes/random/10');
      const data = await remoteResponse.json();
      let {type, value} = data;
      value = value.map(({id, joke}) => ({id, joke}));
      return res.json({type, value});
    } catch (err) {
      return res.status(remoteResponse.status).json({msg: err.message});
    }
  };

  return {randomJokes};
};

module.exports = RandomJokesController;
