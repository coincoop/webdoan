import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) =>{
    const token = req.headers.token;
    if (token){
        // const accessToken = token.split(" ")[1];
        const accessToken = token;
        jwt.verify(accessToken,process.env.JWT_ACCESS_TOKEN, (err,user)=>{
            if(err){
                return res.status(403).json("Token is invalid")
            }
            
            req.user = user;
            next();
        });
    }else{
        return res.status(401).json("Chưa đăng nhập")
    }
}