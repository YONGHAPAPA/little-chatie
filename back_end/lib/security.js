const bcrypt= require('bcryptjs');

exports.encryptPassword = function(password, round, callback){
    bcrypt.genSalt(round, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
 
            if(err){
                console.log(err);
                throw err;
            }

            callback(hash);
        })
    })
}

exports.comparePassword = function(password, hash, callback){
    bcrypt.compare(password, hash, (err, res) => {
 
        if(err){
            console.log(err);
            throw err;
        }

        callback(res);
    })
}