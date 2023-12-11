const fs = require('fs');

/**
 * @param {String} filePath 
 */
const getPuzzleInput = (filePath) => {
    const fd = fs.openSync(filePath)
    const [directions, _, ...lines ] = fs.readFileSync(fd, { encoding: 'utf8', flag: 'r'})
        .split('\n');

    const lookup = lines.reduce((acc, line) => {
        const result = /([0-9A-Z]{3}) = \(([0-9A-Z]{3}), ([0-9A-Z]{3})\)/.exec(line);
        if (!result) return acc;

        return {
            ...acc,
            [result[1]]: {left: result[2], right: result[3]}
        };
    }, {});

    return { directions, lookup }
}

/**
 * @param {string} directions 
 * @param {{[key: string]: {left: string, right: string}}} lookup 
 * @returns {number}
 */
const calculateStepsPart1 = (directions, lookup) => {
    let steps = 0;
    for(let current = 'AAA'; current != 'ZZZ'; steps++) {
        const direction = directions.charAt(steps%directions.length);
        current = direction === 'R' ? lookup[current].right : lookup[current].left;
    }
    return steps;
}

function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }
  
  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

const calculateStepsPart2 = (directions, lookup) => {
    let nodes = Object.keys(lookup).filter(key => key.endsWith('A'));
    let nodeSteps = new Array(nodes.length);

    for(let i=0; i<nodes.length; i++) {
        let current = nodes[i], steps = 0;
        do {
            const direction = directions.charAt(steps++ % directions.length);
            current = direction === 'R' ? lookup[current].right : lookup[current].left
        } while (!current.endsWith('Z'));
        nodeSteps[i] = steps;
    }

    console.log(nodeSteps.reduce((acc, curr) => lcm(acc, curr), 1));
};

// const calculateStepsPart2 = (directions, lookup) => {
//     let nodes = Object.keys(lookup).filter(key => key.endsWith('A'));
//     let times = new Array(nodes.length);
//     let steps = 0;

//     let start = nodes[0];
//     let current = start;

//     console.log(start);



//     do {
//         const direction = directions.charAt(steps++ % directions.length);
//         current = direction === 'R' ? lookup[current].right : lookup[current].left
//         if (current.endsWith('Z')) {
//             console.log(current, steps);
//         }
//     } while (true);

//     // do {
//     //     const direction = directions.charAt(steps % directions.length);
//     //     for(var i=0; i<nodes.length; i++) {
//     //         nodes[i] = direction === 'R' ? lookup[nodes[i]].right : lookup[nodes[i]].left
//     //     }
//     //     steps++;
//     // } while (!nodes.every(node => node.endsWith('Z')));
//     return steps;
// };

const { directions, lookup } = getPuzzleInput('day-08/final.txt');
console.log(calculateStepsPart2(directions, lookup));