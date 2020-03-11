import axios from 'axios'

const auth = async (clientId,clientSecret) => {
  console.log('axios start')
  const res = await axios({
    method:"post",
    url:"https://asia-northeast1-vue-oji-cotoha.cloudfunctions.net/getAccessToken",
    data:{
      "functionToken": "jv8rmvf8kd0c3j",
      "grantType": "client_credentials",
      "clientId": clientId,
      "clientSecret": clientSecret
    }
  })
  console.log('axios end')
  try{
    const accessToken = res.data.access_token
    return accessToken
  }catch(e){
    return new Error()
  }
}

export default auth
