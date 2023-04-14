import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";

const ProfileScreen = () => {
  const route = useRoute();
  console.log("User: ", route?.params?.id);

  return (
    <View style={{flex: 1}}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
