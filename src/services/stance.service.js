const { stance: StanceModel, userStanceAssociation: UserStanceAssociationModel, users: UserModel } = require('../sequelize/models');
const { Op } = require('sequelize');
const fs = require('fs');
const speech = require('@google-cloud/speech');
const ffmpeg = require('fluent-ffmpeg');
const { v4: uuidv4 } = require('uuid');
const { exec } = require('child_process');
const { OpenAIApi, Configuration } = require('openai');
const path = require('path');

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, '../', 'googleKey.json');
const speechClient = new speech.SpeechClient();

// Set up OpenAI API
const openaiApiKey = process.env.OPEN_AI_KEY; // Add your OpenAI API key here

const configuration = new Configuration({
  apiKey: openaiApiKey
});

const openaiClient = new OpenAIApi(configuration);
// const ffmpeg = require('fluent-ffmpeg');


const getAllStances = async () => {
  return await StanceModel.findAll({});
};

const getStances = async (whereClause) => {
  return StanceModel.findAll({
    where: { ...whereClause },
    include: {
      model: UserModel,
      as: "user"
    }
  });
};
const getStanceById = async (stanceId) => {
  // Logic to update user profile (name, bio, profile picture)

  return await StanceModel.findOne({ where: { id: stanceId } });
};

const getUserStance = async (userId) => {
  return await StanceModel.findAll({ where: { userId } });
};

const updateStance = async (id, data) => {
  const stance = await StanceModel.findOne({ where: { id } });
  if (!stance) {
    throw new Error('Stance not found');
  }

  return stance.update(data);
};

const deleteStance = async (id) => {
  const stance = await StanceModel.findOne({ where: { id } });
  if (!stance) {
    throw new Error('Stance not found');
  }

  return stance.destroy();
};
const createStance = async (stanceBody) => {
  return await StanceModel.create(stanceBody);
};

const addLikeToStance = async (stanceId, userId) => {
  const alreadyLiked = await UserStanceAssociationModel.findOne({
    where: {
      userId,
      stanceId,
      associationType: 'like'
    }
  })
  if (alreadyLiked) {
    return false
  }
  const stance = await StanceModel.increment(
    {
      likes: +1,
    },
    {
      where: {
        id: stanceId,
      },
    },
  );
  await UserStanceAssociationModel.create({
    userId,
    stanceId,
    associationType: 'like'
  })
  return stance;
};
const addShareToPost = async (stanceId) => {
  const stance = await StanceModel.increment(
    {
      shares: +1,
    },
    {
      where: {
        id: stanceId,
      },
    },
  );
  return stance;
};
const addRepostToPost = async (stanceId) => {
  const stance = await StanceModel.increment(
    {
      reposts: +1,
    },
    {
      where: {
        id: stanceId,
      },
    },
  );
  return stance;
};

const addDislikeToPost = async (stanceId, userId) => {
  const alreadyLiked = await UserStanceAssociationModel.findOne({
    where: {
      userId,
      stanceId,
      associationType: 'dislike'
    }
  })
  if (alreadyLiked) {
    return false
  }
  const stance = await StanceModel.increment(
    {
      dislikes: +1,
    },
    {
      where: {
        id: stanceId,
      },
    },
  );
  await UserStanceAssociationModel.create({

    userId,
    stanceId,
    associationType: 'dislike'

  })
  return stance;
};
const getTopicForVideo = async (videoPath) => {
  const transcript = await convertVideoToTranscription(videoPath);
  const topic = await analyzeVideoTopic(transcript);

  // Delete the temporary uploaded file
  fs.unlinkSync(videoPath);

  return topic

};

async function convertVideoToTranscription(videoPath) {
  const audioPath = `./${uuidv4()}.flac`;

  return new Promise((resolve, reject) => {
    const ffmpegCommand = `ffmpeg -i "${videoPath}" -vn -acodec flac "${audioPath}"`;
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('FFmpeg error:', error);
        reject(error);
        return;
      }

      const audio = fs.readFileSync(audioPath);
      const audioBytes = audio.toString('base64');

      const config = {
        encoding: 'FLAC',
        sampleRateHertz: 48000,
        languageCode: 'en-US',
        audioChannelCount: 2
      };

      const request = {
        audio: {
          content: audioBytes,
        },
        config: config,
      };

      speechClient
        .recognize(request)
        .then(([response]) => {
          const transcriptions = response.results.map((result) => result.alternatives[0].transcript).join(' ');
          fs.unlinkSync(audioPath);
          resolve(transcriptions);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

async function analyzeVideoTopic(transcript) {
  const prompt = `This is a video about \"${transcript}"\. Please provide a one or two word topic for the video.`;
  try {
    const {data} = await openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const topic = data.choices[0].text.trim();
    return topic;
  }
  catch (err) {
    console.log("err", err)
  }

}


module.exports = {
  getTopicForVideo,
  getAllStances,
  getStanceById,
  getUserStance,
  createStance,
  updateStance,
  deleteStance,
  getStances,
  addLikeToStance,
  addShareToPost,
  addRepostToPost,
  addDislikeToPost,
};
