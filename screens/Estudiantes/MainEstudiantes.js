import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Alert } from 'react-native';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../credenciales';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Estudiantes() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
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

    const handleCrearEstudiante = async () => {
        if (!nombre || !apellido) {
            // Si el nombre o el apellido están vacíos, mostrar una alerta
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        try {
            // Agregar el nuevo estudiante a la colección "estudiantes" en Firestore
            await addDoc(collection(db, 'users', userId, 'estudiantes'), {
                nombre,
                apellido,
            });

            // Limpiar los campos del formulario después de agregar el estudiante
            setNombre('');
            setApellido('');

            console.log('Estudiante creado exitosamente');
        } catch (error) {
            console.error('Error al crear el estudiante:', error);
        }
    };

    const handleSeleccionarEstudiante = (estudiante) => {
        // Navegar a la página DetalleEstudiante y pasar los datos del estudiante
        navigation.navigate('DetalleEstudiante', { estudiante });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSeleccionarEstudiante(item)}>
            <Text style={styles.itemText}>{`${item.nombre} ${item.apellido}`}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estudiantes</Text>
            {/* Formulario para crear un nuevo estudiante */}
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
            {/* Botón para crear un nuevo estudiante */}
            <TouchableOpacity style={styles.button} onPress={handleCrearEstudiante}>
                <Text style={styles.buttonText}>Crear Nuevo Estudiante</Text>
            </TouchableOpacity>
            {/* Lista de estudiantes */}
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
