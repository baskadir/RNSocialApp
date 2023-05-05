import "@azure/core-asynciterator-polyfill";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, FlatList, Pressable, StyleSheet, Image } from "react-native";
import FeedPost from "../components/FeedPost";
// import posts from "../../assets/data/posts.json";
import DefaultUserImg from "../../assets/images/default-user.jpg";
import { Entypo } from "@expo/vector-icons";
import { DataStore } from "@aws-amplify/datastore";
import { Post } from "../models";
import { Predicates, SortDirection } from "aws-amplify";

const FeedScreen = () => {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    DataStore.query(Post).then(setPosts);
  }, []);

  const createPost = () => {
    navigation.navigate("CreatePost");
    console.log("create a new post");
  };

  const renderPosts = ({ item }) => <FeedPost post={item} />;

  const ListHeader = () => (
    <Pressable onPress={createPost} style={styles.header}>
      <Image source={DefaultUserImg} style={styles.profileImage} />
      <Text>What's on your mind?</Text>
      <Entypo name="images" size={24} color="limegreen" style={styles.icon} />
    </Pressable>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderPosts}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeader}
    />
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: "gray",
  },
  icon: {
    marginLeft: "auto",
  },
});
