function convertStatus(value){
    if(value==0){
        return 'On progress'
    }else{
        return 'Done!'
    }
}

module.exports=convertStatus