import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";

const Home = () => {
  const router = useRouter();
  const { onLogout } = useAuth();

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
      <Text onPress={() => router.push("/shows")}>View all shows</Text>
      {shows.map((show) => (
        <Text key={show.id} onPress={() => router.push(`/shows/${show.id}`)}>
          {show.title}
        </Text>
      ))}
      <TouchableOpacity onPress={onLogout}>
        Example Logout
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
