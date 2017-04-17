var logger = require('winston');
var pQueue = require('fastpriorityqueue');

function isValidIndex(size, coordinate) {
    return (0 <= coordinate.x && coordinate.x < size.n &&
            0 <= coordinate.y && coordinate.y < size.m)
}

function getNeighbours(size, coordinate) {
    var neighbours = [];

    var top = {
        x: coordinate.x - 1,
        y: coordinate.y
    };
    var left = {
        x: coordinate.x,
        y: coordinate.y -1
    };
    var bottom = {
        x: coordinate.x + 1,
        y: coordinate.y
    };
    var right = {
        x: coordinate.x,
        y: coordinate.y + 1
    };

    var directions = [ top, left, bottom, right ];
    directions.forEach((direction) => {
        if(isValidIndex(size, direction)) {
            neighbours.push(direction);
        }
    });

    return neighbours;
}

function createMaze(input) {
    logger.info('[bfs]',  'Creating maze');
    var maze = [];
    for(var i = 0; i < input.size.n; i++) {
        var row = [];
        for(var j = 0; j < input.size.m; j++) {
            var weight = input.weights[i * input.size.m + j];
            var cell = {
                position: {
                    x: i,
                    y: j
                },
                weight: weight,
                visited: false
            }
            row.push(cell);
        }
        maze.push(row);
    }

    logger.info('[bfs]', 'Maze created');
    return maze;
}

function solutionFound(goal) {
    return goal.visited;
}

// Goes through the found path in reverse order from goal node
// through `previous` fields, until it reaches the start node.
function getSolution(goal, maze) {
    logger.info('[bfs]', 'Constructing solution');
    var route = [ goal.position ];

    var cell = goal;
    while(cell.previous) {
        route.unshift(cell.previous);
        cell = maze[cell.previous.x][cell.previous.y];
    }

    logger.info('[bfs]', 'Solution constructed');
    return route;
}

function formatOutput(route) {
    var solution = [];
    for(var i = 0; i < route.length; i++) {
        var cell = route[i];
        solution.push(cell.x + 1, cell.y + 1);
    }
    var output = solution.join();

    return output;
}

function orderByDistance(a, b) {
    return b.distance > a.distance;
}

function Bfs(input) {
    return new Promise((resolve, reject) => {
        var queue = new pQueue(orderByDistance);
        var maze = createMaze(input);
        var start = maze[input.start.x][input.start.y];
        start.distance = start.weight;
        var goal = maze[input.goal.x][input.goal.y];

        queue.add(start);
        while(!queue.isEmpty() || !solutionFound(goal)) {
            var cell = queue.poll();
            logger.info('[bfs]', `Visiting node ${JSON.stringify(cell.position)}`);
            cell.visited = true;
            var neighbours = getNeighbours(input.size, cell.position);

            neighbours.forEach((neighbour) => {
                var newCell = maze[neighbour.x][neighbour.y];
                if(!newCell.visited) {
                    newCell.distance = cell.distance + newCell.weight;
                    newCell.previous = cell.position;
                    logger.info('[bfs]', `Found new node ${JSON.stringify(newCell.position)} distance: ${newCell.distance}`);
                    queue.add(newCell);
                }
            });
        }

        var route = getSolution(goal, maze);
        var formattedRoute = formatOutput(route);
        logger.info('[bfs]', `Route found: ${formattedRoute}`);
        resolve(formattedRoute);
    });
}


module.exports = Bfs;
