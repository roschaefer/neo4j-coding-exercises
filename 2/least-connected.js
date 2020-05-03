const debug = require('debug')('least-connected');

class LeastConnected {
  constructor(servers) {
    this.servers = {};
    servers.forEach((server) => {
      this.servers[server] = 0;
    });
  }

  next() {
    const lessConnected = (a, b) => {
      if (a[1] <= b[1]) return a;
      return b;
    };
    const [name, connections] = Object.entries(this.servers).reduce(lessConnected);
    this.servers[name] = connections + 1;
    debug('aquire %s %o', name, this.servers);

    const miliseconds = Math.random() * 10 * 1000 + 1;
    // up to ten seconds, plus one milisecond to include 10 seconds exactly

    setTimeout(() => {
      this.release(name);
    }, miliseconds);

    return name;
  }

  release(server) {
    if (!this.servers[server]) return;
    this.servers[server] -= 1;
    debug('release %s %o', server, this.servers);
  }
}


module.exports = LeastConnected;
