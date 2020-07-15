import { NodeComponent, State } from '../algo1/node/node.component';
import { Map } from '../algo1/algo1.component'
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

export class Dijkstra {


    private unvisited = new Set<NodeComponent>();
    private current: NodeComponent;
    private solution_path = new Array<NodeComponent>();
    private directions = new Array<[number, number]>();
    private visitedNodesOrder = new Array<NodeComponent>();
        

    solve(grid:Map, start:NodeComponent, target:NodeComponent){

        this.init_nodes(grid);
        this.directions.push([1,0], [0,1], [-1, 0], [0, -1]);
        this.current = start;
        this.current.distance = 0;
        
        while(true){
            
            // cal distance
            this.calc_distance(grid);
            this.unvisited.delete(this.current);
            this.visitedNodesOrder.push(this.current);

            // found target
            if (!this.unvisited.has(target)){
                // TODO: calc shortest path
                return this.visitedNodesOrder;
            }
            // This only works if we keep non Inf distance at the end
            // by removing the node and re adding it after setting a fix
            // distance
            // This should only take O(1)
            for (let node of (Array.from(this.unvisited).reverse())) {
                //check the last node in the set to see if the
                //the distance is Inf,
                if(node.distance === Infinity){
                    return this.visitedNodesOrder;
                }else{
                    break;
                }
            }
            this.current = this.smallest_distance(grid);
        
        }


    }

    getShortestPath(grid:Map, lastNode:NodeComponent){
        let ans = new Array<NodeComponent>()
        let minDistance = Infinity;
        let currNode = lastNode;
        let minNode: NodeComponent;
        ans.push(lastNode);
        while(minDistance > 0){
            this.directions.forEach(dir => {
                let node = grid.getNode(currNode.x + dir[0], currNode.y + dir[1]);
                if(node !== null && node.state !== State.Wall){
                    if(node.distance < minDistance){
                        minDistance = node.distance;
                        minNode = node;
                    }
                }
            });
            currNode = minNode;
            ans.push(minNode);
        }
        return ans.reverse()
    }

    private smallest_distance(grid:Map){

        var min = Infinity;
        var min_node = null;
        var node: NodeComponent;
        for (let node of (Array.from(this.unvisited).reverse())) {
            
            if(node.distance === Infinity)
                break
            if(node.distance < min){
                min = node.distance;
                min_node = node;
            }
        }
        return min_node
    }

    private init_nodes(grid:Map){
        
        for(var row: number = 0; row < grid.length; row++){
            for(var col: number = 0; col < grid.width; col++){
                if(grid.arr[row][col].state !== State.Wall){
                    grid.arr[row][col].distance = Infinity;
                    this.unvisited.add(grid.arr[row][col])
                }
            }
        }
    }

    private calc_distance(grid:Map){
        
        this.directions.forEach(dir => {
            var node = grid.getNode(this.current.x + dir[0], this.current.y + dir[1]);
            if(node !== null && this.unvisited.has(node) && node.state !== State.Wall){
                var temp_distance = this.current.distance + 1;
                    if(node.distance > temp_distance){
                        node.distance = temp_distance
                        // move set distance node to end of set
                        this.unvisited.delete(node)
                        this.unvisited.add(node)
                    }
            }
        });
    }

}
