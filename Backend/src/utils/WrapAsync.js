
async function WrapAsync(fn){
return function(req,res,next){
 try{
    fn(req,res)
 }
 catch(err){
    next(err)
 }
}
}

export default WrapAsync;