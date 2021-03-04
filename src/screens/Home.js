import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, Linking } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

const Home = () => {

    const openLink = async () => {
        try {
          const url = 'https://github.com/pchko'
          if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.open(url, {
              // iOS Properties
              dismissButtonStyle: 'cancel',
              preferredBarTintColor: '#453AA4',
              preferredControlTintColor: 'white',
              readerMode: false,
              animated: true,
              modalPresentationStyle: 'fullScreen',
              modalTransitionStyle: 'coverVertical',
              modalEnabled: true,
              enableBarCollapsing: false,
              // Android Properties
              showTitle: true,
              toolbarColor: '#6200EE',
              secondaryToolbarColor: 'black',
              enableUrlBarHiding: true,
              enableDefaultShare: true,
              forceCloseOnRedirection: false,
              // Specify full animation resource identifier(package:anim/name)
              // or only resource name(in case of animation bundled with app).
              animations: {
                startEnter: 'slide_in_right',
                startExit: 'slide_out_left',
                endEnter: 'slide_in_left',
                endExit: 'slide_out_right'
              },
              headers: {
                'my-custom-header': 'my custom header value'
              }
            })

          }
          else Linking.openURL(url)
        } catch (error) {
          console.log({error});
        }
      }


    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.jpg')} />
            <Text style={styles.welcome}>Bienvenido</Text>
            <Text style={styles.description}>Aplicación de prueba de PagaTodo con conexión a API</Text>
            <TouchableHighlight style={styles.btn} underlayColor="#FFF0" onPress={ () => openLink()}>
                <Text style={styles.copyright}>
                    Desarrollado por 
                    
                    <Text style={styles.name}> Ing. Rogelio Pacheco</Text>
                </Text>
            </TouchableHighlight>
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
        
        color: "black",
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name:{
        fontSize: 18,
        fontWeight: 'bold',
        color: "green"
    },
    btn:{
        position: "absolute",
        bottom: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
