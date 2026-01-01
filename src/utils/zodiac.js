/**
 * 星座工具函数 - 根据生日自动识别星座
 */

/**
 * 根据出生日期计算星座
 * @param {string} birthDate - 日期字符串，格式：YYYY-MM-DD
 * @returns {string} 星座名称，如 '白羊座'
 */
export function getZodiacSign(birthDate) {
  if (!birthDate) return '';
  
  const date = new Date(birthDate);
  const month = date.getMonth() + 1; // 0-11 -> 1-12
  const day = date.getDate();
  
  // 星座日期范围
  const zodiacRanges = [
    { name: '摩羯座', start: [12, 22], end: [1, 19] }, // 跨年处理
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '双鱼座', start: [2, 19], end: [3, 20] },
    { name: '白羊座', start: [3, 21], end: [4, 19] },
    { name: '金牛座', start: [4, 20], end: [5, 20] },
    { name: '双子座', start: [5, 21], end: [6, 21] },
    { name: '巨蟹座', start: [6, 22], end: [7, 22] },
    { name: '狮子座', start: [7, 23], end: [8, 22] },
    { name: '处女座', start: [8, 23], end: [9, 22] },
    { name: '天秤座', start: [9, 23], end: [10, 23] },
    { name: '天蝎座', start: [10, 24], end: [11, 22] },
    { name: '射手座', start: [11, 23], end: [12, 21] },
  ];
  
  // 处理跨年的摩羯座（12月22日 - 1月19日）
  if (month === 12 && day >= 22) {
    return '摩羯座';
  }
  if (month === 1 && day <= 19) {
    return '摩羯座';
  }
  
  // 处理其他星座（排除摩羯座，因为已经处理了）
  for (const zodiac of zodiacRanges) {
    if (zodiac.name === '摩羯座') continue; // 跳过摩羯座，已经处理
    
    const [startMonth, startDay] = zodiac.start;
    const [endMonth, endDay] = zodiac.end;
    
    // 如果月份在起始月和结束月之间（不包括边界）
    if (month > startMonth && month < endMonth) {
      return zodiac.name;
    }
    
    // 如果月份等于起始月，检查日期是否大于等于起始日期
    if (month === startMonth && day >= startDay) {
      return zodiac.name;
    }
    
    // 如果月份等于结束月，检查日期是否小于等于结束日期
    if (month === endMonth && day <= endDay) {
      return zodiac.name;
    }
  }
  
  // 默认返回空字符串（理论上不会到这里）
  return '';
}

