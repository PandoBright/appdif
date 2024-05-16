import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const SeleccionarCarpeta = () => {
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

    const iniciarNuevaRonda = () => {
        const numeroAleatorio = Math.floor(Math.random() * 4);
        let carpeta;
        switch (numeroAleatorio) {
            case 0:
                carpeta = 'Ayudar';
                break;
            case 1:
                carpeta = 'Prestar';
                break;
            case 2:
                carpeta = 'Enseñar';
                break;
            case 3:
                carpeta = 'Jugar';
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
                case 'Ayudar':
                    imagenesFolder = require.context('../../../../assets/Actividades/Acciones/Ayudar', false, /\.(jpg|jpeg|png)$/);
                    break;
                case 'Enseñar':
                    imagenesFolder = require.context('../../../../assets/Actividades/Acciones/Enseñar', false, /\.(jpg|jpeg|png)$/);
                    break;
                case 'Prestar':
                    imagenesFolder = require.context('../../../../assets/Actividades/Acciones/Prestar', false, /\.(jpg|jpeg|png)$/);
                    break;
                case 'Jugar':
                    imagenesFolder = require.context('../../../../assets/Actividades/Acciones/Jugar', false, /\.(jpg|jpeg|png)$/);
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

    const verificarResultado = (emocionSeleccionada) => {
        const emocionCorrecta = {
            Ayudar: 'Ayudar',
            Prestar: 'Prestar',
            Enseñar: 'Enseñar',
            Jugar: 'Jugar',
        };

        if (emocionSeleccionada === emocionCorrecta[carpetaSeleccionada]) {
            setResultado('¡Correcto!');
            setAciertos(prevAciertos => prevAciertos + 1);
            playSound(); // Reproducir sonido correcto
        } else {
            setResultado('¡Incorrecto!');
        }
    };

    useEffect(() => {
        if (resultado !== '') {
            setTimeout(() => {
                setResultado('');
                if (ronda === 10) {
                    alert(`¡Juego terminado!\nAciertos: ${aciertos}`);
                } else {
                    setRonda(ronda + 1);
                    iniciarNuevaRonda();
                }
            }, 1000);
        }
    }, [resultado]);

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
            <Text style={styles.label}>Selecciona la acción correcta:</Text>
            <View style={styles.botonesContainer}>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => {
                        verificarResultado('Ayudar');
                    }}
                >
                    <Text style={styles.botonTexto}>Ayudar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => {
                        verificarResultado('Enseñar');
                    }}
                >
                    <Text style={styles.botonTexto}>Enseñar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.botonesContainer}>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => {
                        verificarResultado('Jugar');
                    }}
                >
                    <Text style={styles.botonTexto}>Jugar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => {
                        verificarResultado('Prestar');
                    }}
                >
                    <Text style={styles.botonTexto}>Prestar</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.resultado, resultado === '¡Correcto!' ? styles.correcto : resultado === '¡Incorrecto!' ? styles.incorrecto : null]}>
                {resultado}
            </Text>
            <Text style={styles.label}>Imagen seleccionada de la carpeta:</Text>
            {imagenSeleccionada && <Image source={imagenSeleccionada} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    boton: {
        backgroundColor: '#DDDDDD',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        width: 130, // Ancho fijo para los botones
    },
    botonTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    resultado: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    },
    correcto: {
        color: 'green', // Color verde para correcto
    },
    incorrecto: {
        color: 'red', // Color rojo para incorrecto
    },
});

export default SeleccionarCarpeta;
