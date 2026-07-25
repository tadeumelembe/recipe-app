import { render, screen } from '@testing-library/react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import AuthHeader from '../../../../components/Auth/AuthHeader'

// AuthHeader calls useSafeAreaInsets(), so it needs a provider with metrics —
// without these the render throws "No safe area value available".
const initialMetrics = {
    frame: { width: 320, height: 640, x: 0, y: 0 },
    insets: { top: 20, left: 0, bottom: 20, right: 0 },
}

test('the component should render', () => {
    render(
        <SafeAreaProvider initialMetrics={initialMetrics}>
            <AuthHeader title='login' />
        </SafeAreaProvider>
    )

    expect(screen.getByText('login')).toBeOnTheScreen()
})
