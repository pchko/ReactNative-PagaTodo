import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeStack from './HomeStack'
import BankStack from './BankStack'

const Tab = createBottomTabNavigator();

const navigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} options={{title: "Home"}} />
            <Tab.Screen name="Bank" component={BankStack} options={{title: "Bank"}} />
        </Tab.Navigator>
    )
}

export default navigation
