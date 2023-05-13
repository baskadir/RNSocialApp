import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import { DataStore } from "aws-amplify";
import { User } from "../../models";

const FeedPost = ({ post }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!post.postUserId) {
      return;
    }
    DataStore.query(User, post.postUserId).then((data) => setUser(data));
  }, [post.postUserId]);

  return (
    <View style={styles.container}>
      {/* Post Header with details about the author */}
      <PostHeader
        userId={post.postUserId}
        userImage={user?.image}
        userName={user?.name}
        postCreatedAt={post?.createdAt}
      />

      {/* Post body with description and image */}
      <PostBody description={post.description} postImage={post.image} />

      {/* Post footer with likes and button */}
      <PostFooter
        postId={post.id}
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
