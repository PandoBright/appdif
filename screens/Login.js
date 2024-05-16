import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { appFirebase } from '../credenciales';

const auth = getAuth(appFirebase);

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logueo = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Iniciaste sesión');
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <View style={styles.padre}>
            <View>
                <Image source={require('../assets/Image/Imagen_Elements/Profile_Login.png')} style={styles.profile} />
            </View>

            <View style={styles.tarjeta}>
                <View style={styles.cajatexto}>
                    <TextInput
                        placeholder="Email"
                        style={{ paddingHorizontal: 10 }}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>

                <View style={styles.cajatexto}>
                    <TextInput
                        placeholder="Password"
                        style={{ paddingHorizontal: 10 }}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>

                <View style={styles.padreboton}>
                    <TouchableOpacity style={styles.cajaboton} onPress={logueo}>
                        <Text style={styles.textoboton}>Ingresar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.padreboton}>
                    <TouchableOpacity style={styles.cajaboton} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.textoboton}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    padre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    profile: {
        width: 120,
        height: 120,
        borderRadius: 50,
        borderColor: 'white',
    },
    tarjeta: {
        margin: 15,
        borderColor: 'white',
        borderRadius: 15,
        width: '90%',
        padding: 20,
        shadowColor: '#cccc',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cajatexto: {
        paddingVertical: 15,
        backgroundColor: '#cccccc40',
        borderRadius: 30,
        marginVertical: 10,
    },
    padreboton: {
        alignItems: 'center',
    },
    cajaboton: {
        backgroundColor: '#525fe1',
        borderRadius: 30,
        paddingVertical: 20,
        width: 150,
        marginTop: 20,
    },
    textoboton: {
        textAlign: 'center',
        color: 'black',
    },
});
