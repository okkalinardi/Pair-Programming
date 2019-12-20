function userCheck(req, res, next){
    if(!req.session.UserId){
        res.redirect('/')
        // next()
    }else if(req.session.UserId!=req.params.id){
        // res.send(req.params)
        res.render('errorPage', {error:'Access Unauthorized'})
        // next()
    }else{
        next()
    }
}

module.exports = userCheck