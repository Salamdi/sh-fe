const fetch = require('node-fetch');

const RandomJokesController = () => {
  const randomJokes = async (req, res) => {
    try {
      const remoteResponse = await fetch('http://api.icndb.com/jokes/random/10');
      const data = await remoteResponse.json();
      let { value } = data;
      const { type } = data;
      value = value.map(({ id, joke }) => ({ id, joke }));
      return res.json({ type, value });
    } catch (err) {
      return res.status(err.status).json({ msg: err.message });
    }
  };

  return { randomJokes };
};

module.exports = RandomJokesController;
