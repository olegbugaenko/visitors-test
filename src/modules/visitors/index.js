const iplocation = require("iplocation").default;
const {VisitorModel} = require('@helpers/mongo/visitors-model');

class VisitorsModule {

    static async saveVisitor({
           userId,
           pageId,
           ip,
           agent,
           timestamp,
       }) {
        const location = await iplocation(ip);
        return VisitorModel.create({
            userId,
            pageId,
            ip,
            date: timestamp ? new Date().setTime(timestamp) : new Date(),
            os: agent.os,
            browser: agent.browser,
            country: location.country,
            city: location.city,
        })
    }

    static async getVisitorsByField(field, value) {
        return VisitorModel.find({
            [field]: value,
        });
    }

    static async getTopVisitors(pageId) {
        let aggregation = [];

        if(pageId) {
            aggregation.push({
                $match: {
                    pageId,
                }
            })
        }

        return VisitorModel.aggregate([...aggregation,{
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
        }])
    }

}

module.exports = {
    VisitorsModule,
}
