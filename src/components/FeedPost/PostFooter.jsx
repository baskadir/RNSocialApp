import { StyleSheet, Text, View, Image } from "react-native";
import LikeIcon from "../../../assets/images/like-image.jpg";
import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { DataStore } from "aws-amplify";
import { Post, UsersLike } from "../../models";
import { UserContext } from "../../contexts/UserContext";

const PostFooter = ({ postId, numberOfLikes, numberOfShares }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [postLikes, setPostLikes] = useState([]);
  const { sub } = useContext(UserContext);

  useEffect(() => {
    const subscription = DataStore.observeQuery(UsersLike, (u) =>
      u.postId("eq", postId)
    ).subscribe(({ items }) => {
      setPostLikes(items);
      if (items.length > 0) {
        const authUserLike = items.filter((i) => i.userId === sub);
        if (authUserLike.length > 0) {
          setIsLiked(true);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handlePressLike = async () => {
    setIsLiked(!isLiked);
    const authUserLike = postLikes.filter((pl) => pl.userId === sub);
    if (authUserLike.length === 0) {
      // add user like
      await DataStore.save(
        new UsersLike({
          userId: sub,
          postId: postId,
        })
      );

      // increase like numbers
      updatePost(postId, true);
    } else {
      // delete user like
      const toDelete = await DataStore.query(UsersLike, authUserLike[0].id);
      await DataStore.delete(toDelete);

      // decrease like numbers
      updatePost(postId);
    }
  };

  async function updatePost(id, increased = false) {
    const originalPost = await DataStore.query(Post, id);

    if (originalPost) {
      const updatedPost = await DataStore.save(
        Post.copyOf(originalPost, (updated) => {
          if (increased) {
            updated.numberOfLikes += 1;
          } else {
            updated.numberOfLikes -= 1;
          }
        })
      );
    }
  }

  return (
    <View style={styles.container}>
      {/* Stats */}
      <View style={styles.stats}>
        {numberOfLikes > 0 ? (
          <>
            <Image source={LikeIcon} style={styles.likeIcon} />
            <Text style={styles.likedBy}>{numberOfLikes} likes</Text>
          </>
        ) : null}
        <Text style={styles.shares}>{numberOfShares} shares</Text>
      </View>

      {/* Buttons row */}
      <View style={styles.buttonsRow}>
        {/* Like button */}
        <Button
          handlePress={handlePressLike}
          iconName={isLiked ? "cards-heart" : "cards-heart-outline"}
          color={isLiked ? "royalblue" : "gray"}
          text="Like"
          size={20}
        />

        {/* Comments button */}
        <Button
          iconName="comment-outline"
          text="Comment"
          color="gray"
          size={18}
        />

        {/* Share button */}
        <Button iconName="share-outline" text="Share" color="gray" size={20} />
      </View>
    </View>
  );
};

export default PostFooter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  // Stats
  stats: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    borderColor: "lightgray",
  },
  likeIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  likedBy: {
    color: "gray",
  },
  shares: {
    color: "gray",
    marginLeft: "auto",
  },

  // Buttons Row
  buttonsRow: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
