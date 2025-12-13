import { createClient } from "@supabase/supabase-js";

const supabase=createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const requireAuth = async(req,res,next)=>{
  try{
  const authHeader=req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(401).json({message: "Not Authenticated"})
  }

  const token=authHeader.split(" ")[1];

  const {data,error} = supabase.auth.getUser(token)

  if(error || !data.user){
    return res.status(401).json({message:"Invalid Token"})
  }

  req.user={
    id:data.user.id,
    email:data.user.email
  }

  next()
}catch(err){
  return res.status(401).json({message:"authentication failed"})
}
}