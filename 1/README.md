# Installation and Usage

Install dependencies:

```sh
cd 1/
$ yarn install
```

Run:

```sh
$ yarn run start
```

Run tests:
```sh
$ yarn run test
```


## Objective 1

> Build a simulation of a round robin load balancer. Given seven servers, named
> a-g, write code that when called, will output the name of the next server in
> the round robin sequence.


### Implementation

I assume that I'm supposed to implement a **simulation** rather a productive
load balancer in JavaScript. First of all, you wouldn't implement a load
balancer in JavaScript, second, you wouldn't re-implement the wheel and grab
some code from this internet.

So, for the simulation I'm assuming you would run a nodejs script like this:

```sh
node round-robin.js
```

And see the following result:

```
Server A
Server B
Server C
Server D
Server E
Server F
Server G
Server A
Server B
Server C
...
```


#### Testing

I would suggest to use a testing framework like `jest` and write a unit test.

* Arrange: Setup a load balancer which has the list of available servers.

* Act: Run a function `loadBalancer.next()` multiple times, e.g. more often than
  there are servers.

* Assert: Expect that all servers are returned once and expect that after
  the last server is returned, it starts over beginning with server A.
