const jwt = require('jsonwebtoken');



module.exports = (req, res, next)=>{

    try{
        const token = req.headers.authorization;
        console.log(token);
        const decodeToken = jwt.verify(token, process.env.SECRET_TOKEN);
        if(req.body.userId && req.body.userId !== decodeToken.userId){
            return res.status(401).json({
                status:401,
                message: 'user ID invalid'
            })
        }else{
            next();
        }
    }catch(err){
        return res.status(500).json({
            status: 500,
            mesage: err.message
        })
    }
}

