import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import HomeStack from './HomeStack'
import BankStack from './BankStack'

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeStack} options={{title: "Home"}} />
            <Drawer.Screen name="Bank" component={BankStack} options={{title: "Bank"}} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation
