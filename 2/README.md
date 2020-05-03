# Objective 2

Update the load balancer such that each server is acquired for a random period of time between 1
and 10 seconds, before being released. Each server may accept multiple simultaneous incoming
connections but the load balancer should always serve on request the least connected server from
the pool.

## Implementation notes

So, for the simulation I'm assuming you would run a nodejs script like this:

```sh
node round-robin.js
```

And see the following result:

```
aquired Server A
debug: { A: 1, B: 0, C: 0, D: 0, E: 0 }
aquired Server B
debug: { A: 1, B: 1, C: 0, D: 0, E: 0 }
aquired Server C
debug: { A: 1, B: 1, C: 1, D: 0, E: 0 }
.....
aquired Server B
debug: { A: 2, B: 3, C: 2, D: 2, E: 2 }
released Server E: { A: 2, B: 3, C: 2, D: 2, E: 1 }
released Server E: { A: 2, B: 3, C: 2, D: 2, E: 0 }
aquired Server E
debug: { A: 2, B: 3, C: 2, D: 2, E: 1 }
aquired Server E
debug: { A: 2, B: 3, C: 2, D: 2, E: 1 }
```

With a little luck you would see the output above. If the connections of server
E are released quickly, it's becoming the least connected with more than just
one connection difference and thus it will be aquired in succession.


### Testing

Again, I would suggest to use a testing framework like `jest` and write a unit
test. You cannot test randommess reliably so I would suggest to stub out
timeouts and enforce a scenario as above where one server releases many
connections at once and is aquired multiple times for the next connections.

* Arrange: Setup a load balancer which has the list of available servers. Stub
  out timeouts with jest. Simulate that the function `loadBalancer.next()` has
  been called multiple times and in the meantime one server has released many
  connections quickly.

* Act: Run `loadBalancer.next()` multiple times.

* Assert: Expect that a particular server is returned many times in a row.

### Pseudo-benchmark

To check random behaviour I would suggest to run some sort of benchmark: If you
flood the load balancer with requests, it should equalize the number of open
connections per server. Since the connections are released with some delay, the
average number of connections should converge to a certain value after 10
seconds (which is the maximum delay).


## Implementation completed

When I run this command on my machine (fish shell):
```fish
env DEBUG='least-connected' LOOP_INTERVAL=10 node index.js
```

I can see that it converges at around 90 connections per server. The load is
always balanced.
