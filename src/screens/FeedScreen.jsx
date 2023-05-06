import "@azure/core-asynciterator-polyfill";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, FlatList, Pressable, StyleSheet, Image } from "react-native";
import FeedPost from "../components/FeedPost";
import DefaultUserImage from "../../assets/images/default-user.png";
import { Entypo } from "@expo/vector-icons";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { Post } from "../models";

const FeedScreen = () => {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const subscription = DataStore.observeQuery(Post, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    }).subscribe(({ items }) => setPosts(items));

    return () => subscription.unsubscribe();
  }, []);

  const createPost = () => {
    navigation.navigate("CreatePost");
  };

  const renderPosts = ({ item }) => <FeedPost post={item} />;

  const ListHeader = () => (
    <Pressable onPress={createPost} style={styles.header}>
      <Image source={DefaultUserImage} style={styles.profileImage} />
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
