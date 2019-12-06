import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View, Image, 
    TextInput, Dimensions, RefreshControl,
    Alert } from 'react-native';
import Text from '../Components/Text'
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api.service';

class HomeScreen extends React.Component {

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
            this.setState({businessList: response.data});
            console.log(this.state.businessList);
        }).catch(error => {
            Alert.alert('Ops...', 'Ocorreu um erro ao atualizar a lista de negócios.');
        }).then(() => {
            this.setState({isRefreshing: false});
        });
    }

    render() {
        return (
            <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Restaurantes <Ionicons name="md-arrow-dropdown" size={24} color="#3f4855" /></Text>
                    <Image style={{width: 52, height: 52}} source={require('../assets/img/user.png')} />
                </View>
                <View style={styles.inputBuscaHolder}>
                    <TextInput style={styles.inputBusca} placeholder="Buscar por restaurantes, cupons ..." />
                    <Ionicons style={styles.inputBuscaIcon} name="md-arrow-round-forward" size={24} color="#808080" />
                </View>
                
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.loadBusinessList()} />}>
                    {
                        this.state.businessList.map((entry, key) => {
                            return (
                                <View style={styles.cardHolder}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.cardPoint}>
                                            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#5a68dc'}}>2</Text>
                                            <Text style={{color: '#5a68dc'}}>Pontos</Text>
                                        </View>
                                        <View style={styles.cardHeaderTitle}>
                                            <Text style={{fontSize: 22, color: '#3a3862', fontWeight: 'bold'}}>{entry.name}</Text>
                                            <Text style={{color: '#3a3862'}}>a 2km</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardFotosHolder}>
                                        <Image style={styles.cardFoto} source={require('../assets/img/rest-01.png')} />
                                        <Image style={styles.cardFoto} source={require('../assets/img/rest-02.png')} />
                                        <View> 
                                            <Image style={styles.cardFoto} source={require('../assets/img/rest-03.png')} />
                                        </View>
                                    </View>
                                    <View style={styles.cardFooter}>
                                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={{marginRight: 10, backgroundColor: '#5663fb', borderRadius: 12, width: 28, height: 28, display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                <Ionicons name="md-add" size={24} color="#FFF" style={{flex: 1}}></Ionicons>
                                            </View>
                                            <Text style={{color: '#5663fb'}}>Adicionar aos favoritos</Text>
                                        </View>
                                        <Ionicons name="md-arrow-forward" size={24} color="#5663fb"></Ionicons>
                                    </View>
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

export default HomeScreen;