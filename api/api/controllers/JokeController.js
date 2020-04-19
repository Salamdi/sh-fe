const { Joke } = require('../models/Joke');
const { User } = require('../models/User');
const fetch = require('node-fetch');

const JokeController = () => {
  const addRandom = async (req, res) => {
    try {
      const { token: { id: userId } } = req;
      const user = await User.findByPk(userId);
      const favs = await user.getJokes().map(({ id }) => id);
      const { id, joke } = await getRandom(favs);
      const fav = await Joke.findOrCreate({
        where: { id },
        defaults: { joke },
      });
      if (favs.length > 9) {
        res.status(403).json({error: 'You have reached maximum amount of favorite jokes'});
        return;
      }
      await user.addJoke(id);
      res.json({ success: true, value: { joke, id } });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err.message })
    }
  }

  return {
    addRandom,
  }
};

async function getRandom(favs) {
  const jokeApiRes = await fetch('http://api.icndb.com/jokes/random/1');
  const { value } = await jokeApiRes.json();
  const [ randomJoke ] = value;
  const { id, joke } = randomJoke;
  if (favs.includes(id)) {
    return getRandom(favs);
  }
  return { id, joke };
}

module.exports = JokeController;
