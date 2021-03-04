import React, {useState, useEffect} from 'react'
import { StyleSheet, ActivityIndicator, View, TextInput, ScrollView, Text } from 'react-native'
import { ApiClient } from '../services/ApiClient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/Octicons';
import CardBank from './CardBank'
import { openDatabase } from 'react-native-sqlite-storage';


const Banks = () => {

    const [loading, setLoading] = useState(true);
    const [emptyInput, setEmptyInput] = useState(true);
    const [textInput, setTextInput] = useState('');
    const [banks, setBanks] = useState([]);
    const [initialBanks, setInitialBanks] = useState([]);
    const db = openDatabase({ name: 'Banks.db' });

    useEffect(() => {

        const connectAPI = () =>{
            console.log("Consumo API");
            return new Promise(async (resolve, reject) => {

                let resp = await ApiClient.getBanks().catch( (errAPI) => {
                    console.log({errAPI});
                    resolve([]);
                });
                resolve(resp);
            })

        }

        const fillDatabase = (arr) => {

            return new Promise((resolve, reject) => {
                if(arr.length > 0){
                    arr.forEach((bank, index) => {
                        db.transaction(function(transaction) {
                            transaction.executeSql('INSERT INTO bank (bankName, description, age, url) VALUES (?,?,?,?)', [bank.bankName, bank.description, bank.age, bank.url], (success) => {
                                console.log({success});
                            });
                        });
                    });

                    resolve(true);
                }
            })
        }

        const init = async () => {
                        
            //Creación de tabla bank para almacenar la información obtenida desde el API
            db.transaction(function (txn) {
                txn.executeSql(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='bank'",
                    [],
                    function (tx, res) {
                        if (res.rows.length == 0) {
                            txn.executeSql('DROP TABLE IF EXISTS bank', []);
                            txn.executeSql(
                                'CREATE TABLE IF NOT EXISTS bank(idBank INTEGER PRIMARY KEY AUTOINCREMENT, bankName VARCHAR(20), description VARCHAR(20), age INT(3), url VARCHAR(255))',
                                [],
                                async (transaction, resCreate) => {
                                    console.log({resCreate});
                                    let arr = await connectAPI();
                                    let fill = await fillDatabase(arr);
                                    setBanks(arr);
                                    setInitialBanks(arr);
                                    setLoading(false);
                                }
                            );
                        }else{
                            txn.executeSql('SELECT * FROM bank', [], async (tx, resSelect) => {
                                console.log({resSelect});
                                if(resSelect.rows.length === 0){
                                    let arr = await connectAPI();
                                    let fill = await fillDatabase(arr);

                                    setBanks(arr);
                                    setInitialBanks(arr);
                                    setLoading(false);
                                }else{
                                    
                                    let auxBank = [];
                                    for (let index = 0; index < resSelect.rows.length; index++) {
                                        auxBank.push(resSelect.rows.item(index));
                                    }
                                    setBanks(auxBank);
                                    setInitialBanks(auxBank);
                                    setLoading(false);
                                }
                            });                            
                        }
                    }
                );
            }, function(error) {
                console.log('Transaction ERROR: ' + error.message);
            }, function() {
                console.log('Process complete');
            });

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
                <Icon name={'search'} size={30} color="#e4e4e4" style={[styles.iconSearch]} />
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

                    placeholder="Filtrar resultados"
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
        paddingLeft: 45,
        paddingRight: 35,
        borderRadius: 10,
        shadowRadius: 20,
        elevation: 4,
        fontFamily: "OpenSansLight",
        color: "#707070",
        marginTop: 15
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
        top: 31,
        left: 30,
        elevation:10
    },
    iconClose:{
        position: "absolute",
        top: 38,
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
