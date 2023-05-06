import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import MainNavigatior from "./src/navigation/MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { useEffect, useState } from "react";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(setAuthUser);
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <MainNavigatior user={authUser} />
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
