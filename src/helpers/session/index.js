const iplocation = require("iplocation").default;
const {UserSessionModel} = require('@helpers/mongo/user-session-model');

const getUserSession = async ({
    userId,
    ip,
    browser,
    os
}) => {
    let conditions = {
        expirationDateTime: {
            $gte: new Date(),
        },
    };
    if(userId) {
        conditions.userId = userId;
    } else {
        //need to track it by os, browser and ip only once we don't have implicitly specified userId
        conditions = {
            ...conditions,
            userId: null,
            ip,
            os,
            browser
        }
    }
    const date = new Date();
    return UserSessionModel.findOneAndUpdate(conditions, {
        lastActivity: date,
        expirationDateTime: date.setTime(date.getTime() + process.env.SESSION_LIFETIME * 1000)
    },{$new: true});
}

const createSession = async ({
    userId,
    ip,
    agent,
}) => {
    const location = await iplocation(ip);
    const date = new Date();
    return UserSessionModel.create({
        userId,
        ip,
        dateStart:  date,
        lastActivityDateTime: date,
        expirationDateTime: date.setTime(date.getTime() + process.env.SESSION_LIFETIME * 1000),
        os: agent.os,
        browser: agent.browser,
        country: location.country,
        city: location.city,
    })
}

const applySessionToUser = async ({
    userId,
    ip,
    agent,
}) => {
    const existingSession = await getUserSession({
        userId,
        ip,
        browser: agent.browser,
        os: agent.os,
    });

    if(existingSession) {
        return existingSession;
    }

    return createSession({
        userId,
        ip,
        agent,
    })
}

module.exports = {
    applySessionToUser,
}
