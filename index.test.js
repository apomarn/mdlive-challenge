const paginateApps = require('./paginate-apps')

describe('apps endpoint', () => {
    it('fails if the by query param is not sent', () => {
        var expected = ['The "by" query param is required']

        var result = paginateApps()

        expect(result).toEqual(expected)
    })

    it('fails if the by query param is not id or name', () => {
        var expected = ['The "by" query param only accepts "id" or "name"']

        var result = paginateApps('lastname')

        expect(result).toEqual(expected)
    })

    it('lists the first 50 apps when no start or end is sent', () => {
        var result = paginateApps('id')

        expect(result).toHaveLength(50)
    })

    it('limits the number of results using the max query param', () => {
        var result = paginateApps('id', null, null, 10)

        expect(result).toHaveLength(10)
    })

    describe('by id', () => {
        it('filters by the start query param', () => {
            var result = paginateApps('id', 10)

            var expected = [
                { "id": 10, "name": "ten" },
                { "id": 11, "name": "eleven" },
                { "id": 12, "name": "twelve" },
                { "id": 13, "name": "thirteen" },
                { "id": 14, "name": "fourteen" },
                { "id": 15, "name": "fifteen" },
                { "id": 16, "name": "sixteen" },
                { "id": 17, "name": "seventeen" },
                { "id": 18, "name": "eighteen" },
                { "id": 19, "name": "nineteen" },
                { "id": 20, "name": "twenty" },
                { "id": 21, "name": "twenty one" },
                { "id": 22, "name": "twenty two" },
                { "id": 23, "name": "twenty three" },
                { "id": 24, "name": "twenty four" },
                { "id": 25, "name": "twenty five" },
                { "id": 26, "name": "twenty six" },
                { "id": 27, "name": "twenty seven" },
                { "id": 28, "name": "twenty eight" },
                { "id": 29, "name": "twenty nine" },
                { "id": 30, "name": "thirty" },
                { "id": 31, "name": "thirty one" },
                { "id": 32, "name": "thirty two" },
                { "id": 33, "name": "thirty three" },
                { "id": 34, "name": "thirty four" },
                { "id": 35, "name": "thirty five" },
                { "id": 36, "name": "thirty six" },
                { "id": 37, "name": "thirty seven" },
                { "id": 38, "name": "thirty eight" },
                { "id": 39, "name": "thirty nine" },
                { "id": 40, "name": "forty" },
                { "id": 41, "name": "forty one" },
                { "id": 42, "name": "forty two" },
                { "id": 43, "name": "forty three" },
                { "id": 44, "name": "forty four" },
                { "id": 45, "name": "forty five" },
                { "id": 46, "name": "forty six" },
                { "id": 47, "name": "forty seven" },
                { "id": 48, "name": "forty eight" },
                { "id": 49, "name": "forty nine" },
                { "id": 50, "name": "fifty" },
                { "id": 51, "name": "fifty one" },
                { "id": 52, "name": "fifty two" },
                { "id": 53, "name": "fifty three" },
                { "id": 54, "name": "fifty four" },
                { "id": 55, "name": "fifty five" },
                { "id": 56, "name": "fifty six" },
                { "id": 57, "name": "fifty seven" },
                { "id": 58, "name": "fifty eight" },
                { "id": 59, "name": "fifty nine" }
            ]

            expect(result).toEqual(expected)
        })

        it('filters by the end query param', () => {
            var result = paginateApps('id', null, 5)

            var expected = [
                { "id": 1, "name": "one" },
                { "id": 2, "name": "two" },
                { "id": 3, "name": "three" },
                { "id": 4, "name": "four" },
                { "id": 5, "name": "five" },
            ]

            expect(result).toEqual(expected)
        })

        it('can limit by start and end query params', () => {
            var result = paginateApps('id', 10, 15)

            var expected = [
                { "id": 10, "name": "ten" },
                { "id": 11, "name": "eleven" },
                { "id": 12, "name": "twelve" },
                { "id": 13, "name": "thirteen" },
                { "id": 14, "name": "fourteen" },
                { "id": 15, "name": "fifteen" },
            ]

            expect(result).toEqual(expected)
        })

        it('uses max when gap is higher than max', () => {
            var result = paginateApps('id', 10, 80, 3)

            var expected = [
                { "id": 10, "name": "ten" },
                { "id": 11, "name": "eleven" },
                { "id": 12, "name": "twelve" },
            ]

            expect(result).toEqual(expected)
        })

        it('uses the gap when the max is higher than the gap', () => {
            var result = paginateApps('id', 40, 50, 30)

            var expected = [
                { "id": 40, "name": "forty" },
                { "id": 41, "name": "forty one" },
                { "id": 42, "name": "forty two" },
                { "id": 43, "name": "forty three" },
                { "id": 44, "name": "forty four" },
                { "id": 45, "name": "forty five" },
                { "id": 46, "name": "forty six" },
                { "id": 47, "name": "forty seven" },
                { "id": 48, "name": "forty eight" },
                { "id": 49, "name": "forty nine" },
                { "id": 50, "name": "fifty" }
            ]

            expect(result).toEqual(expected)
        })

        it('returns an empty array if the id is not found', () => {
            var result = paginateApps('name', 111, 1111, 30)

            var expected = []

            expect(result).toEqual(expected)
        })


        it('can sort the result by desc', () => {
            var result = paginateApps('id', 23, 27, null, 'desc')

            var expected = [
                { "id": 27, "name": "twenty seven" },
                { "id": 26, "name": "twenty six" },
                { "id": 25, "name": "twenty five" },
                { "id": 24, "name": "twenty four" },
                { "id": 23, "name": "twenty three" },
            ]

            expect(result).toEqual(expected)
        })

        it('can sort the result by asc', () => {
            var result = paginateApps('id', 23, 27, null, 'asc')

            var expected = [
                { "id": 23, "name": "twenty three" },
                { "id": 24, "name": "twenty four" },
                { "id": 25, "name": "twenty five" },
                { "id": 26, "name": "twenty six" },
                { "id": 27, "name": "twenty seven" },
            ]

            expect(result).toEqual(expected)
        })
    })

    describe('by name', () => {
        it('filters by the start query param', () => {
            var result = paginateApps('name', 'two')

            var expected = [
                { "id": 2, "name": "two" },
                { "id": 3, "name": "three" },
                { "id": 4, "name": "four" },
                { "id": 5, "name": "five" },
                { "id": 6, "name": "six" },
                { "id": 7, "name": "seven" },
                { "id": 8, "name": "eight" },
                { "id": 9, "name": "nine" },
                { "id": 10, "name": "ten" },
                { "id": 11, "name": "eleven" },
                { "id": 12, "name": "twelve" },
                { "id": 13, "name": "thirteen" },
                { "id": 14, "name": "fourteen" },
                { "id": 15, "name": "fifteen" },
                { "id": 16, "name": "sixteen" },
                { "id": 17, "name": "seventeen" },
                { "id": 18, "name": "eighteen" },
                { "id": 19, "name": "nineteen" },
                { "id": 20, "name": "twenty" },
                { "id": 21, "name": "twenty one" },
                { "id": 22, "name": "twenty two" },
                { "id": 23, "name": "twenty three" },
                { "id": 24, "name": "twenty four" },
                { "id": 25, "name": "twenty five" },
                { "id": 26, "name": "twenty six" },
                { "id": 27, "name": "twenty seven" },
                { "id": 28, "name": "twenty eight" },
                { "id": 29, "name": "twenty nine" },
                { "id": 30, "name": "thirty" },
                { "id": 31, "name": "thirty one" },
                { "id": 32, "name": "thirty two" },
                { "id": 33, "name": "thirty three" },
                { "id": 34, "name": "thirty four" },
                { "id": 35, "name": "thirty five" },
                { "id": 36, "name": "thirty six" },
                { "id": 37, "name": "thirty seven" },
                { "id": 38, "name": "thirty eight" },
                { "id": 39, "name": "thirty nine" },
                { "id": 40, "name": "forty" },
                { "id": 41, "name": "forty one" },
                { "id": 42, "name": "forty two" },
                { "id": 43, "name": "forty three" },
                { "id": 44, "name": "forty four" },
                { "id": 45, "name": "forty five" },
                { "id": 46, "name": "forty six" },
                { "id": 47, "name": "forty seven" },
                { "id": 48, "name": "forty eight" },
                { "id": 49, "name": "forty nine" },
                { "id": 50, "name": "fifty" },
                { "id": 51, "name": "fifty one" },
            ]

            expect(result).toEqual(expected)
        })

        it('filters by the end query param', () => {
            var result = paginateApps('name', null, 'three')

            var expected = [
                { "id": 1, "name": "one" },
                { "id": 2, "name": "two" },
                { "id": 3, "name": "three" }
            ]

            expect(result).toEqual(expected)
        })

        it('can limit by start and end query params', () => {
            var result = paginateApps('name', 'ten', 'fourteen')

            var expected = [
                { "id": 10, "name": "ten" },
                { "id": 11, "name": "eleven" },
                { "id": 12, "name": "twelve" },
                { "id": 13, "name": "thirteen" },
                { "id": 14, "name": "fourteen" }
            ]

            expect(result).toEqual(expected)
        })


        it('uses max when gap is higher than max', () => {
            var result = paginateApps('name', 'ten', 'eighty', 3)

            var expected = [
                { "id": 10, "name": "ten" },
                { "id": 11, "name": "eleven" },
                { "id": 12, "name": "twelve" },
            ]

            expect(result).toEqual(expected)
        })

        it('uses the gap when the max is higher than the gap', () => {
            var result = paginateApps('name', 'forty', 'fifty', 30)

            var expected = [
                { "id": 40, "name": "forty" },
                { "id": 41, "name": "forty one" },
                { "id": 42, "name": "forty two" },
                { "id": 43, "name": "forty three" },
                { "id": 44, "name": "forty four" },
                { "id": 45, "name": "forty five" },
                { "id": 46, "name": "forty six" },
                { "id": 47, "name": "forty seven" },
                { "id": 48, "name": "forty eight" },
                { "id": 49, "name": "forty nine" },
                { "id": 50, "name": "fifty" }
            ]

            expect(result).toEqual(expected)
        })

        it('returns an empty array if the name is not found', () => {
            var result = paginateApps('name', 'fortyy', 'fiftyy', 30)

            var expected = []

            expect(result).toEqual(expected)
        })

        it('can sort the result by desc', () => {
            var result = paginateApps('name', 'twenty three', 'twenty seven', null, 'desc')

            var expected = [
                { "id": 23, "name": "twenty three" },
                { "id": 26, "name": "twenty six" },
                { "id": 27, "name": "twenty seven" },
                { "id": 24, "name": "twenty four" },
                { "id": 25, "name": "twenty five" },
            ]

            expect(result).toEqual(expected)
        })

        it('can sort the result by asc', () => {
            var result = paginateApps('name', 'twenty three', 'twenty seven', null, 'asc')

            var expected = [
                { "id": 25, "name": "twenty five" },
                { "id": 24, "name": "twenty four" },
                { "id": 27, "name": "twenty seven" },
                { "id": 26, "name": "twenty six" },
                { "id": 23, "name": "twenty three" },
            ]

            expect(result).toEqual(expected)
        })
    })
})