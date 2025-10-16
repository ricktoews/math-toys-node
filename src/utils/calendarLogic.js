const yearTemplate = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
const leapTemplate = [0, 3, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const centuryOffsets = [0, 5, 3, 1];

const isLeap = year => {
    if (year < 1600) {
        return year % 4 === 0;
    } else {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
}


const calcJan = year => {
    const centuryNum = Math.floor(year / 100);
    const centuryOffsetNdx = centuryNum % 4;
    const centuryOffset = year >= 1583 ? centuryOffsets[centuryOffsetNdx] : 19 - centuryNum;

    let yearOffset, leapYears, jan;
    if (year !== 1582) {
        yearOffset = year % 100;
        leapYears = Math.floor(yearOffset / 4);
        jan = yearOffset + leapYears + centuryOffset;
        if (isLeap(year)) {
            jan += 6;
        }
    }
    // Make sure 0 <= jan < 7.
    jan = jan % 7;

    return jan;
}

const calc12DigitYear = year => {
    const jan = calcJan(year);
    let yearDigits = [];
    const template = isLeap(year) ? leapTemplate : yearTemplate;
    yearDigits = template.map(d => (d + jan) % 7);
    if (year === 1582) {
        yearDigits = [1, 4, 4, 0, 2, 5, 0, 3, 6, '[1/5]', 1, 3];
    }
    return yearDigits;
}

const century = c => {
    let year = (c - 1) * 100 + 1;
    let calendars = {};
    while (year <= c * 100) {
        calendars[year.toString()] = calc12DigitYear(year++).join('');
    }
    return calendars;
}

const generateMonthData = ({ year, janDigit, isLeap }) => {
    var template = isLeap ? leapTemplate : yearTemplate;
    var data = [];
    template.forEach((digit, monthNdx) => {
        let month = { year, month: monthNdx, days: monthDays[monthNdx], blanks: (digit + 1 * janDigit) % 7 };
        data.push(month);
    });
    if (isLeap) data[1].days = 29;

    return data;
}

const calendarLogic = {
    calc12DigitYear,
    century
};

module.exports = calendarLogic;
