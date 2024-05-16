import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DetalleEstudiante({ route }) {
    const { estudiante } = route.params;
    const navigation = useNavigation();

    const handleGuia = () => {
        // Navegar a la pantalla de Guía
        navigation.navigate('MainActividades');
    };

    const handleRecomendaciones = () => {
        // Navegar a la pantalla de Recomendaciones
        navigation.navigate('RecomendacionE' , { estudiante });  ;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalle del Estudiante</Text>
            <Text style={styles.nombre}>{`${estudiante.nombre} ${estudiante.apellido}`}</Text>
            {/* Botones de Guía y Recomendaciones */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleGuia}>
                    <Image source={require('../../assets/Image/ImageEstu/rompecabezas.png')} style={styles.icono} />
                    <Text style={styles.buttonText}>Actividades</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleRecomendaciones}>
                    <Image source={require('../../assets/Image/Imagen_Elements/recomendacion.png')} style={styles.icono} />
                    <Text style={styles.buttonText}>Recomendaciones</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    nombre: {
        fontSize: 20,
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#525fe1',
        borderRadius: 30,
        paddingVertical: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icono: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
});
