import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';

const Actividad1 = ({ navigation }) => {
    const [carpetaSeleccionada, setCarpetaSeleccionada] = useState(null);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [correctoVisible, setCorrectoVisible] = useState(false);
    const [sound, setSound] = useState(null);
    const [rondasTotales, setRondasTotales] = useState(0);
    const [aciertosTotales, setAciertosTotales] = useState(0);
    const lottieRef = useRef(null);

    useEffect(() => {
        iniciarNuevaRonda();
        loadSound();
    }, []);

    const iniciarNuevaRonda = () => {
        if (rondasTotales < 10) {
            const numeroAleatorio = Math.floor(Math.random() * 6);
            let carpeta;
            switch (numeroAleatorio) {
                case 0:
                    carpeta = 'felices';
                    break;
                case 1:
                    carpeta = 'tristes';
                    break;
                case 2:
                    carpeta = 'enojados';
                    break;
                case 3:
                    carpeta = 'sorprendidos';
                    break;
                case 4:
                    carpeta = 'asustados';
                    break;
                case 5:
                    carpeta = 'ira';
                    break;
                default:
                    carpeta = null;
                    break;
            }
            setCarpetaSeleccionada(carpeta);
            setRondasTotales(rondasTotales + 1);
        } else {
            // Juego terminado, mostrar mensaje de aciertos totales
            Alert.alert('Juego Terminado', `Acertaste ${aciertosTotales} de 10 rondas.`);
        }
    };

    useEffect(() => {
        if (carpetaSeleccionada) {
            let imagenesFolder;
            switch (carpetaSeleccionada) {
                case 'felices':
                    imagenesFolder = require.context('../../../../assets/Actividades/Emociones/Felicidad', false, /\.(jpg|jpeg|png)$/);
                    break;
                case 'tristes':
                    imagenesFolder = require.context('../../../../assets/Actividades/Emociones/Tristeza', false, /\.(jpg|jpeg|png)$/);
                    break;
                case 'enojados':
                    imagenesFolder = require.context('../../../../assets/Actividades/Emociones/Enojo', false, /\.(jpg|jpeg|png)$/);
                    break;
                case 'sorprendidos':
                    imagenesFolder = require.context('../../../../assets/Actividades/Emociones/Sorprendidos', false, /\.(jpg|jpeg|png)$/);
                    break;
                case 'asustados':
                    imagenesFolder = require.context('../../../../assets/Actividades/Emociones/Asustados', false, /\.(jpg|jpeg|png)$/);
                    break;
                case 'ira':
                    imagenesFolder = require.context('../../../../assets/Actividades/Emociones/Ira', false, /\.(jpg|jpeg|png)$/);
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
    }, [carpetaSeleccionada]);

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

    const verificarEmocion = (emocion) => {
        let emocionCorrecta;
        switch (carpetaSeleccionada) {
            case 'felices':
                emocionCorrecta = 'Feliz';
                break;
            case 'tristes':
                emocionCorrecta = 'Triste';
                break;
            case 'enojados':
                emocionCorrecta = 'Enojado';
                break;
            case 'sorprendidos':
                emocionCorrecta = 'Sorprendido';
                break;
            case 'asustados':
                emocionCorrecta = 'Asustado';
                break;
            case 'ira':
                emocionCorrecta = 'Ira';
                break;
            default:
                emocionCorrecta = '';
                break;
        }

        if (emocion === emocionCorrecta) {
            setCorrectoVisible(true);
            setAciertosTotales(aciertosTotales + 1);
        } else {
            alert('¡Incorrecto! Intenta de nuevo.');
        }
    };

    useEffect(() => {
        if (correctoVisible) {
            lottieRef.current.play();
            playSound();
            setTimeout(() => {
                setCorrectoVisible(false);
                iniciarNuevaRonda();
            }, 2000);
        }
    }, [correctoVisible]);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Selecciona la Emocion Correcta</Text>
                    <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
                        <Icon name="home" size={30} color="#007bff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>
                    {imagenSeleccionada && <Image source={imagenSeleccionada} style={styles.image} />}
                    {correctoVisible && (
                        <LottieView
                            ref={lottieRef}
                            source={require('../../../../assets/Actividades/Animaciones/Correcto.json')}
                            style={{ position: 'absolute', top: '50%', left: '50%', width: 150, height: 150, marginTop: -75, marginLeft: -75 }}
                            autoPlay={false}
                            loop={false}
                        />
                    )}
                </View>

                <View style={styles.content}>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.textButton} onPress={() => verificarEmocion('Feliz')}>
                            <Text style={styles.buttonText}>Feliz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textButton} onPress={() => verificarEmocion('Triste')}>
                            <Text style={styles.buttonText}>Triste</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textButton} onPress={() => verificarEmocion('Enojado')}>
                            <Text style={styles.buttonText}>Enojado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textButton} onPress={() => verificarEmocion('Sorprendido')}>
                            <Text style={styles.buttonText}>Sorpresa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textButton} onPress={() => verificarEmocion('Asustado')}>
                            <Text style={styles.buttonText}>Asustado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textButton} onPress={() => verificarEmocion('Ira')}>
                            <Text style={styles.buttonText}>Ira</Text>
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
        paddingTop: 30,
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
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: '#e6e6e6',
        marginBottom: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: 200,
        height: 200,
    },
    content: {
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 30,
        width: '90%',
    },
    textButton: {
        alignItems: 'center',
        backgroundColor: '#e6f2ff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 25,
        width: '30%',
        marginVertical: 10,
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
        fontSize: 11,
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'center',
    },
});

export default Actividad1;
