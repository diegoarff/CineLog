import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const CommentDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>CommentDetails of comment: {id}</Text>
    </View>
  );
};

export default CommentDetails;

const styles = StyleSheet.create({});
