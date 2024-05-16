import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../credenciales';
import { getAuth } from 'firebase/auth';

export default function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid; // Obtener el ID del usuario actual
    const navigation = useNavigation();

    useEffect(() => {
        const obtenerEstudiantes = () => {
            const unsubscribe = onSnapshot(collection(db, 'users', userId, 'estudiantes'), (querySnapshot) => {
                const listaEstudiantes = [];
                querySnapshot.forEach((doc) => {
                    listaEstudiantes.push({ id: doc.id, ...doc.data() });
                });
                setEstudiantes(listaEstudiantes);
            });
            return unsubscribe;
        };
        const unsubscribe = obtenerEstudiantes();
        return () => unsubscribe();
    }, [userId]);

    const handleSeleccionarEstudiante = (estudiante) => {
        // Agregar el ID del usuario al objeto del estudiante
        const estudianteConUserId = { ...estudiante, userId: userId };
        navigation.navigate('Mensaje', { estudiante: estudianteConUserId });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSeleccionarEstudiante(item)}>
            <Text style={styles.itemText}>{`${item.nombre} ${item.apellido}`}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={estudiantes}
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
        backgroundColor: '#ccc',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
    },
    itemText: {
        fontSize: 18,
    },
});
