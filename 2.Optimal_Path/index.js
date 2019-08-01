class OptimalPath {
  constructor() {
    this.weights = [];
    this.nodes = [];
    this.edges = [];
  }

  addNode(name, weight) {
    this.nodes.push(name);
    this.weights.push(weight);
    this.edges.push([]);
  }

  addEdge(a, b) {
    const indexA = this.nodes.indexOf(a);
    const indexB = this.nodes.indexOf(b);
    this.edges[indexA].push(indexB);
  }

  search() {
    const { weights, nodes } = this;
    const paths = [];
    const memoization = {};
    const len = nodes.length;

    for (let index = 0; index < len; index++) {
      this.searchNode(index, paths, memoization);
    }

    return paths.reduce(({ optimalPath, max }, path) => {
      const cal = path.reduce((point, index) => point + weights[index], 0);
      if (cal > max) {
        return { optimalPath: path, max: cal };
      }
      else {
        return { optimalPath, max };
      }
    }, {optimalPath: [], max: 0}).optimalPath.map(item => nodes[item]).join(' -> ');
  }

  searchNode(index, paths, memoization) {
    if (memoization[index]) return memoization[index];
    let children = this.edges[index];

    if (!children.length) {
      const items = [[index]];
      memoization[index] = items;
      paths.push([index]);
      return items;
    }

    children = children.reduce((arr, child) => {
      this.searchNode(child, paths, memoization).forEach(nodes => {
        arr.push([index, ...nodes]);
      });
      return arr;
    }, []);


    memoization[index] = children;
    paths.push(...children);

    return children;
  }
}

module.exports = OptimalPath;

// const path = new OptimalPath();
// path.addNode('A', 1);
// path.addNode('B', 2);
// path.addNode('C', 3);
// path.addEdge('A', 'B');
// path.addEdge('B', 'C');
// path.addEdge('A', 'C');
// console.log(path.search());