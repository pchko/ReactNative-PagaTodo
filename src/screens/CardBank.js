import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const CardBank = (props) => {

    const {bank} = props;

    return (
        <View style={styles.shadow}>    
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    { <Image style={styles.logo} source={{uri: bank.url}} /> }
                </View>
                <View style={styles.bodyCardContainer}>
                    <View style={[styles.headerContent]}>
                        <Text style={styles.title}>{bank.bankName}</Text>
                    </View>
                    <View style={styles.bodyContent}>
                        <View>
                            <Text style={styles.titleBrand}>{bank.bankName}</Text>
                        </View>
                        <View style={styles.descriptionContent}>
                            <Text style={styles.description}> {bank.description} </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CardBank

const styles = StyleSheet.create({
    shadow:{
        marginVertical: 8,
        width: "100%",
        height: 109,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    card:{
        width: "92%",
        flexDirection: "row",
        height: 109,
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#666",
        //borderWidth: 1
    },
    imageContainer:{
        height: "100%",
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 10,
        shadowColor: "#666",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        elevation: 8
    },  
    logo:{
        width: 70,
        height: 60,
        resizeMode: "contain"
    },
    headerContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopRightRadius: 10,
        width: "100%",
        height: "30%",
        paddingHorizontal: 10,
        elevation: 4,
        backgroundColor: "red"
    },
    title:{
        color: "white",
        fontSize: 15,
        fontFamily:"OpenSansBold"
    },  
    iconFav:{
        borderLeftWidth: 1,
        borderLeftColor: "#fFF",
        paddingLeft: 10,
        paddingTop: 5,
        height: 30,
    },
    bodyContent:{
        backgroundColor: "white",
        height: "70%",
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 10,
        justifyContent: "space-evenly",
        width: "100%",
        borderBottomRightRadius: 10,
        elevation: 5
    },
    descriptionContent:{
        width: "100%"
    },
    description:{
        width: "100%",
        textAlign: "justify",
        color: "#201B55",
        fontSize: 14,
        fontFamily:"LatoRegular"
    },
    titleBrand:{
        color: "#201B55",
        fontSize: 14,
        fontFamily:"OpenSansBold"
    },
    bodyCardContainer:{
        width: "70%",
        height: "100%"
    }
})
