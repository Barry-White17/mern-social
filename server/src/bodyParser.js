export default function bodyParser(req, res, next){
  if(req.method=== "GET" || req.method === "HEAD"){
    return next();
  }
  const contentType= req.headers['content-type'] || '';
  if(!contentType.includes('application/json')){
    return next();
  }
  const chunks= [];
  req.on('data', (chunk)=> {
    chunks.push(chunk);
  });
  req.on('end', ()=> {
    const rawBody= Buffer.concat(chunks).toString('utf-8');
    try{
      req.body= rawBody? JSON.parse(rawBody): {};
    }
    catch(err){
      req.body= {};
      return res.status(400).json({error: "Invalid JSON"});
    }
    next();
  });
  req.on('error', (err)=> {
    next(err);
  });
}
