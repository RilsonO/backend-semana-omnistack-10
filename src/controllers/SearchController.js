const Dev = require('../models/Dev');
const parseArrayAsString = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response){
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseArrayAsString(techs);

    const devs = await Dev.find({
      techs:{
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type:'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json({ devs });
  }
}