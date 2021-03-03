import React from 'react'
import {Text} from 'react-native'
import {createStackNavigator} from "@react-navigation/stack"
import Home from "../screens/Home"
import Banks from "../screens/Banks"

const Stack = createStackNavigator();

const HomeStack = (props) => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
            <Stack.Screen name="Banks" component={Banks} options={{title: 'Banks'}}/>
        </Stack.Navigator>
    )
}

export default HomeStack