import React, {Component, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TextInput} from 'react-native';
import Button from '../components/Button';
import { connect } from 'react-redux';
import {loginFunction, logoutFunction} from '../actions/loginActions';


const Home = ({ navigation, loginFunction, loginReducer, logoutFunction }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedLabelInfo, setIsLoggedLabelInfo] = useState('');

    return(
        <View navigation={navigation} style={styles.container}>
            <Text style={styles.title}>Gradebook</Text>
            <View style={styles.loginArea}>
                {loginReducer.isLoading && <ActivityIndicator/>}
                <TextInput style={styles.textInput} placeholder={'Login'} autoCapitalize = 'none' onChangeText={text=> setLogin(text)}/>
                <TextInput style={styles.textInput} placeholder={'Password'} autoCapitalize= 'none' secureTextEntry={true} onChangeText={text=>setPassword(text)}/>
                <Button disabled={login==='' || password ===''} text={'Login'} isButtonDark={true} onPress={()=>{
                    loginFunction(login, password,()=>{navigation.navigate('AnotherDetails')})}
                }
                />
            </View>
            {loginReducer.loginFailed && <Text>{'Login or password incorrect!'}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems: 'center'
    },
    textInput:{
        borderWidth: 1,
        borderRadius:10,
        backgroundColor: '#dadada',
        width:'90%',
        height: 35,
        fontFamily: 'Futura',
    },
    loginArea:{
        width:'90%',
        borderWidth:1,
        borderRadius: 12,
        flexDirection : 'column',
        justifyContent:'space-around',
        alignItems: 'center',
        height: '30%',
        marginTop:30,
        marginBottom:30,
    },
    title:{
        fontSize: 30,
        fontFamily: 'Futura',
        textAlign: 'center',
        marginTop: '-40%',
    }
})


const mapStateToProps = ({ loginReducer}) => {
    return { loginReducer };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginFunction: (login, password, successCallback) => dispatch(loginFunction(login, password, successCallback)),
        logoutFunction: () => dispatch(logoutFunction())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
