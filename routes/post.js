module.exports = (app, ) => {
    app.post('/simulacao', (req, res) => {
        res.send(  {text:'teste ok', req: req.body} )
        
    })
}