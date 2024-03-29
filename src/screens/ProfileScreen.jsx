import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FeedPost from "../components/FeedPost";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import DefaultUserImage from "../../assets/images/default-user.png";
import { Auth, DataStore, SortDirection } from "aws-amplify";
import { User, Post } from "../models";
import { Alert } from "react-native";
import { S3Image } from "aws-amplify-react-native";
import { formatDate } from "../helpers";
import { UserContext } from "../contexts/UserContext";

const bg = "https://picsum.photos/200/300/?blur=2";
const profilePictureWidth = Dimensions.get("window").width * 0.4;

const ProfileScreenHeader = ({ user, isMe = false }) => {
  const navigation = useNavigation();

  const signOut = () => {
    Auth.signOut();
  };

  const goToEditProfile = () => navigation.navigate("EditProfile");

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: bg }} style={styles.bg} />
      {user?.image ? (
        <S3Image imgKey={user.image} style={styles.image} />
      ) : (
        <Image source={DefaultUserImage} style={styles.image} />
      )}

      <Text style={styles.name}>{user.name}</Text>

      {isMe && (
        <>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.button, { backgroundColor: "royalblue" }]}
            >
              <AntDesign name="pluscircle" size={16} color="white" />
              <Text style={[styles.buttonText, { color: "white" }]}>
                Add to Story
              </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={goToEditProfile}>
              <MaterialCommunityIcons name="pencil" size={16} color="black" />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Pressable>
            <Pressable
              onPress={signOut}
              style={[styles.button, { flex: 0, width: 50 }]}
            >
              <MaterialIcons name="logout" size={16} color="black" />
            </Pressable>
          </View>
        </>
      )}

      {user?.graduation && (
        <View style={styles.textLine}>
          <Entypo
            name="graduation-cap"
            size={18}
            color="gray"
            style={{ width: 25 }}
          />
          <Text>Graduated {user.graduation}</Text>
        </View>
      )}

      <View style={styles.textLine}>
        <Ionicons name="time" size={18} color="gray" style={{ width: 25 }} />
        <Text>Joined on {formatDate(user?.createdAt)}</Text>
      </View>

      {user?.location && (
        <View style={styles.textLine}>
          <Entypo
            name="location-pin"
            size={18}
            color="gray"
            style={{ width: 25 }}
          />
          <Text>From {user.location}</Text>
        </View>
      )}
    </View>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { sub, user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // get the authenticated user
      const userId = route?.params?.id;

      if (!userId) return;

      // keep track if we are querying the data about the authenticated user
      setIsMe(userId === sub);
      // query the db user
      const dbUser = await DataStore.query(User, userId);

      if (!dbUser) {
        if (isMe) {
          navigation.navigate("EditProfile");
        } else {
          Alert.alert("User not found");
        }

        return;
      }
      // save the user in the state
      setUser(dbUser);

      // Query current users posts
      const dbPosts = await DataStore.query(
        Post,
        (p) => p.postUserId("eq", userId),
        { sort: (s) => s.createdAt(SortDirection.DESCENDING) }
      );

      setPosts(dbPosts);
    };

    fetchData();
  }, []);

  const renderPosts = ({ item }) => <FeedPost post={item} />;

  return (
    <FlatList
      data={posts}
      renderItem={renderPosts}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <>
          <ProfileScreenHeader user={user} isMe={isMe} />
          <Text style={styles.sectionTitle}>Posts</Text>
        </>
      )}
    />
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  bg: {
    width: "100%",
    height: 200,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: -profilePictureWidth / 2,
  },
  image: {
    width: profilePictureWidth,
    aspectRatio: 1,
    borderRadius: 500,
    borderWidth: 5,
    borderColor: "white",
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 5,
  },
  buttonsContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
  },
  button: {
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "gainsboro",
    margin: 5,
    padding: 7,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    marginHorizontal: 5,
    fontWeight: "500",
  },
  textLine: {
    alignSelf: "stretch",
    alignItems: "center",
    marginVertical: 5,
    flexDirection: "row",
  },
  sectionTitle: {
    marginLeft: 10,
    marginVertical: 5,
    fontWeight: "500",
    fontSize: 18,
  },
});
