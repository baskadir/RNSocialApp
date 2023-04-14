import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PostHeader = ({ userImage, userName, userId, createdAt }) => {
  const navigation = useNavigation();

  const goToUser = () => navigation.navigate("Profile", { id: userId });

  return (
    <Pressable onPress={goToUser} style={styles.container}>
      <Image source={{ uri: userImage }} style={styles.profileImage} />
      <View>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.subtitle}>{createdAt}</Text>
      </View>
      <Entypo
        name="dots-three-horizontal"
        color="gray"
        style={styles.icon}
        size={18}
      />
    </Pressable>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: "500",
  },
  subtitle: {
    color: "gray",
  },
  icon: {
    marginLeft: "auto",
  },
});
