import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../credenciales';

export default function Mensaje({ route }) {
    const { estudiante } = route.params;
    const [mensaje, setMensaje] = useState('');
    const navigation = useNavigation();

    const guardarMensaje = async () => {
        try {
            // Verificar si el ID del usuario y del estudiante están presentes
            if (!estudiante || !estudiante.userId || !estudiante.id || !mensaje) {
                throw new Error('Estudiante o mensaje no definidos correctamente');
            }

            // Acceder a la colección de "mensaje" dentro del documento del estudiante
            const estudianteRef = doc(db, 'users', estudiante.userId, 'estudiantes', estudiante.id);
            const mensajesRef = collection(estudianteRef, 'mensaje');

            // Agregar un nuevo mensaje a la colección de "mensaje"
            await addDoc(mensajesRef, {
                mensaje: mensaje,
                fecha: new Date().toISOString() // Agregar la fecha actual si es necesario
            });

            Alert.alert('Mensaje Guardado', 'El mensaje se ha guardado exitosamente.');
        } catch (error) {
            console.error('Error al guardar el mensaje:', error);
            Alert.alert('Error', 'Hubo un error al guardar el mensaje. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Escribe tu mensaje aquí"
                multiline
                value={mensaje}
                onChangeText={setMensaje}
            />
            <Button title="Guardar Mensaje" onPress={guardarMensaje} />
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
    input: {
        width: '80%',
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
});
