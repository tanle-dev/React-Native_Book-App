import { useFocusEffect, useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const App = () => {
    const router = useRouter()

    useFocusEffect(() => {
        router.replace('home')
    })

    return (
        <View>
            <Text>Loading...</Text>
        </View>
    )
}

export default App
