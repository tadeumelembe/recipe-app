import {render} from '@testing-library/react-native'
import AuthHeader from '../../../../components/Auth/AuthHeader'

test('the component should render',()=>{
    render(<AuthHeader title='login' />)
})