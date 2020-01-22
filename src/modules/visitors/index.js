const {VisitorModel} = require('@helpers/mongo/visitors-model');
const {UserSessionModel} = require('@helpers/mongo/user-session-model');
const {applySessionToUser} = require('@helpers/session');

class VisitorsModule {

    static async saveVisitor({
           userId,
           pageId,
           ip,
           agent,
           timestamp,
       }) {
        const session = await applySessionToUser({
            userId,
            ip,
            agent,
        });
        return VisitorModel.create({
            sessionId: session._id,
            pageId,
            date: timestamp ? new Date().setTime(timestamp) : new Date(),
        })
    }

    static async getVisitorsByField(field, value) {
        return VisitorModel.aggregate([{
            $match: {
                [field]: value
            },
        },{
            $lookup: {
                from: 'sessions',
                as: 'sessions',
                localField: 'sessionId',
                foreignField: '_id'
            }
        },
        {
            $unwind: '$sessions',
        },
        {
            $project: {
                pageId: '$pageId',
                sessionId: '$sessionId',
                browser: '$sessions.browser',
                ip: '$sessions.ip',
                country: '$sessions.country',
                city: '$sessions.city',
                userId: '$sessions.userId'
            }
        }]);
    }

    static async getPageViewsByCountry(country) {
        if(!country) {
            throw new Error('Country should be specified');
        }
        return UserSessionModel.aggregate([
            {
                $match: {
                    country,
                }
            },
            {
                $lookup: {
                    from: 'visits',
                    as: 'visits',
                    localField: '_id',
                    foreignField: 'sessionId',
                }
            },
            {
                $unwind: '$visits',
            },
            {
                $project: {
                    pageId: '$visits.pageId',
                    sessionId: '$visits.sessionId',
                    browser: '$browser',
                    ip: '$ip',
                    country: '$country',
                    city: '$city',
                    userId: '$userId'
                }
            }
        ])
    }

    static async getPageViewsByBrowser(browser) {
        if(!browser) {
            throw new Error('Browser should be specified');
        }
        return UserSessionModel.aggregate([
            {
                $match: {
                    browser,
                }
            },
            {
                $lookup: {
                    from: 'visits',
                    as: 'visits',
                    localField: '_id',
                    foreignField: 'sessionId',
                }
            },
            {
                $unwind: '$visits',
            },
            {
                $project: {
                    pageId: '$visits.pageId',
                    sessionId: '$visits.sessionId',
                    browser: '$browser',
                    ip: '$ip',
                    country: '$country',
                    city: '$city',
                    userId: '$userId'
                }
            }
        ])
    }

    static async getTopVisitors(pageId) {
        let aggregation = [];

        if(pageId) {
            aggregation.push({
                $match: {
                    'visits.pageId':pageId,
                }
            })
        }

        return UserSessionModel.aggregate([{
            $lookup: {
                from: 'visits',
                as: 'visits',
                localField: '_id',
                foreignField: 'sessionId',
            },
        },
        ...aggregation,
        {
            $group: {
                _id: '$userId',
                data: {
                    $push: {
                        visits: '$visits',
                        sessionStart: '$dateStart',
                        sessionEnd: '$lastActivityDateTime',
                    }
                },
                count: {
                    $sum: 1,
                },
            }
        }/*,{
            $match: {
                count: {
                    $gte: 2,
                }
            }
        }*/,{
            $project: {
                userId: '$_id',
                data: 1,
                _id: 0,
                count: 1,
            }
        },{
            $sort: {
                count: -1,
            }
        }
    ])

        /*return VisitorModel.aggregate([...aggregation,{
            $group: {
                _id: '$userId',
                data: {
                    $push: {
                        pageId: '$pageId',
                        browser: '$browser',
                        os: '$os',
                        country: '$country',
                        city: '$city',
                    }
                },
                count: {
                    $sum: 1,
                },
            }
        },{
            $match: {
                count: {
                    $gte: 2,
                }
            }
        },{
            $project: {
                userId: '$_id',
                data: 1,
                _id: 0,
                count: 1,
            }
        },{
            $sort: {
                count: -1,
            }
        }])*/
    }

}

module.exports = {
    VisitorsModule,
}
