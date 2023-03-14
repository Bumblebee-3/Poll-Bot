
const app = require("express")();
function loadSite(){
  app.get("/data/:id",async (req,res)=>{
      var data =JSON.parse(require("fs").readFileSync(process.cwd() + "/data.json"));

    if(!req.params.id){
      res.sendFile(process.cwd()+"/data.json");
    }
    else{
      for(let i=0;i<data.length;i++){
        if(req.params.id==data[i].id){
          return res.json(data[i])
        }
      }
      res.json({"Error":"no poll with id "+req.params.id+" found!"})
    }
  })
  app.get("/poll/:id",async (req,res)=>{
    var data =JSON.parse(require("fs").readFileSync(process.cwd() + "/data.json"));

    for(let i=0;i<data.length;i++){
        if(req.params.id==data[i].id){
          return res.sendFile(__dirname+"/pages/page.html")
        }
      }
      res.sendFile(__dirname+"/pages/error.html")
  })
  app.listen(3000,function(){
    console.log("Website Ready!")
  })
}

module.exports = { loadSite }