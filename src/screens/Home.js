import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, Linking } from 'react-native'

const Home = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.jpg')} />
            <Text style={styles.welcome}>Bienvenido</Text>
            <Text style={styles.description}>Aplicación de prueba de PagaTodo con conexión a API</Text>
            <Text style={styles.copyright}>
                Desarrollado por 
                <TouchableHighlight underlayColor="#FFF0" onPress={ () => Linking.openURL("https://github.com/pchko")}>
                    <Text style={styles.name}>Ing. Rogelio Pacheco</Text>
                </TouchableHighlight>
            </Text>
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
        paddingHorizontal: 30,
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center'
    },
    copyright:{
        position: "absolute",
        bottom: 15,
        textAlign: 'center',
        color: "black",
        fontSize: 18
    },
    name:{
        fontWeight: 'bold',
        color: "green"
    }
})
