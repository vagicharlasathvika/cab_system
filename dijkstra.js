function findShortestPath() {
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;

    const resultElement = document.getElementById('result');
    
    class Graph {
        constructor() {
          this.nodes = [];
          this.edges = {};
        }
      
        addNode(node) {
          this.nodes.push(node);
          this.edges[node] = [];
        }
      
        addEdge(node1, node2, weight) {
          this.edges[node1].push({ node: node2, weight });
          this.edges[node2].push({ node: node1, weight });
        }
      
        dijkstra(startNode) {
          const distances = {};
          const visited = {};
          const totalCosts = {};
          const previous = {};
          const pq = new PriorityQueue();
      
          // Initialize distances and priority queue
          this.nodes.forEach(node => {
            distances[node] = node === startNode ? 0 : Infinity;
            totalCosts[node] = node === startNode ? 0 : Infinity; 
            pq.enqueue(node, distances[node]);
            visited[node] = false;
            previous[node] = null;
          });
      
          while (!pq.isEmpty()) {
            const currentNode = pq.dequeue().element;
            if (visited[currentNode]) continue;
            visited[currentNode] = true;
      
            this.edges[currentNode].forEach(neighbor => {
              const potentialShortestDistance = distances[currentNode] + neighbor.weight;
              if (potentialShortestDistance < distances[neighbor.node]) {
                distances[neighbor.node] = potentialShortestDistance;
                totalCosts[neighbor.node] = totalCosts[currentNode] + neighbor.weight;
                previous[neighbor.node] = currentNode;
                pq.enqueue(neighbor.node, distances[neighbor.node]);
              }
            });
          }
      
          return { distances,totalCosts, previous };
        }
      
        getPath(startNode, endNode, previous) {
          const path = [];
          let currentNode = endNode;
      
          while (currentNode !== startNode) {
            path.unshift(currentNode);
            currentNode = previous[currentNode];
          }
      
          path.unshift(startNode);
          return path;
        }
      }
      
      class PriorityQueue {
        constructor() {
          this.items = [];
        }
      
        enqueue(element, priority) {
          const queueElement = { element, priority };
          let added = false;
      
          for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
              this.items.splice(i, 0, queueElement);
              added = true;
              break;
            }
          }
      
          if (!added) {
            this.items.push(queueElement);
          }
        }
      
        dequeue() {
          return this.isEmpty() ? "Underflow" : this.items.shift();
        }
      
        isEmpty() {
          return this.items.length === 0;
        }
      }
    // Example usage:

    const graph = new Graph();

    graph.addNode("A");
    graph.addNode("B");
    graph.addNode("C");
    graph.addNode("D");
    graph.addNode("E");
    graph.addNode("F");

    graph.addEdge("A", "B", 5);
    graph.addEdge("A", "C", 7);
    graph.addEdge("B", "D", 15);
    graph.addEdge("B", "E", 20);
    graph.addEdge("C", "D", 5);
    graph.addEdge("C", "E", 35);
    graph.addEdge("D", "F", 20);
    graph.addEdge("E", "F", 10);

    const { distances, totalCosts,previous } = graph.dijkstra(source);
    const shortestPath = graph.getPath(source, destination, previous);

    // Display the result in the HTML page
    resultElement.innerHTML = `
        <p>Total cost of the shortest path from ${source} to ${destination}: ${totalCosts[destination]}</p>
        <p>Shortest path from ${source} to ${destination}: ${shortestPath.join(" -> ")}</p>
       
        
    `;
}