export default class TimerHelper {
  static async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
