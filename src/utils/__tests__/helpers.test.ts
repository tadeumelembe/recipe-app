import { getInitials } from '../helpers'

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
