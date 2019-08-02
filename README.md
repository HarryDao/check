# check

## Install:
```
  yarn
```

## Test coverage:
```
  yarn test-coverage
```

## Assignment 1:

#### use example:
```
  const { store, load } = require('./1.Data_Store_and_Load/index.js');
  const arr = load('key1=value1;key2=value2\nkeyA=valueA\n');
  const text = store([{ key1: 'value1', key2: 'value2' }, { keyA: 'valueA' }]);
```

#### test:
```
  yarn test1
```

#### runtime & memory complexity: 
- store(): O(n) for runtime, O(n) for memory
- load(): O(n) for runtime, worst case for memory is O(log n)



## Assignment 2:

#### use example:
```
  const OptimalPath = require('./2.Optimal_Path/index.js');
  const path = new OptimalPath();
  path.addNode('A', 1); // 1st argument is name, 2nd is weight
  path.addNode('B', 2);
  path.addNode('C', 3);
  path.addEdge('A', 'B');
  path.addEdge('B', 'C');
  path.addEdge('A', 'C');
  path.search(); //output: A -> B -> C
```

#### runtime & memory complexity:
- search(): O(n) for runtime, O(n) for memory


## Assignment 3:

#### use example:
```
  const Bill = require('./3.Bill/index.js');
  const bill = new Bill();
  bill.isEmployee();
  bill.isAffiliate();
  bill.findNetPayable(250, 30); //1st argument is bill amount, 2nd is optional and is amount of groceries (output: 174)
```

#### test:
```
  yarn test3
```

#### runtime & memory complexity: 
- near O(1)