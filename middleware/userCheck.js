function userCheck(req, res, next){
    if(!req.session.UserId){
        res.render('loginPage')
        // next()
    }else if(req.session.UserId!=req.params.id){
        res.send('Access unauthorized')
        // next()
    }else{
        next()
    }
}

module.exports = userCheck