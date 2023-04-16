import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import MainNavigatior from './src/navigation/MainNavigator';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <MainNavigatior />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
