const { openai } = require("../utils/openaiConfig");

const generateHaiku = async (req, res) => {
  const { subject } = req.body;

  function generatePrompt(subject) {
    const capitalizedSubject =
      subject[0].toUpperCase() + subject.slice(1).toLowerCase();

    return ` write a "haiku" about "${capitalizedSubject}".with the first line has 5 syllables, the second line has 7 syllables, the third line has 5 syllables. next, write three lines of guitar chords to accompany the haiku.

  `;
  }

  const prompt = generatePrompt(subject);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0,
    });

    res.status(200).json({
      // response: response.data.choices[0].text,
      response: response.data,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

// get current models

const getModels = async (req, res) => {
  try {
    const response = await openai.listModels();

    res.status(200).json({
      // response: response.data.choices[0].text,
      response: response.data,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

module.exports = { generateHaiku, getModels };

/* ------------------------------- test Haiku ------------------------------- */
// const createHaiku = async (req, res) => {
//   const prompt = req.body.prompt;
//   // const prompt = generatePrompt("pony");

//   try {
//     if (prompt == null) {
//       throw new Error("no prompt provided");
//     }
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt,
//     });
//     const completion = response.data.choices[0].text;
//     return res.status(200).json({
//       success: true,
//       message: completion,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// function generatePrompt(subject) {
//   const capitalizedSubject =
//     subject[0].toUpperCase() + subject.slice(1).toLowerCase();

//   return ` write a "haiku" about "${capitalizedSubject}".with the first line has 5 syllables, the second line has 7 syllables, the third line has 5 syllables. next, write three lines of guitar chords to accompany the haiku.

//   `;
// }
// module.exports = { createHaiku };
