import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import MainNavigatior from "./src/navigation/MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import UserContextProvider from "./src/contexts/UserContext";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <UserContextProvider>
        <MainNavigatior />
      </UserContextProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
