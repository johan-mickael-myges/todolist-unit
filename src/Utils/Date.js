module.exports = class Date {
    static diff(date1, date2, unit = 'minute') {
        let diff = Math.abs(date2 - date1);

        switch(unit) {
            case 'minute':
                return Number.parseInt(diff / (1000 * 60));
            default:
                throw new Error('Invalid unit. Use minute.')
        }
    }
};