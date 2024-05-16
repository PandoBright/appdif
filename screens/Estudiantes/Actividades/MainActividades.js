import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Actividades = ({ navigation }) => {
    // Función para manejar el onPress del botón de la actividad 2
    const onPressActividad2 = () => {
        // Generar un número aleatorio entre 0 y 4
        const numeroAleatorio = Math.floor(Math.random() * 5);

        // Array de opciones de actividades 2
        const opcionesActividad2 = ['a', 'b', 'c', 'd', 'e'];

        // Construir el nombre de la actividad basado en el número aleatorio
        const nombreActividad = `Actividad2${opcionesActividad2[numeroAleatorio]}`;

        // Navegar a la actividad correspondiente
        navigation.navigate(nombreActividad);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                {/* Título de la página y Botón Home */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Actividades</Text>
                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Icon name="home" size={30} color="#007bff" />
                    </TouchableOpacity>
                </View>

                {/* Contenido principal con botones */}
                <View style={styles.content}>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Actividad1')}>
                            <Icon name="running" size={40} color="#007bff" />
                            <Text style={styles.buttonText}>Actividad 1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={onPressActividad2}>
                            <Icon name="book" size={40} color="#007bff" />
                            <Text style={styles.buttonText}>Actividad 2</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Actividad3')}>
                            <Icon name="music" size={40} color="#007bff" />
                            <Text style={styles.buttonText}>Actividad 3</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Actividad4')}>
                            <Icon name="paint-brush" size={40} color="#007bff" />
                            <Text style={styles.buttonText}>Actividad 4</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 70,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
        width: '100%',
    },
    homeButton: {
        backgroundColor: '#e6f2ff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    headerText: {
        fontSize: 24,
        color: '#007bff',
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        width: '100%',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#e6f2ff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 25,
        width: '48%',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff',
        marginTop: 10,
    },
});

export default Actividades;
