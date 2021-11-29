export default class ArrayHelper {
  static getRandomElement<T>(array: Array<T>) {
    const length = array.length;
    return array[Math.round(Math.random() * (length - 1))];
  }
}
