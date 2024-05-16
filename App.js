import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import maintutores from './screens/tutores/maintutores';
import DetalleTutor from './screens/tutores/DetalleTutor';
import Guia from './screens/tutores/Guia';
import MainEstudiantes from './screens/Estudiantes/MainEstudiantes';
import DetalleEstudiante from './screens/Estudiantes/DetallesEstudiantes';
import Recomendaciones from './screens/tutores/Recomendaciones';
import Mensaje from './screens/tutores/Mensaje';
import RecomendacionE from './screens/Estudiantes/RecomendacionE';
import MainActividades from './screens/Estudiantes/Actividades/MainActividades';
import Actividad1 from './screens/Estudiantes/Actividades/Actividad1/Actividad1';
import Actividad2a from './screens/Estudiantes/Actividades/Actividad2/ac2/Actividad2a';
import Actividad2b from './screens/Estudiantes/Actividades/Actividad2/ac2/Actividad2b';
import Actividad2c from './screens/Estudiantes/Actividades/Actividad2/ac2/Actividad2c';
import Actividad2d from './screens/Estudiantes/Actividades/Actividad2/ac2/Actividad2d';
import Actividad2e from './screens/Estudiantes/Actividades/Actividad2/ac2/actividad2e';
import Actividad3 from './screens/Estudiantes/Actividades/Actividad3/Actividad3';
import Actividad4 from './screens/Estudiantes/Actividades/Actividad4/actividad4';



export default function App() {


  const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} 
      options={{
        title: 'Login',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#00a680',
        }
      }}
      />
    
      <Stack.Screen name="Home" component={Home} 

        options={{
          title: 'Home',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#00a680',
          }
        }}
      />

      <Stack.Screen name="Register" component={Register} 
      options={{
        title: 'Register',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#00a680',
        }
      }}
      />

      <Stack.Screen name="maintutores" component={maintutores} 
      options={{
        title: 'Tutores',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#00a5',
        }
      }}
      />

      <Stack.Screen name="DetalleTutor" component={DetalleTutor} 
      options={{
        title: 'Tutores',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="Guia" component={Guia} 
      options={{
        title: 'Guia',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="MainEstudiantes" component={MainEstudiantes} 
      options={{
        title: 'Estudiantes',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="DetalleEstudiante" component={DetalleEstudiante} 
      options={{
        title: 'Estudiantes',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="Recomendaciones" component={Recomendaciones} 
      options={{
        title: 'Recomendaciones',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="Mensaje" component={Mensaje} 
      options={{
        title: 'Recomendaciones',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="RecomendacionE" component={RecomendacionE} 
      options={{
        title: 'Recomendaciones',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="MainActividades" component={MainActividades} 
      options={{
        title: 'Actividades',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="Actividad1" component={Actividad1} 
      options={{
        title: 'Actividades',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="Actividad2a" component={Actividad2a} 
      options={{
        title: 'Actividades',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />
      
      <Stack.Screen name="Actividad2b" component={Actividad2b} 
      options={{
        title: 'Actividades',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="Actividad2c" component={Actividad2c} 
      options={{
        title: 'Actividades',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="Actividad2d" component={Actividad2d} 
      options={{
        title: 'Actividades',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="Actividad2e" component={Actividad2e} 
      options={{
        title: 'Actividades',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="Actividad3" component={Actividad3} 
      options={{
        title: 'Actividades',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

      <Stack.Screen name="Actividad4" component={Actividad4} 
      options={{
        title: 'Actividades',
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#004f50',
        }
      }}
      />

    </Stack.Navigator>
  );
}

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
