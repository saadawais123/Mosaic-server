const asyncHandler = require('express-async-handler');
const { stanceService } = require('../services');
const { getResponse } = require('../helpers/response');

const { topic: TopicModel } = require('../sequelize/models');
const { Op } = require('sequelize');
require('dotenv').config();


const findOrCreate = async (topicName) => {
    const topic = await TopicModel.findOne({
        where: {
            name: {
                [Op.iLike]: `%${topicName}%`
            }
        }
    });

    if (topic) {
        await topic.update({
            updatedAt: new Date()
        })
        return topic
    }
    else {
        return await TopicModel.create({
            name: topicName
        })
    }

};

const findAll = async () => {
    const topics = await TopicModel.findAll({
        order: [['updatedAt', "desc"]]
    });
    return topics

};

module.exports = {
    findAll,
    findOrCreate

};
