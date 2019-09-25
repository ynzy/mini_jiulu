// 类似switch
let newVal={
  type: 100
}
const typeText = {
  100: "电影",
  200: "音乐",
  300: "句子"
}[newVal.type]
console.log(typeText);
