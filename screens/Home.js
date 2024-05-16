import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import appFirebase from '../credenciales';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../credenciales';

export default function Home({ navigation }) {
        const [username, setUsername] = useState('');

        useEffect(() => {
                const auth = getAuth(appFirebase);
                const user = auth.currentUser;
                if (user) {
                        // Recuperar el nombre de usuario de Firestore
                        const getUserData = async () => {
                                const docRef = doc(collection(db, 'users'), user.uid);
                                const docSnap = await getDoc(docRef);
                                if (docSnap.exists()) {
                                        setUsername(docSnap.data().name);
                                }
                        };
                        getUserData();
                }
        }, []);

        return (
                <View style={styles.container}>
                        <Text style={styles.welcomeText}>¡Bienvenido!</Text>
                        <Text style={styles.usernameText}>Usuario: {username}</Text>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('maintutores')}>
                                <Text style={styles.buttonText}>Tutores</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainEstudiantes')}>
                                <Text style={styles.buttonText}>Estudiantes</Text>
                        </TouchableOpacity>
                </View>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
        },
        welcomeText: {
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center',
        },
        usernameText: {
                fontSize: 18,
                textAlign: 'center',
                marginBottom: 20,
        },
        button: {
                backgroundColor: '#525fe1',
                borderRadius: 30,
                paddingVertical: 20,
                width: 200,
                alignItems: 'center',
                marginBottom: 20,
        },
        buttonText: {
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
        },
});
