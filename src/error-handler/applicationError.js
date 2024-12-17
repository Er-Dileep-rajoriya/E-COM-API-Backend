export default class ApplicationError extends Error {
  // error Message, status code
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
