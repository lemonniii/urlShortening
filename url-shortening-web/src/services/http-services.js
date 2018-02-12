import 'whatwg-fetch';

class HttpService {
  getUrls = () => {
    var promise = new Promise((resolve, reject) => {
      fetch('http://localhost:3004')
        .then(res => {
        resolve(res.json());
      })
    });
    return promise;
  }

  fetchShort = (long) => {

    var url = 'http://localhost:3004/long/' + long;

    var promise = new Promise((resolve, reject) => {
      fetch(url)
      .then(res => {
        resolve(res.json());
      })
    });
    return promise;
  }

  addVisitor = (short) => {

    var promise = new Promise((resolve, reject) => {
      fetch(short, {method: 'POST'})
      .then(res => {
        resolve(res.json());
      })
    });
    return promise;
  }

  urlGetInfo = (short) => {

    var promise = new Promise((resolve, reject) => {
      fetch(short)
      .then(res => {
        resolve(res.json());
      })
    });
    return promise;
  }

}

export default HttpService;
