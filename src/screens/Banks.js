import React, {useState, useEffect} from 'react'
import { StyleSheet, ActivityIndicator, View, TextInput, ScrollView, Text } from 'react-native'
import { ApiClient } from '../services/ApiClient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/Octicons';
import CardBank from './CardBank'

const Banks = () => {

    const [loading, setLoading] = useState(true);
    const [emptyInput, setEmptyInput] = useState(true);
    const [textInput, setTextInput] = useState('');
    const [banks, setBanks] = useState([]);
    const [initialBanks, setInitialBanks] = useState([]);

    useEffect(() => {

        const init = async () => {
            
            let resp = await ApiClient.getBanks().catch( (err) => {
                console.log({err});
                let arr = [{"age": 10, "bankName": "Paga Todo", "description": "Banco Paga Todo es Para Todos", "url": "https://public-liarla.s3.us-east-2.amazonaws.com/ico_pagatodo.png"}, {"age": 10, "bankName": "BBVA Bancomer", "description": "BBVA Bancomer Creando Oportunidades", "url": "https://public-liarla.s3.us-east-2.amazonaws.com/ico_bancomer.png"}, {"age": 10, "bankName": "Banamex", "description": "Banamex lo mejor de México", "url": "https://public-liarla.s3.us-east-2.amazonaws.com/ico_banamex.png"}, {"age": 10, "bankName": "Santander", "description": "Santander sé parte de la banca digital", "url": "https://public-liarla.s3.us-east-2.amazonaws.com/ico_santander.png"}, {"age": 10, "bankName": "Scotiabank", "description": "Scotiabank el Banco de Nueva Escocia", "url": "https://public-liarla.s3.us-east-2.amazonaws.com/ico_scotiabank.png"}]
                setBanks(arr);
                setInitialBanks(arr);
                setLoading(false);
            });

            if(resp){
                setBanks(resp);
                setInitialBanks(resp);
                setLoading(false);
            }
        }
        
        init();
    }, []);

    const findBanks = async (text) => {

        setEmptyInput(false);
        setTextInput(text);
        setLoading(true);
    
        if(text === ''){
            setBanks(initialBanks);
        }else{
    
            const results = await initialBanks.filter((bank) => {
    
                let regex = RegExp(text, "i");
                return regex.test(bank.bankName);
            });
        
            setBanks(results);
        }   
    
        setLoading(false);
    }

    const hideIcon = () => {
        setEmptyInput(false);
    };
    
    const showIcon = () => {
        if(textInput === ''){
            setEmptyInput(true)
        }else{
            setEmptyInput(false)
        }
    }

    const clearInput = () => {
        setTextInput('');
        setBanks(initialBanks);
    }

    return (
        <View style={[styles.container]}>
            <View style={styles.containerInput}>
                { emptyInput && <Icon name={'search'} size={30} color="#e4e4e4" style={[styles.iconSearch]} /> }
                { !emptyInput && <IconAwesome style={styles.iconClose} name="x" size={15} color="#707070EE" onPress={ () => clearInput() } /> }
                <TextInput
                    style={styles.searchButton}
                    autoCorrect={false}
                    onChange={ (e) => {
                        findBanks(e.nativeEvent.text);
                    }}
                    clearButtonMode="always"

                    onFocus={ () => {
                        hideIcon()
                    }}

                    onBlur={ () => {
                        showIcon()
                    }}

                    value={textInput}
                />
            </View>
            <View style={[styles.containerBanks]} onPress={ () => showIcon() }>
                    {
                        !loading ? (
                            <ScrollView style={styles.scrollView} alwaysBounceVertical={true} showsVerticalScrollIndicator={true}>
                                { banks.length > 0 ?
                                    banks.map((bank, index) => {
                                        return <CardBank key={index} bank={bank} />;
                                    })
                                :
                                    
                                    <Text style={{textAlign: 'center'}}>Sin resultados</Text>
                                    
                                }
                            </ScrollView>
                        ):
                            
                            <ActivityIndicator style={styles.loader} animating={true} size="large" color="#707070" />
                    }
                
            </View>
        </View>
    )
}

export default Banks

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "#FCFBFE"
    },
    textEmpty:{
        fontSize: 15,
        fontFamily: 'OpenSansRegular',
        textAlign: 'center',
        lineHeight: 19,
        color: "#707070",
        marginTop: 17
    },
    textEmpty1:{
        fontSize: 15,
        fontFamily: 'OpenSansRegular',
        textAlign: 'center',
        lineHeight: 19,
        color: "#707070"
    },
    containerInput: {
        width: "100%",
        height: 75,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10,
        color: "gray",
        borderWidth: 0
    },
    searchButton: {
        width: "92%",
        justifyContent: "center",
        height: 40,
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 35,
        borderRadius: 10,
        shadowRadius: 20,
        elevation: 4,
        fontFamily: "OpenSansLight",
        color: "#707070",
    },
    containerBank:{
        backgroundColor: "#FCFBFE"
    },
    scrollView:{
        height: "100%",
        backgroundColor: "#FCFBFE"
    },
    loader:{
        alignSelf: "center",
        marginVertical: 200
    },
    iconSearch:{
        position: "absolute",
        top: 16,
        left: 30,
        elevation:10
    },
    iconClose:{
        position: "absolute",
        top: 23,
        right: 30,
        elevation:5,
        zIndex: 30
    },
    textNotFound:{
        fontSize: 14,
        fontFamily: "OpenSansLight",
        textAlign: "center"
    }
})
