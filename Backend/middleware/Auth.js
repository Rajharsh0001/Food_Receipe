import jwt from "jsonwebtoken";


const verifyToken = async(req, res, next) => {
  let token = req.headers["authorization"]

  if(token){
    token = token.split(" ")[1]
    jwt.verify(token,process.env.SECRET_KEY, (err, decoded)=> {
      if(err){
        return res.status(400).json({messsage:"invalid token"})
      }
      else{
        console.log(decoded)
        req.user = decoded
      }
    })
    next()
  }
  else{
    return res.status.status(400).json({message:"Inavlid or expired token"})
  }
}

export default verifyToken