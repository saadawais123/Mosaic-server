const {
  stance: StanceModel,
  userStanceAssociation: UserStanceAssociationModel,
  users: UserModel,
  topic: TopicModel,
} = require("../sequelize/models");
const { Op } = require("sequelize");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { exec } = require("child_process");
const { OpenAIApi, Configuration } = require("openai");
const { findAllTopics } = require("./topic.service");

// Set up OpenAI API
const openaiApiKey = process.env.OPEN_AI_KEY; // Add your OpenAI API key here

const configuration = new Configuration({
  apiKey: openaiApiKey,
});

const openaiClient = new OpenAIApi(configuration);

const getAllStances = async () => {
  return await StanceModel.findAll({});
};

const getStances = async (whereClause) => {
  return StanceModel.findAll({
    where: { ...whereClause },
    include: [
      {
        model: UserModel,
        as: "user",
      },
      {
        model: TopicModel,
        as: "topic",
      },
    ],
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
    throw new Error("Stance not found");
  }

  return stance.update(data);
};

const deleteStance = async (id) => {
  const stance = await StanceModel.findOne({ where: { id } });
  if (!stance) {
    throw new Error("Stance not found");
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
      associationType: "like",
    },
  });
  if (alreadyLiked) {
    return false;
  }
  const stance = await StanceModel.increment(
    {
      likes: +1,
    },
    {
      where: {
        id: stanceId,
      },
    }
  );
  await UserStanceAssociationModel.create({
    userId,
    stanceId,
    associationType: "like",
  });
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
    }
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
    }
  );
  return stance;
};

const addDislikeToPost = async (stanceId, userId) => {
  const alreadyLiked = await UserStanceAssociationModel.findOne({
    where: {
      userId,
      stanceId,
      associationType: "dislike",
    },
  });
  if (alreadyLiked) {
    return false;
  }
  const stance = await StanceModel.increment(
    {
      dislikes: +1,
    },
    {
      where: {
        id: stanceId,
      },
    }
  );
  await UserStanceAssociationModel.create({
    userId,
    stanceId,
    associationType: "dislike",
  });
  return stance;
};
const getTopicForVideo = async (videoPath) => {
  const transcript = await convertVideoToTranscription(videoPath);

  const allTopics = await findAllTopics();
  const topic = await analyzeVideoTopic(
    transcript,
    allTopics.map((item) => item.name).join(", ")
  );

  // Delete the temporary uploaded file
  fs.unlinkSync(videoPath);

  return topic;
};

async function convertVideoToTranscription(videoPath) {
  const audioPath = `./${uuidv4()}.flac`;
  return new Promise((resolve, reject) => {
    const ffmpegCommand = `ffmpeg -i "${videoPath}" -vn -acodec flac -ar 48000 -ac 2 "${audioPath}"`;
    exec(ffmpegCommand, (error, stdout, stderr) => {
      console.log("FFmpeg stdout:", stdout);
      console.log("FFmpeg stderr:", stderr);
      if (error) {
        console.error("FFmpeg error:", error);

        reject(error);
        return;
      }
      const audio = fs.readFileSync(audioPath);

      openaiClient
        .createTranscription(fs.createReadStream(audioPath), "whisper-1")
        .then((response) => {
          const transcriptions = response?.data.text.trim();
          fs.unlinkSync(audioPath);
          resolve(transcriptions);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

async function analyzeVideoTopic(transcript, allTopics) {
  const prompt = `This is a video about \"${transcript}"\. Please provide a one or two word topic for the video and also check if the video falls in any of these topics : ${allTopics}.`;
  try {
    const { data } = await openaiClient.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const topic = data.choices[0].text?.split(":")[1].trim();
    return topic;
  } catch (err) {
    console.log("err", err);
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
