import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GenderColor from '~/screens/join/GenderColor';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='GenderColor' component={GenderColor} />
    </Stack.Navigator>
  );
};