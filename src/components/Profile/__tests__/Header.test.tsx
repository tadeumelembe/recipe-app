import { render, screen } from '@testing-library/react-native'

import HeaderProfile from '../Header'
import { useAuth } from '../../../contexts/authContext'

jest.mock('expo-router', () => ({
    useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}))

jest.mock('../../../contexts/authContext', () => ({
    useAuth: jest.fn(),
}))

const mockedUseAuth = useAuth as jest.Mock

function signedInAs(user: { id: string, name: string | null, email: string | null }) {
    mockedUseAuth.mockReturnValue({ user, isSigned: true, loading: false, signIn: jest.fn(), signOut: jest.fn() })
}

describe('HeaderProfile', () => {
    it('shows the signed-in name, email and initials', () => {
        signedInAs({ id: '1', name: 'Tadeu Melembe', email: 'tadeu@example.com' })

        render(<HeaderProfile headerHeight={190} />)

        expect(screen.getByText('Tadeu Melembe')).toBeOnTheScreen()
        expect(screen.getByText('tadeu@example.com')).toBeOnTheScreen()
        expect(screen.getByText('TM')).toBeOnTheScreen()
    })

    it('falls back to the email handle when the account has no display name', () => {
        signedInAs({ id: '1', name: null, email: 'tadeu@example.com' })

        render(<HeaderProfile headerHeight={190} />)

        expect(screen.getByText('tadeu')).toBeOnTheScreen()
        expect(screen.getByText('T')).toBeOnTheScreen()
    })
})
