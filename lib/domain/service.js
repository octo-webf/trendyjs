class Service {
  constructor(options) {
    if (options) {
      this.reference = options.reference;
      this.npmjs = {};
      this.github = {};
      this.stackoverflow = {};
    }
  }
}

module.exports = Service;
