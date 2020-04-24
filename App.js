import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import NewDeckScreen from './screens/NewDeckScreen';
import NewQuestionScreen from './screens/NewQuestionScreen';
import QuizScreen from './screens/QuizScreen';
import ViewDeckScreen from './screens/ViewDeckScreen';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const stackScreenOptions = {
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#202040' },
  };
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={stackScreenOptions}
            />
            <Stack.Screen
              name="New Deck"
              component={NewDeckScreen}
              options={stackScreenOptions}
            />
            <Stack.Screen
              name="New Question"
              component={NewQuestionScreen}
              options={stackScreenOptions}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={stackScreenOptions}
            />
            <Stack.Screen
              name="View Deck"
              component={ViewDeckScreen}
              options={stackScreenOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
