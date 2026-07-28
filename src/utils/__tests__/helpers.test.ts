import { formatRelativeTime, getInitials } from '../helpers'

describe('getInitials', () => {
    it('takes the first and last word', () => {
        expect(getInitials('Tadeu Melembe')).toBe('TM')
        expect(getInitials('Ana Maria Costa')).toBe('AC')
    })

    it('takes a single letter for a single word', () => {
        expect(getInitials('Itan')).toBe('I')
    })

    it('uppercases and ignores stray whitespace', () => {
        expect(getInitials('  nick   evans ')).toBe('NE')
    })

    it('returns an empty string when there is no name', () => {
        expect(getInitials(undefined)).toBe('')
        expect(getInitials(null)).toBe('')
        expect(getInitials('   ')).toBe('')
    })
})

describe('formatRelativeTime', () => {
    const now = new Date('2026-01-01T12:00:00.000Z')

    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(now)
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('buckets seconds as "just now"', () => {
        expect(formatRelativeTime(new Date(now.getTime() - 30 * 1000).toISOString())).toBe('just now')
    })

    it('buckets minutes', () => {
        expect(formatRelativeTime(new Date(now.getTime() - 5 * 60 * 1000).toISOString())).toBe('5min ago')
    })

    it('buckets hours', () => {
        expect(formatRelativeTime(new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString())).toBe('3h ago')
    })

    it('buckets days, pluralizing when more than one', () => {
        expect(formatRelativeTime(new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString())).toBe('1day ago')
        expect(formatRelativeTime(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString())).toBe('2days ago')
    })
})
