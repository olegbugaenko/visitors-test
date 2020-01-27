module.exports = (app) => {

    app.use( (req, res, next) => {
        if(req.method.toLowerCase() !== 'get')
            return next();

        console.log(req.headers);

        if(req.headers.authorization === `Bearer ${process.env.AUTH_TOKEN}`)
            return next();

        res.status(403).send({
            message: 'You are not allowed to access this page'
        })
    });

}
