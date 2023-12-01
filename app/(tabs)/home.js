import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const home = () => {
  const router = useRouter();

  const movies = [
    { id: "a2948d", title: "Star Wars" },
    { id: "87875e", title: "Lord of the Rings" },
  ];

  const shows = [
    { id: 1, title: "Game of Thrones" },
    { id: 2, title: "The Witcher" },
  ];

  return (
    <View>
      <Text style={styles.heading}>Trending movies</Text>
      <Text onPress={() => router.push("/movies")}>View all movies</Text>
      {movies.map((movie) => (
        <Text key={movie.id} onPress={() => router.push(`/movies/${movie.id}`)}>
          {movie.title}
        </Text>
      ))}

      <Text style={styles.heading}>Trending shows</Text>
      {shows.map((show) => (
        <Text key={show.id} onPress={() => router.push(`/shows/${show.id}`)}>
          {show.title}
        </Text>
      ))}
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
