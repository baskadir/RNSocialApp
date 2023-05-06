import { StyleSheet, Text } from "react-native";
import { S3Image } from "aws-amplify-react-native";

const PostBody = ({ description, postImage }) => {
  return (
    <>
      {description && <Text style={styles.description}>{description}</Text>}
      {postImage && (
        <S3Image
          imgKey={postImage}
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
