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
}