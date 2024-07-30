
import { Stack } from 'expo-router/stack'

export default function StackLayout() {
    Stack.defaultProps = {
        initialRouteName: 'index',
        screenOptions: {
            headerShown: false,
        },
    }

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false, title: 'Book List' }}
            />
            <Stack.Screen
                name="detail"
                options={{
                    headerShown: false,
                    title: 'Book Detail',
                    headerStyle: { backgroundColor: '#323232' },
                    headerTintColor: 'white',
                }}
            />
        </Stack>
    )
}
