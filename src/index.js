/**
 * 获取指定空格数的空格字符串
 * @param { Number } n 指定个数 
 * @return { String } 空格字符串 
 */
const getBlankStr = (n) => {
  return new Array(n).fill(' ').join('')
}

const fullJustify = (words, maxWidth) => {
  let result = []
  let [ right, n ] = [0, words.length]
  while (true) {
    // 当前行的第一个单词在 words 的位置
    let left = right
    // 统计这一行单词长度之和
    let sumLen = 0
    while (right < n && (sumLen + words[right].length + right - left) <= maxWidth) {
      sumLen += words[right].length
      right++
    }
    // 第一种情况：当前行是最后一行
    if (right === n) {
      const s = words.slice(left).join(' ')
      result.push((s + getBlankStr(maxWidth - s.length)))
      break
    }
    const wordNum = right - left
    const spaceNum = maxWidth - sumLen

    // 第二种情况：当前行不是最后一行，且只有一个单词
    if (wordNum === 1) {
      result.push(words[left] + getBlankStr(spaceNum))
      continue
    }
    
    // 第三种情况：当前行不是最后一行，且不只一个单词
    const avgSpaces = Math.floor(spaceNum / (wordNum - 1))
    const extraSpaces = spaceNum % (wordNum - 1)
    // 拼接额外加一个空格的单词
    const s1 = words.slice(left, left + extraSpaces + 1).join(getBlankStr(avgSpaces + 1))
    // 拼接其余单词
    const s2 = words.slice(left + extraSpaces + 1, right).join(getBlankStr(avgSpaces))
    result.push(s1 + getBlankStr(avgSpaces) + s2)
  } 
  return result
}

const words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"]
const maxWidth = 20

const result = fullJustify(words, maxWidth)
console.log('result', result)