const str = "今日の僕のランチは直美とハンバーグだったよ、直美ちゃんはどんなランチだった？"
const text = "直美"
const regex = new RegExp(text,'gu')
console.log(str)
const after = str.replace(regex,'直美Super')
console.log(after);
console.log(str)
