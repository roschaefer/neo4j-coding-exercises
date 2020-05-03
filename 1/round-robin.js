class RoundRobin {
  constructor(servers) {
    this.i = -1;
    this.servers = servers;
  }

  next() {
    this.i += 1;
    return this.servers[this.i % this.servers.length];
  }
}

module.exports = RoundRobin;
