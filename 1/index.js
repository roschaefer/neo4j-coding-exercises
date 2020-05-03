const RoundRobin = require('./round-robin.js');

const loadBalancer = new RoundRobin(['A', 'B', 'C', 'D', 'E', 'F', 'G']);

function loop() {
  setTimeout(() => {
    console.log(`Server ${loadBalancer.next()}`);
    loop();
  }, 1000);
}

loop();
