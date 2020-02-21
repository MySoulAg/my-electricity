/**
 * 格式化的工具类方法
 */

export default {
  /**
   * 判断对象是否为空
   * @param data
   * @returns {boolean}
   */
  isEmpty(data) {
    if (typeof data == "undefined" || null == data || "" === data) {
      return true;
    } else if (this.isArray(data)) {
      return data.length == 0;
    } else if (this.isJSON(data)) {
      for (var a in data) {
        return false;
      }
      return true;
    }
    return false;
  },

  /**
   * 去除空格
   */
  removeSpaces(str) {
    return str.replace(/\s+/g, "");
  },

  /**
   * 中间显示成*号
   * @param value
   * @param frontCount 前显示的位
   * @param endCount 后显示的位
   * @returns value
   */
  format2Star(value, frontCount, endCount) {
    if (this.isEmpty(value)) {
      return "";
    }
    let vLength = value.length;
    let starCount = vLength - frontCount - endCount;
    if (starCount <= 0) {
      return value;
    } else {
      let reg = new RegExp(
        "^(.{" + frontCount + "})(.{" + starCount + "})(.*)$"
      );
      let result = value.match(reg);
      let star = (Math.pow(10, starCount) + "")
        .replace(/0/g, "*")
        .replace("1", "");
      return result[1] + star + result[3];
    }
  },

  /**
   * 是否加0
   * @param va 数字参数
   */
  padDate(va) {
    va = va < 10 ? "0" + va : va;
    return va;
  },

  /**
   * 处理日期
   * @param val 传入标准时间
   */
  handleDate(type, val) {
    const value = new Date(val);
    const year = value.getFullYear();
    const month = this.padDate(value.getMonth() + 1);
    const day = this.padDate(value.getDate());
    const h = this.padDate(value.getHours());
    const m = this.padDate(value.getMinutes());
    const s = this.padDate(value.getSeconds());
    if (type == "yyyy年MM月DD日") {
      // cn
      return `${year}年${month}月${day}日`;
    } else if (type == "yyyy年MM月DD日 hh时mm分") {
      // cn-dt
      return `${year}年${month}月${day}日 ${h}时${m}分`;
    } else if (type == "yyyy-MM-DD") {
      // zh
      return `${year}-${month}-${day}`;
    } else if (type == "yyyy-MM-DD hh:mm:ss") {
      return `${year}-${month}-${day} ${h}:${m}:${s}`;
    } else if (type == "yyyy-MM-DD hh:mm") {
      return `${year}-${month}-${day} ${h}:${m}`;
    }
  },
}