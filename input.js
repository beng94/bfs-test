var logger = require('./logger');

function Read() {
    return new Promise((resolve, reject) => {
        logger.info('[input]', 'Reading input');
        var input = '';
        process.stdin.on('data', (data) => {
            input += data.toString().trim();
        });

        process.stdin.on('end', () => {
            logger.info('[input]', 'Finished reading input');
            resolve(input);
        });
    });
}

function Parse(data) {
    return new Promise((resolve, reject) => {
        var input = data.split(",");
        var size = {
            n: Number(input[0]),
            m: Number(input[1])
        }
        logger.info('[input]', `Dimensions: ${size.n}x${size.m}`);

        var start = {
            x: Number(input[2] -1),
            y: Number(input[3] -1)
        };
        logger.info('[input]', `Start: ${start.x + 1}x${start.y + 1}`);

        var goal = {
            x: Number(input[4] -1),
            y: Number(input[5] -1)
        };
        logger.info('[input]', `Goal: ${goal.x + 1}x${goal.y + 1}`);

        var weights = input
            .slice(6, input.length)
            .map((weight) => {
                return Number(weight);
            });
        logger.info('[input]',  `Weights: ${weights}`);

        var object = {
            size: size,
            start: start,
            goal: goal,
            weights: weights
        };

        resolve(object);
    });
}

module.exports = {
    Read: Read,
    Parse: Parse
};
