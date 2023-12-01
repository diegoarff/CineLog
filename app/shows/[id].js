import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ShowDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>ShowDetails of {id}</Text>
    </View>
  );
};

export default ShowDetails;

const styles = StyleSheet.create({});
