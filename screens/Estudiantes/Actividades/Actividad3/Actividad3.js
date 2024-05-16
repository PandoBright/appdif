import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';

const Actividad1 = ({ navigation }) => {
    const [carpetaSeleccionada, setCarpetaSeleccionada] = useState(null);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [resultado, setResultado] = useState('');
    const [aciertos, setAciertos] = useState(0);
    const [ronda, setRonda] = useState(1);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        iniciarNuevaRonda();
        loadSound();
    }, []);

    useEffect(() => {
        if (resultado) {
            avanzarRonda();
        }
    }, [resultado]);

    const iniciarNuevaRonda = () => {
        const numeroAleatorio = Math.floor(Math.random() * 4);
        let carpeta;
        switch (numeroAleatorio) {
            case 0:
                carpeta = 'Bañarse';
                break;
            case 1:
                carpeta = 'Barrer';
                break;
            case 2:
                carpeta = 'Tarea';
                break;
            case 3:
                carpeta = 'Vestirse';
                break;
            default:
                carpeta = null;
                break;
        }
        setCarpetaSeleccionada(carpeta);
        setResultado('');
    };

    useEffect(() => {
        if (carpetaSeleccionada) {
            let imagenesFolder;
            switch (carpetaSeleccionada) {
                case 'Bañarse':
                    imagenesFolder = require.context('../../../../assets/Actividades/Diarias/Bañarse', false, /\.(jpg|jpeg|png)$/);
                    break;
                case 'Barrer':
                    imagenesFolder = require.context('../../../../assets/Actividades/Diarias/Barrer', false, /\.(jpg|jpeg|png)$/);
                    break;
                case 'Tarea':
                    imagenesFolder = require.context('../../../../assets/Actividades/Diarias/Tarea', false, /\.(jpg|jpeg|png)$/);
                    break;
                case 'Vestirse':
                    imagenesFolder = require.context('../../../../assets/Actividades/Diarias/Vestirse', false, /\.(jpg|jpeg|png)$/);
                    break;
                default:
                    imagenesFolder = null;
                    break;
            }

            if (imagenesFolder) {
                const imagenes = imagenesFolder.keys().map(imagenesFolder);
                const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
                setImagenSeleccionada(imagenAleatoria);
            }
        }
    }, [carpetaSeleccionada, ronda]);

    const verificarResultado = (actividadSeleccionada) => {
        const actividadCorrecta = {
            Bañarse: 'Bañarse',
            Barrer: 'Barrer',
            Tarea: 'Tarea',
            Vestirse: 'Vestirse',
        };

        if (actividadSeleccionada === actividadCorrecta[carpetaSeleccionada]) {
            setResultado('¡Correcto!');
            setAciertos(prevAciertos => prevAciertos + 1);
            playSound(); // Reproducir sonido correcto
        } else {
            setResultado('¡Incorrecto!');
        }
    };

    const avanzarRonda = () => {
        if (ronda === 10) {
            Alert.alert(
                '¡Juego terminado!',
                `Aciertos: ${aciertos}`,
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
        } else {
            setTimeout(() => {
                setRonda(ronda + 1);
                iniciarNuevaRonda();
            }, 1000); // Delay de 1000 milisegundos (1 segundo)
        }
    };

    const loadSound = async () => {
        const { sound: newSound } = await Audio.Sound.createAsync(
            require('../../../../assets/Actividades/Sounds/Correcto.mp3')
        );
        setSound(newSound);
    };

    const playSound = async () => {
        try {
            await sound.replayAsync();
        } catch (error) {
            console.log("Error al reproducir el sonido", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ronda: {ronda} / 10</Text>
            <Text style={styles.label}>Selecciona la actividad correcta:</Text>
            <View style={styles.botonesContainer}>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => {
                        verificarResultado('Bañarse');
                    }}
                >
                    <Text style={styles.botonTexto}>Bañarse</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => {
                        verificarResultado('Barrer');
                    }}
                >
                    <Text style={styles.botonTexto}>Barrer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => {
                        verificarResultado('Tarea');
                    }}
                >
                    <Text style={styles.botonTexto}>Tarea</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => {
                        verificarResultado('Vestirse');
                    }}
                >
                    <Text style={styles.botonTexto}>Vestirse</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.resultado, resultado === '¡Correcto!' ? styles.correcto : resultado === '¡Incorrecto!' ? styles.incorrecto : null]}>
                {resultado}
            </Text>
            {imagenSeleccionada && <Image source={imagenSeleccionada} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5', // Color de fondo gris claro
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333333', // Color de texto gris oscuro
    },
    botonesContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%', // Asegura que los botones se distribuyan en toda la pantalla
    },
    boton: {
        backgroundColor: '#007BFF', // Color de fondo azul
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 10, // Agrega un espacio entre los botones
        width: '48%', // Define el ancho de cada botón para distribuirlos uniformemente
    },
    botonTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF', // Color de texto blanco
    },
    resultado: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333333',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginTop: 20,
    },
    correcto: {
        color: 'green',
    },
    incorrecto: {
        color: 'red',
    },
});

export default Actividad1;
