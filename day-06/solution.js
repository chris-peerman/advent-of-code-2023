// This could probably be solved using a polynomial equation which ti-i^2=r, e.g. 62i - i^2=553, 7i-i^2=9
const calculateWins = (raceTime, recordDistance) => {
    let wins = 0;
    for(var i=1; i<raceTime; i++) {
        if ((i * (raceTime - i)) > recordDistance) {
            wins++;
        }
    }
    return wins;
};

console.log(calculateWins(62, 553) * calculateWins(64, 1010) * calculateWins(91, 1473) * calculateWins(90, 1074));
console.log(calculateWins(62649190, 553101014731074));