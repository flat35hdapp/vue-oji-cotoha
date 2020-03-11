const Cotoha = require("./cotohaApi.js");

const ojisanCompiler = async (inputMsg,accessToken) => {
  const cotoha = new Cotoha(inputMsg,accessToken)
  //与えられた文を
  //const parseObj = cotoha.parse()
  //const parseSentence = parseObj.result
  //文末をおじさん修飾する
  const sentenceTypeObj = await cotoha.sentenceType()
  const sentenceTypeResult = sentenceTypeObj.result
  //const modality = sentenceTypeResult.modality
  const dialogAct = sentenceTypeResult.dialog_act[0]
  const typeToEmoji = {
    "greeting":"",
    "information-providing":"",
    "feedback":"",
    "information-seeking":"",
    "agreement":"",
    "feedbackElicitation":"",
    "commissive":"",
    "acceptOffer":"",
    "selfCorrection":"",
    "thanking":"",
    "apology":"",
    "stalling":"",
    "directive":"",
    "goodbye":"",
    "declineOffer":"",
    "turnAssign":"",
    "pausing":"",
    "acceptApology":"",
    "acceptThanking":""
  }
  const endEmoji = typeToEmoji[dialogAct]
  console.log(endEmoji)
}
export default ojisanCompiler
/*const test = async () => {
  console.log("test function start")
  const inputJson = await fs.readFile("./input/normal.json","utf-8")//normal.jsonの名前はinput ディレクトリの中に置いているjsonファイルの名前にしてください。
  const inputObj = JSON.parse(inputJson)
  const sentence = inputObj.sentence
  const cotoha = new Cotoha(sentence)
  const result = await cotoha.sentenceType();
  console.log(result);
  console.log("test function end")
}
test();
*/
