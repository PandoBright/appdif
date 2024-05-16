import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const GuiaPage = () => {
    // Función para abrir un enlace a un video de YouTube
    const abrirVideo = (youtubeLink) => {
        // Abrir el enlace en el navegador o en la aplicación de YouTube si está instalada
        Linking.openURL(youtubeLink);
    };

    return (
        <ScrollView>
            {/* Section 1: Activity 1 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Actividad 1</Text>
                {/* Nueva sección con imagen para Activity 1 */}
                <View style={styles.imageSection}>
                    <Image
                        source={require('../../assets/Image/Imagen_Guia/2.png')}
                        style={styles.image}
                    />
                </View>
                {/* Image for Activity 1 */}
                <Image
                    source={require('../../assets/Image/Imagen_Guia/Guia1.jpeg')}
                    style={styles.image}
                />
                {/* Button for Activity 1 */}
                <TouchableOpacity style={styles.button} onPress={() => abrirVideo('https://youtube.com/shorts/S0pjkXUYX2k')}>
                    <Text style={styles.buttonText}>Ver video</Text>
                </TouchableOpacity>
            </View>

            {/* Section 2: Activity 2 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Actividad 2</Text>
                {/* Nueva sección con imagen para Activity 2 */}
                <View style={styles.imageSection}>
                    <Image
                        source={require('../../assets/Image/Imagen_Guia/4.png')}
                        style={styles.image}
                    />
                </View>
                {/* Image for Activity 2 */}
                <Image
                    source={require('../../assets/Image/Imagen_Guia/Guia2.jpeg')}
                    style={styles.image}
                />
                {/* Button for Activity 2 */}
                <TouchableOpacity style={styles.button} onPress={() => abrirVideo('https://youtube.com/shorts/VKN2Y6XEjnk')}>
                    <Text style={styles.buttonText}>Ver video</Text>
                </TouchableOpacity>
            </View>

            {/* Section 3: Activity 3 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Actividad 3</Text>
                {/* Nueva sección con imagen para Activity 3 */}
                <View style={styles.imageSection}>
                    <Image
                        source={require('../../assets/Image/Imagen_Guia/3.png')}
                        style={styles.image}
                    />
                </View>
                {/* Image for Activity 3 */}
                <Image
                    source={require('../../assets/Image/Imagen_Guia/Guia3.jpeg')}
                    style={styles.image}
                />
                {/* Button for Activity 3 */}
                <TouchableOpacity style={styles.button} onPress={() => abrirVideo('https://youtube.com/shorts/8sQuFJi2WEM')}>
                    <Text style={styles.buttonText}>Ver video</Text>
                </TouchableOpacity>
            </View>

            {/* Section 4: Activity 4 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Actividad 4</Text>
                {/* Nueva sección con imagen para Activity 4 */}
                <View style={styles.imageSection}>
                    <Image
                        source={require('../../assets/Image/Imagen_Guia/5.png')}
                        style={styles.image}
                    />
                </View>
                {/* Image for Activity 4 */}
                <Image
                    source={require('../../assets/Image/Imagen_Guia/Guia4.jpeg')}
                    style={styles.image}
                />
                {/* Button for Activity 4 */}
                <TouchableOpacity style={styles.button} onPress={() => abrirVideo('https://youtube.com/shorts/3JIoImb4Mjg')}>
                    <Text style={styles.buttonText}>Ver video</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center', // Centra el título
    },
    text: {
        textAlign: 'center', // Centra el texto
        marginBottom: 10,
    },
    imageSection: {
        marginBottom: 10,
        alignItems: 'center', // Centra la imagen horizontalmente
    },
    image: {
        width: '100%',
        height: 500, // Ajustar el tamaño de la imagen aquí para hacerla más grande
        resizeMode: 'cover',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#525fe1',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center', // Centra el botón
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default GuiaPage;