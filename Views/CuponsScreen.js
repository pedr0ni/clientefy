import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, View, Image, 
    TextInput, Dimensions, RefreshControl,
    Alert } from 'react-native';
import Text from '../Components/Text'
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api.service';

class CuponsScreen extends React.Component {

    state = {
        isRefreshing: false,
        businessList: []
    };

    componentWillMount() {
        this.loadBusinessList();
    }

    loadBusinessList() {
        this.setState({isRefreshing: true});
        ApiService.get('Store').then(response => {
            let stores = response.data;
            for (let i = 0; i < stores.length; i++) {
                stores[i].code.map(entry => {
                    entry.storeName = stores[i].name;
                    entry.votos = 0;
                    return entry;
                });
                this.state.businessList.push(...stores[i].code);
            }
            console.log(this.state.businessList);
        }).catch(error => {
            Alert.alert('Ops...', 'Ocorreu um erro ao atualizar a lista de negócios.');
        }).then(() => {
            this.setState({isRefreshing: false});
        });
    }

    _click(entry) {
        entry.votos ++;
        console.log(entry);
        this.setState({businessList: this.state.businessList});
    }

    render() {
        return (
            <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Cupons</Text>
                    <Image style={{width: 52, height: 52}} source={require('../assets/img/user.png')} />
                </View>
                
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.loadBusinessList()} />}>
                    {
                        this.state.businessList.map((entry, key) => {
                            return (
                                <View style={styles.cardHolder}>
                                    <TouchableOpacity style={styles.cardHeader} onPress={() => {this._click(entry)}}>
                                        <View style={styles.cardPoint}>
                                            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#5a68dc'}}>{entry.votos}</Text>
                                            <Text style={{color: '#5a68dc'}}>Votos</Text>
                                        </View>
                                        <View style={styles.cardHeaderTitle}>
                                            <Text style={{fontSize: 22, color: '#3a3862', fontWeight: 'bold'}}>{entry.key}</Text>
                                            <Text style={{color: '#3a3862'}}>{entry.storeName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            </>
        );
    }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    title: {
        color: '#3f4855',
        fontFamily: 'MontserratBold',
        fontSize: 24
    },
    container: {
        paddingTop: 60,
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputBuscaHolder: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#FFF',
        fontSize: 18,
        marginTop: 20,
        paddingLeft: 10,
        paddingTop: 12,
        paddingBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        zIndex: 1,
        elevation: 6,
    },
    inputBuscaIcon: {
        position: 'absolute',
        right: 10,
        zIndex: 2
    },
    inputBusca: {
        flex: 1
    },
    cardHolder: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginTop: 30,
        padding: 20
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row'
    },
    cardPoint: {
        backgroundColor: '#e9ebfc',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        width: 60,
        height: 60
    },
    cardHeaderTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 8
    },
    cardFotosHolder: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 20,
        borderBottomColor: '#CCC',
        borderBottomWidth: 1
    },
    cardFoto: {
        width: win.width / 3 - 30,
        marginRight: 10,
        height: 124
    },
    cardFooter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    }
})

export default CuponsScreen;