const DateUtil = require('../../Utils/Date');

describe('Diff two dates', () => {
    test.each([
        [(new Date()).setMinutes(10), (new Date()).setMinutes(2), 8],
        [(new Date()).setMinutes(50), (new Date()).setMinutes(50), 0],
        [(new Date()).setHours(2), (new Date()).setHours(0), 120]
    ])('It can diff two dates by minutes', (date1, date2, expected) => {
        let minuteDiff = DateUtil.diff(date1, date2);

        expect(minuteDiff).toBe(expected);
    });

    test('It throws exception if providing wrong units', () => {
        expect(() => DateUtil.diff(new Date(), new Date(), 'invalidUnit')).toThrowError();
    });
});