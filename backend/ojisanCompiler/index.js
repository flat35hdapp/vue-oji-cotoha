/**
* HTTP function that supports CORS requests.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/
const axios = require('axios')
exports.corsEnabledFunction = async (req, res) => {
 // Set CORS headers for preflight requests
 // Allows GETs from any origin with the Content-Type header
 // and caches preflight response for 3600s

 res.set('Access-Control-Allow-Origin', '*');

 if (req.method === 'OPTIONS') {
   // Send response to OPTIONS requests
   res.set('Access-Control-Allow-Methods', 'POST');
   res.set('Access-Control-Allow-Headers', 'Content-Type');
   res.set('Access-Control-Max-Age', '3600');
   res.status(204).send('');
 } else {
   await ojisanCompiler(req,res)
 }
};

class Cotoha{
  constructor(sentence,cotoha_token){
    this.sentence = sentence;
    this.cotoha_token = cotoha_token
  }
  async client(){
    const axiosConfig = await axios.create({
      headers:{
        "Authorization": `Bearer ${this.cotoha_token}`,
        "Content-Type": "application/json"
      },
      baseURL:"https://api.ce-cotoha.com/api/dev/nlp/v1",
    });
    return axiosConfig;
  }
  async parse(){
    const axiosBase = await this.client();
    axiosBase.post("/parse",{
     "sentence":this.sentence
   }).then(async(res)=>{
     //await fs.writeFile("./output/parse.json",JSON.stringify(res.data,null,"\t"));
     return res.data;
   }).catch(err=>{
     console.log(err);
     throw err;
   });
  }
  async sentiment(){
    const axiosBase = await this.client();
    axiosBase.post("/sentiment",{
      "sentence":this.sentence
    }).then(async (res)=>{
      //await fs.writeFile("./output/sentiment.json",JSON.stringify(res.data,null,"\t"));
      return res.data
    }).catch(err=>{
      console.log(err);
      throw err;
    })
  }
  async unique(){
    const axiosBase = await this.client();
    const res = await axiosBase.post("/ne",{
      "sentence":this.sentence
    });
    //await fs.writeFile("./output/unique.json",JSON.stringify(res.data,null,"\t"));
    return res.data;
  }
  async similarity(s2){
    const axiosBase = await this.client();
    const res = await axiosBase.post("/similarity",{
      "s1":this.sentence,
      "s2":s2
    });
    //await fs.writeFile("./output/similarity.json",JSON.stringify(res.data,null,"\t"));
    return res.data;
  }
  async sentenceType(){
    const axiosBase = await this.client();
    const res = await axiosBase.post("/sentence_type",{
      "sentence":this.sentence,
    });
    //await fs.writeFile("./output/sentenceType.json",JSON.stringify(res.data,null,"\t"));
    return res.data;
  }
}

const ojisanCompiler = async (req,res) => {
  const obj = req.body
  if(obj!="jv8rmvf8kd0c3j"){
    res.status(500).send("Server Error")
  }
  const token = obj.access_token
  const msg = obj.message
  const cotoha = new Cotoha(msg,token)
  console.log(cotoha)
  const result = "おじさんテキスト"

  //const status = 200//test環境ではコメントアウトする
  //res.status(status).json({message: result})//test環境ではコメントアウトする
  console.log(result)
}

const request = {
  body: {
    access_token: "WjPODeSphB49P4i08xaA0vAhzOgX",
    message: "今日もコロナウイルスのせいで自宅待機です。"
  }
}
ojisanCompiler(request)
