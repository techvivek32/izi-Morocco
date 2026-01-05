// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useDispatch } from 'react-redux';
import { init } from './store/authSlice';
import ScreenWrapper from './components/ScreenWrapper';
import colors from './styles/colors';

function InitRestore() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <ScreenWrapper>
          <InitRestore />
          <RootNavigator />
        </ScreenWrapper>
      </NavigationContainer>
    </Provider>
  );
}
