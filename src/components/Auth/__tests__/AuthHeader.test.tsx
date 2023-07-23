import React, { useRef } from 'react'
import { render, act } from '@testing-library/react-native'
import AuthHeader from '../AuthHeader'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import mockSafeAreaContext from '../../../utils/safeAreaViewMock'
import { Animated, DeviceEventEmitter, Keyboard } from 'react-native'
describe('AuthHeader', () => {

    describe('Auth header is shown', () => {
        const initialMetrics = {
            frame: {
                width: 320,
                height: 640,
                x: 0,
                y: 0,
            },
            insets: {
                top: 20,
                left: 0,
                bottom: 20,
                right: 0
            }
        }
        it('should  show Page Title', () => {

            const { getByText } = render(<SafeAreaProvider initialMetrics={initialMetrics}><AuthHeader title='login' /></SafeAreaProvider>)

            const element = getByText('login');

            expect(element).toBeTruthy();
        });

        it('should render backgorund image', () => {
            const { getByTestId } = render(<SafeAreaProvider initialMetrics={initialMetrics}><AuthHeader title='login' /></SafeAreaProvider>)
            act(() => {
                DeviceEventEmitter.emit('keyboardDidShow');
            });
            act(() => {
                DeviceEventEmitter.emit('keyboardDidHide');
            });
            expect(getByTestId('background-image')).toBeTruthy();
        })

    })
})
