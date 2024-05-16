import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { appFirebase, db } from '../credenciales';

const auth = getAuth(appFirebase);

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guardar información adicional del usuario en Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                name: name,
            });

            alert('Usuario registrado');
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
            setError('Error al registrar el usuario. Por favor, intente nuevamente.');
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
                        placeholder="Nombre"
                        style={{ paddingHorizontal: 10 }}
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                </View>

                <View style={styles.cajatexto}>
                    <TextInput
                        placeholder="Email"
                        style={{ paddingHorizontal: 10 }}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        keyboardType="email-address"
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

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={styles.padreboton}>
                    <TouchableOpacity style={styles.cajaboton} onPress={register}>
                        <Text style={styles.textoboton}>Registrarse</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.padreboton}>
                    <TouchableOpacity style={styles.cajaboton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.textoboton}>Ya tengo cuenta</Text>
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
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
