const axios = require('axios')
const ojisanCompiler = async (msg,token) => {
  const res = await axios({
    method: "POST",
    url: "https://asia-northeast1-vue-oji-cotoha.cloudfunctions.net/ojisanCompiler",
    data: {
      functionToken: "jv8rmvf8kd0c3j",
      access_token: token,
      message: msg
    }
  })
  try{
    const result = res.data.message
    return result
  }catch(e){
    return new Error()
  }
}

export default ojisanCompiler
