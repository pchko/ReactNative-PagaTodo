import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import Banks from "../screens/Banks"

const Stack = createStackNavigator();

const BankStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Bank" component={Banks} options={{title: 'Bank'}}/>
        </Stack.Navigator>
    )
}

export default BankStack