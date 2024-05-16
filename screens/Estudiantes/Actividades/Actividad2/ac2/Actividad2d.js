import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Audio } from 'expo-av'; // Importa el módulo Audio de expo-av

const windowWidth = Dimensions.get('window').width;

const Emociones = () => {
    const [images, setImages] = useState([]);
    const [correctImageIndex, setCorrectImageIndex] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [attempts, setAttempts] = useState(1);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [sound, setSound] = useState(); // Estado para el sonido
    const navigation = useNavigation();

    // Cargar el sonido al principio
    useEffect(() => {
        (async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('../../../../../assets/Actividades/Sounds/Correcto.mp3') // Ruta del archivo de sonido
            );
            setSound(sound);

            // Liberar el sonido cuando el componente se desmonte
            return () => {
                sound.unloadAsync();
            };
        })();
    }, []);

    // Función para reproducir el sonido cuando la respuesta sea correcta
    const playCorrectSound = async () => {
        try {
            await sound.replayAsync(); // Reproduce el sonido
        } catch (error) {
            console.log('Error reproduciendo el sonido:', error);
        }
    };

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        const correctImagesFolder = require.context('../../../../../assets/Actividades/Emociones/Felicidad', false, /\.(jpg|jpeg|png)$/);
        const correctImagesArray = correctImagesFolder.keys().map(correctImagesFolder);

        const randomCorrectIndex = Math.floor(Math.random() * correctImagesArray.length);
        const correctImage = correctImagesArray[randomCorrectIndex];

        const incorrectImagesFolders = [
            require.context('../../../../../assets/Actividades/Emociones/Ira', false, /\.(jpg|jpeg|png)$/),
            require.context('../../../../../assets/Actividades/Emociones/Asustados', false, /\.(jpg|jpeg|png)$/),
        ];

        const incorrectImagesArray = incorrectImagesFolders.flatMap(folder =>
            folder.keys().map(folder)
        );

        const shuffledIncorrectImages = shuffleArray(incorrectImagesArray).slice(0, 2);

        const allImages = [...shuffledIncorrectImages];
        const randomIndex = Math.floor(Math.random() * (allImages.length + 1));
        allImages.splice(randomIndex, 0, correctImage);

        setImages(allImages);
        setCorrectImageIndex(randomIndex);
        setSelectedImageIndex(null);
        setGameOver(false);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleImagePress = (index) => {
        if (!gameOver) {
            setSelectedImageIndex(index);
            if (index === correctImageIndex) {
                setScore(score + 1);
                playCorrectSound(); // Llama a la función para reproducir el sonido
            }
            if (attempts < 10) {
                setAttempts(attempts + 1);
            } else {
                setGameOver(true);
            }
        }
    };

    const handleResetGame = () => {
        resetGame();
    };

    const navigateToActivities = () => {
        navigation.navigate('seleccionactividades');
    };

    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.homeButton} onPress={navigateToHome}>
                <Icon name="home" size={30} color="#007bff" />
            </TouchableOpacity>
            <Text style={styles.title}>¿Quién está Feliz?</Text>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Puntos: {score}</Text>
                {!gameOver && <Text style={styles.attemptsText}>Intentos: {attempts}/10</Text>}
            </View>
            <View style={styles.gridContainer}>
                {images.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.gridItem,
                            index === correctImageIndex && selectedImageIndex === index && styles.correctImage,
                            index !== correctImageIndex && selectedImageIndex === index && styles.incorrectImage,
                        ]}
                        onPress={() => handleImagePress(index)}
                        disabled={gameOver || selectedImageIndex !== null}
                    >
                        <Image source={image} style={styles.image} />
                    </TouchableOpacity>
                ))}
            </View>
            {selectedImageIndex !== null && (
                <Button
                    title="Iniciar Ronda"
                    onPress={handleResetGame}
                    disabled={gameOver || attempts >= 10} // Desactiva el botón si el juego ha terminado o si se han realizado 10 intentos
                />

            )}
            {gameOver && (
                <View style={styles.gameSummary}>
                    <Text style={styles.gameSummaryText}>Fin del juego</Text>
                    <Text style={styles.gameSummaryText}>Intentos: {attempts}</Text>
                    <Text style={styles.gameSummaryText}>Puntos: {score}</Text>
                    <Button title="Ir a Elección de Actividades" onPress={navigateToActivities} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scoreContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    scoreText: {
        fontSize: 18,
        marginBottom: 5,
    },
    attemptsText: {
        fontSize: 14,
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: windowWidth * 0.9,
    },
    gridItem: {
        width: '45%',  // Aumentado al 45% del contenedor
        aspectRatio: 1,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    image: {
        width: '100%',  // Aumentado al 100% del contenedor
        height: '100%', // Aumentado al 100% del contenedor
        resizeMode: 'contain',
    },
    correctImage: {
        borderColor: 'green',
    },
    incorrectImage: {
        borderColor: 'red',
    },
    gameSummary: {
        position: 'absolute',
        top: '25%',
        paddingHorizontal: 30,
        paddingVertical: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameSummaryText: {
        fontSize: 24,
        marginBottom: 20,
    },
    homeButton: {
        position: 'absolute',
        top: 10,
        left: 10,
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
});

export default Emociones;
