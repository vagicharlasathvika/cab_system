document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculateButton');

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

      calculateButton.onclick = function () {
        fetch('fetch_cab_prices.php')
            .then(response => response.json())
            .then(data => {
                const cabPrices = data.cabs;
                const { totalCost, shortestPath } = calculateTotalCost();
                displayCabOptions(cabPrices, totalCost, shortestPath);
            })
            .catch(error => console.error('Error fetching cab prices:', error));
    };

    function calculateTotalCost() {
        const source = document.getElementById('source').value;
        const destination = document.getElementById('destination').value;

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

        const { totalCosts, previous } = graph.dijkstra(source);
        const shortestPath = graph.getPath(source, destination, previous);

        return { totalCost: totalCosts[destination], shortestPath };
    }

    function displayCabOptions(cabPrices, totalCost, shortestPath) {
        // Assuming you have a div with the class 'cab-options' in your booking HTML
        const cabOptionsElement = document.querySelector('.cab-options');

        cabPrices.forEach(cab => {
            const cabOption = document.createElement('div');
            cabOption.classList.add('cab-option');
            cabOption.innerHTML = `
                <h3>${cab.cab_type}</h3>
                <p>Total Cost: $${(totalCost * cab.price_per_minute).toFixed(2)}</p>
                <p>Shortest Path: ${shortestPath.join(" -> ")}</p>
            `;
            cabOptionsElement.appendChild(cabOption);
        });
    }
});
