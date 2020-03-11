import axios from 'axios'

const auth = async (clientId,clientSecret) => {
  const res = await axios({
    method:"post",
    url:"https://asia-northeast1-vue-oji-cotoha.cloudfunctions.net/getAccessToken",
    data:{
      "functionToken": "jv8rmvf8kd0c3j",
      "clientId": clientId,
      "clientSecret": clientSecret
    }
  })
  try{
    const accessToken = res.data.access_token
    return accessToken
  }catch(e){
    return new Error()
  }
}

export default auth
