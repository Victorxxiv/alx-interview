#!/usr/bin/node

const util = require('util');
const request = util.promisify(require('request'));
const filmID = process.argv[2];

async function starwarsCharacters(filmId) {
  try {
    const endpoint = `https://swapi-api.alx-tools.com/api/films/${filmId}/`;
    let response = await request(endpoint);
    response = JSON.parse(response.body);
    const characters = response.characters;

    for (const urlCharacter of characters) {
      let characterResponse = await request(urlCharacter);
      const character = JSON.parse(characterResponse.body);
      console.log(character.name);
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

starwarsCharacters(filmID);