import {NavigationContainer} from '@react-navigation/native';
import Navigator from './app/navigator/Navigator';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
