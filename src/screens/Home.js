import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Home = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.jpg')} />
            <Text style={styles.welcome}>Bienvenido</Text>
            <Text style={styles.description}>Aplicación de prueba de PagaTodo con conexión a API</Text>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 30
    },
    welcome:{
        marginTop: 10,
        fontSize: 23,
        color: "green",
        fontWeight: 'bold'
    },
    description:{
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center'
    }
})
