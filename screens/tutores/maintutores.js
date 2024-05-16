import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Alert } from 'react-native';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../credenciales';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Tutores() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tutores, setTutores] = useState([]);

    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid; // Obtener el ID del usuario actual

    const navigation = useNavigation();

    useEffect(() => {
        const obtenerTutores = () => {
            const unsubscribe = onSnapshot(collection(db, 'users', userId, 'tutores'), (querySnapshot) => {
                const listaTutores = [];
                querySnapshot.forEach((doc) => {
                    listaTutores.push({ id: doc.id, ...doc.data() });
                });
                setTutores(listaTutores);
            });
            return unsubscribe;
        };
        const unsubscribe = obtenerTutores();
        return () => unsubscribe();
    }, [userId]);

    const handleCrearTutor = async () => {
        if (!nombre || !apellido) {
            // Si el nombre o el apellido están vacíos, mostrar una alerta
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        try {
            // Agregar el nuevo tutor a la colección "tutores" en Firestore
            await addDoc(collection(db, 'users', userId, 'tutores'), {
                nombre,
                apellido,
            });

            // Limpiar los campos del formulario después de agregar el tutor
            setNombre('');
            setApellido('');

            console.log('Tutor creado exitosamente');
        } catch (error) {
            console.error('Error al crear el tutor:', error);
        }
    };

    const handleSeleccionarTutor = (tutor) => {
        // Navegar a la página DetalleTutor y pasar los datos del tutor
        navigation.navigate('DetalleTutor', { tutor });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSeleccionarTutor(item)}>
            <Text style={styles.itemText}>{`${item.nombre} ${item.apellido}`}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tutores</Text>
            {/* Formulario para crear un nuevo tutor */}
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={apellido}
                onChangeText={setApellido}
            />
            {/* Botón para crear un nuevo tutor */}
            <TouchableOpacity style={styles.button} onPress={handleCrearTutor}>
                <Text style={styles.buttonText}>Crear Nuevo Tutor</Text>
            </TouchableOpacity>
            {/* Lista de tutores */}
            <FlatList
                data={tutores}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#525fe1',
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
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
