const { VisitorsModule } = require('@services/visitors');

module.exports = (app) => {
    app.post('/visits', async (req, res) => {
        try {
            /*const results = await BatchEditModule.bulkActions(req.body);
            res.send(results);*/
            const savedVisitor = await VisitorsModule.saveVisitor({
                userId: req.body['user-id'],
                pageId: req.body['page-id'],
                ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                agent: req.useragent,
            })
            res.send(savedVisitor);
        } catch (e) {
            res.status(400);
            res.send(e.message);
        }
    });

    app.get('/visits/page/:pageId',async (req, res) => {
        try {
            const visitsByPage = await VisitorsModule.getVisitorsByField('pageId', req.params.pageId)
            res.send(visitsByPage);
        } catch (e) {
            res.status(400);
            res.send(e.message);
        }
    });

    app.get('/visits/browser/:browserName',async (req, res) => {
        try {
            const visitsByPage = await VisitorsModule.getPageViewsByBrowser(req.params.browserName)
            res.send(visitsByPage);
        } catch (e) {
            res.status(400);
            res.send(e.message);
        }
    });

    app.get('/visits/country/:country',async (req, res) => {
        try {
            const visitsByPage = await VisitorsModule.getPageViewsByCountry(req.params.country)
            res.send(visitsByPage);
        } catch (e) {
            res.status(400);
            res.send(e.message);
        }
    });

    app.get('/visits/top/page/:pageId',async (req, res) => {
        try {
            const visitsByPage = await VisitorsModule.getTopVisitors(req.params.pageId)
            res.send(visitsByPage);
        } catch (e) {
            res.status(400);
            res.send(e.message);
        }
    });

    app.get('/visits/top',async (req, res) => {
        try {
            const visitsByPage = await VisitorsModule.getTopVisitors()
            res.send(visitsByPage);
        } catch (e) {
            res.status(400);
            res.send(e.message);
        }
    });
};
