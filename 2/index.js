const LeastConnected = require('./least-connected');

const loadBalancer = new LeastConnected(['A', 'B', 'C', 'D', 'E', 'F', 'G']);

console.log(`
Set the following environment variables for configuration:
DEBUG=least-connected   log current state of connections per server
LOOP_INTERVAL=10        set a loop interval of 10 miliseconds (1 second default)
`);


const interval = process.env.LOOP_INTERVAL || 1000; // 1 second

function loop() {
  setTimeout(() => {
    console.log(`Server ${loadBalancer.next()}`);
    loop();
  }, interval);
}

loop();
