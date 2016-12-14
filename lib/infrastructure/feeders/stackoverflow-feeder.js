const DataFeeder = require('./data-feeder');
const Logger = require('../logger');

class StackoverflowFeeder extends DataFeeder {
  feedData(services) {
    return new Promise((resolve) => {
      resolve(services);
      /*
       const servicesByTag = services.reduce((prev, curr) => {
       prev[curr.reference.get('stackoverflow')] = curr;
       return prev;
       }, {});

       const tags = services.map(service => service.reference.get('stackoverflow')).join(';');
       HttpClient.fetchData(`https://api.stackexchange.com/2.2/tags/${tags}/info?site=stackoverflow`)
       .then((data) => {
       const items = data.items;
       items.forEach((item) => {
       servicesByTag[item.name] = item.count;
       });
       Logger.info('StackOverflow data loaded');
       resolve(services);
       })
       .catch(err => reject(err));
       */
    });
  }
}

module.exports = new StackoverflowFeeder();
