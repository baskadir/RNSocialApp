import { StyleSheet, Text, View, Image } from "react-native";
import LikeIcon from "../../../assets/images/like-image.jpg";
import React, { useState } from "react";
import Button from "./Button";

const PostFooter = ({ numberOfLikes, numberOfShares }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.container}>
      {/* Stats */}
      <View style={styles.stats}>
        {numberOfLikes !== 0 ?
          (
            <>
              <Image source={LikeIcon} style={styles.likeIcon} />
              <Text style={styles.likedBy}>
                {numberOfLikes} likes
              </Text>
            </>
          ) : null}
        <Text style={styles.shares}>{numberOfShares} shares</Text>
      </View>

      {/* Buttons row */}
      <View style={styles.buttonsRow}>
        {/* Like button */}
        <Button
          handlePress={() => setIsLiked(!isLiked)}
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
