#!/usr/bin/node

const util = require('util');
const request = util.promisify(require('request'));
const filmID = process.argv[2];

async function starwarsCharacters(filmId) {
  try {
    const endpoint = 'https://swapi-api.hbtn.io/api/films/' + filmId;
    let response = await request(endpoint);
    response = JSON.parse(response.body);
    const characters = response.characters;

    for (const urlCharacter of characters) {
      try {
        let characterResponse = await request(urlCharacter);
        let character = JSON.parse(characterResponse.body);
        console.log(character.name);
      } catch (charErr) {
        console.error(`Error fetching character: ${charErr.message}`);
      }
    }
  } catch (err) {
    console.error(`Error fetching film: ${err.message}`);
  }
}

starwarsCharacters(filmID);