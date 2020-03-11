import axios from 'axios'

export default class Cotoha{
  constructor(sentence,accessToken){
    this.sentence = sentence;
    this.accessToken = accessToken
  }

  async client(){
    const cotoha_token = this.accessToken

    const axiosConfig = await axios.create({
      headers:{
        "Authorization": `Bearer ${cotoha_token}`,
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
