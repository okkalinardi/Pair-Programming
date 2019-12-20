function logCheck(req, res, next){
    if(req.session.UserId){
        res.render('errorPage', {error:'sedang ada yang login'})
        // next()
    }else{
        // res.send('belum ada login')
        next()
    }
}

module.exports = logCheck