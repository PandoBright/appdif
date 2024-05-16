import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../credenciales';
import { getAuth } from 'firebase/auth';

export default function MensajesEstudiante({ route }) {
    const { estudiante } = route.params;
    const [mensajes, setMensajes] = useState([]);
    const navigation = useNavigation();
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid; // Obtener el ID del usuario actual

    useEffect(() => {
        const obtenerMensajes = () => {
            const unsubscribe = onSnapshot(collection(doc(db, 'users', userId, 'estudiantes', estudiante.id), 'mensaje'), (querySnapshot) => {
                const listaMensajes = [];
                querySnapshot.forEach((doc) => {
                    listaMensajes.push({ id: doc.id, ...doc.data() });
                });
                setMensajes(listaMensajes);
            });
            return unsubscribe;
        };
        const unsubscribe = obtenerMensajes();
        return () => unsubscribe();
    }, [userId, estudiante]);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.mensaje}</Text>
            <Text style={styles.itemDate}>{item.fecha}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={mensajes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
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
    list: {
        width: '80%',
    },
    item: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
    },
    itemText: {
        fontSize: 18,
    },
    itemDate: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
});
