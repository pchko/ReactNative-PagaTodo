import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeStack from './HomeStack'
import BankStack from './BankStack'

const Tab = createBottomTabNavigator();

const navigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Bank') {
                    iconName = 'store';
                }
    
                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
                },
            })}

            tabBarOptions={{
                activeTintColor: 'green',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeStack} options={{title: "Home"}} />
            <Tab.Screen name="Bank" component={BankStack} options={{title: "Bank"}} />
        </Tab.Navigator>
    )
}

export default navigation
