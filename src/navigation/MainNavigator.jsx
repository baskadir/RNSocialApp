import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { FontAwesome } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

const MainNavigatior = () => {
  const { sub } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen
          name="Feed"
          component={FeedScreen}
          options={({ navigation }) => ({
            title: "Your Feed",
            headerRight: () => (
              <FontAwesome
                onPress={() => navigation.navigate("Profile", { id: sub })}
                name="user"
                size={24}
                color="gray"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "My Profile" }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{ title: "Create New Post" }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ title: "Edit Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigatior;
