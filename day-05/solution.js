const fs = require('fs');

const loadInformation = (filePath) => {
    const fd = fs.openSync(filePath);

    const lines = fs.readFileSync(fd, { encoding: 'utf8', flag: 'r' })
        .split('\n')
        .map(line => line.trim());
        
    const maps = {};
    let seeds = [];
    let currentSection = null;

    for(const line of lines) {
        const sectionHeader = /(.*):(.*)/.exec(line);
        if (sectionHeader != null) {
            const { 1: title, 2: data } = sectionHeader;
            if (title === 'seeds') {
                seeds = [...data.matchAll(/(\d+)/g)].map(val => parseInt(val, 10));
            } else {
                currentSection = title;
                maps[currentSection] = [];
            }
            continue;
        }

        const valueData = /(\d+) (\d+) (\d+)/.exec(line);
        if (valueData != null) {
            const { 1: destRangeStart, 2: rangeStart, 3: rangeLength } = valueData;
            maps[currentSection].push({
                destRangeStart: parseInt(destRangeStart, 10), 
                rangeStart: parseInt(rangeStart, 10), 
                rangeLength: parseInt(rangeLength, 10)
            });
            continue;
        }
    }

    return { seeds, maps };
}

const lookupValue = (config, section, value) => {
    const table = config.maps[section];

    for(const ranges of table) {
        if (ranges.rangeStart <= value && (ranges.rangeStart + ranges.rangeLength - 1) >= value) {
            return value - ranges.rangeStart + ranges.destRangeStart;
        }
    }

    return value;
};

const question1 = (config) => {
    let lowestLocation = Number.MAX_VALUE;

    for(const seed of config.seeds) {
        const soil = lookupValue(config, 'seed-to-soil map', seed);
        const fertilizer = lookupValue(config, 'soil-to-fertilizer map', soil);
        const water = lookupValue(config, 'fertilizer-to-water map', fertilizer);
        const light = lookupValue(config, 'water-to-light map', water);
        const temperature = lookupValue(config, 'light-to-temperature map', light);
        const humidity = lookupValue(config, 'temperature-to-humidity map', temperature);
        const location = lookupValue(config, 'humidity-to-location map', humidity);

        console.log(`Seed ${seed}, soil ${soil}, fertilizer ${fertilizer}, water ${water}, light ${light}, temperature ${temperature}, humidity ${humidity}, location ${location}`);

        if (location < lowestLocation) {
            lowestLocation = location;
        }
    }

    console.log(`Lowest Location is ${lowestLocation}`);
};

const config = loadInformation("day-05/final-input.txt");

question1(config);