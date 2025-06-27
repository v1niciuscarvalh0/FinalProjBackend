import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next) => {

    try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET);

    next();
    
    } catch(e) {
        if(e.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expirado" });
        } else {
            return res.status(401).json({ message: "Token inválido"});
        }
    }
}

export default authMiddleware;