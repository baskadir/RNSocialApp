import { StyleSheet, Text, Image } from "react-native";
import React from "react";

const PostBody = ({ description, postImage }) => {
  return (
    <>
      {description && <Text style={styles.description}>{description}</Text>}
      {postImage && (
        <Image
          source={{ uri: postImage }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}
    </>
  );
};

export default PostBody;

const styles = StyleSheet.create({
  description: {
    lineHeight: 20,
    padding: 10,
    letterSpacing: 0.3,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 10,
  },
});
