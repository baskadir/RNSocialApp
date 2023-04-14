import { StyleSheet, View } from "react-native";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";

const FeedPost = ({ post }) => {
  return (
    <View style={styles.container}>
      {/* Post Header with details about the author */}
      <PostHeader
        userId={post.User.id}
        userImage={post.User.image}
        userName={post.User.name}
        createdAt={post.createdAt}
      />

      {/* Post body with description and image */}
      <PostBody description={post.description} postImage={post.image} />

      {/* Post footer with likes and button */}
      <PostFooter
        numberOfLikes={post.numberOfLikes}
        numberOfShares={post.numberOfShares}
      />
    </View>
  );
};

export default FeedPost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 5,
  },
});
