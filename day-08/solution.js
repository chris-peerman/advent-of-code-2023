const fs = require('fs');

const filePath = 'day-08/final.txt';

const fd = fs.openSync(filePath)
const [directions, _, ...lines ] = fs.readFileSync(fd, { encoding: 'utf8', flag: 'r'})
    .split('\n');

const lookup = lines.reduce((acc, line) => {
    const result = /([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/.exec(line);
    if (!result) return acc;

    return {
        ...acc,
        [result[1]]: {left: result[2], right: result[3]}
    };
}, {});

let steps = 0;
for(let current = 'AAA'; current != 'ZZZ'; steps++) {
    const direction = directions.charAt(steps%directions.length);
    current = direction === 'R' ? lookup[current].right : lookup[current].left;
}

console.log(steps);