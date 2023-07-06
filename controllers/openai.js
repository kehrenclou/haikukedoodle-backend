const { openai } = require('../utils/openaiConfig');
const Card = require('../models/card');

const generateHaiku = async (req, res, next) => {
  const { subject, user, terms } = req.body;

  function generatePrompt(sub) {
    const capitalizedSubject = sub[0].toUpperCase() + sub.slice(1).toLowerCase();

    return ` write a "haiku" about "${capitalizedSubject}".with the first line has 5 syllables, the second line has 7 syllables, the third line has 5 syllables. next, write three lines of guitar chords to accompany the haiku.

  `;
  }

  const prompt = generatePrompt(subject);

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
      temperature: 0,
    });

    const haiku = response.data;

    const data = await Card.create({
      aiId: haiku.id,
      created: haiku.created,
      choices: haiku.choices,
      usage: haiku.usage,
      subject,
      owner: user._id,
      author: user.name,
      terms,
    });

    
    return res.status(201).send(data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    return next(error);
  }
};

module.exports = { generateHaiku };
