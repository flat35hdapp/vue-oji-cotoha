 /**
 * HTTP function that supports CORS requests.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
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
    await getAccessToken(req,res)
  }
};
//myFunction start.
const getAccessToken = async (req,res) => {
  const obj = req.body
  if(obj.functionToken != "jv8rmvf8kd0c3j"){
    res.status(500).send("Server Error")
  }
  const axios = require('axios')
  const clientId = obj.clientId
  const clientSecret = obj.clientSecret
  const result = await axios({
    method:"post",
    url:"https://api.ce-cotoha.com/v1/oauth/accesstokens",
    data:{
      "grantType": "client_credentials",
      "clientId": clientId,
      "clientSecret": clientSecret
    }
  })
  let status
  try{
    const accessToken = result.data.access_token
    status = 200
    res.status(status).json({access_token: accessToken})
  }catch(e){
    status = 501
    res.status(status).json({})
  }
}
