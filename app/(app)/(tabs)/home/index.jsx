import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../../context/AuthContext";
import { useTrendingQuery } from "../../../../queries/useTrendingQuery";

const Home = () => {
  const router = useRouter();
  const { onLogout } = useAuth();

  const { data: allDayData, isLoading: isAllDayLoading } = useTrendingQuery(
    "all",
    "day",
  );

  const { data: movieWeekData, isLoading: isMovieWeekLoading } =
    useTrendingQuery("movie", "week");

  const { data: tvWeekData, isLoading: isTvWeekLoading } = useTrendingQuery(
    "tv",
    "week",
  );

  const isLoading = isAllDayLoading || isMovieWeekLoading || isTvWeekLoading;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-900 px-4">
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <ScrollView>
      <Text className="font-interBold text-4xl text-red-500">
        Trending movies
      </Text>
      <Text onPress={() => router.push("/home/movies")}>View all movies</Text>
      {movieWeekData.map((movie) => (
        <Text key={movie.id} onPress={() => router.push(`/movies/${movie.id}`)}>
          {movie.name}
        </Text>
      ))}

      <Text className="text-4xl">Trending shows</Text>
      <Text onPress={() => router.push("/home/shows")}>View all shows</Text>
      {tvWeekData.map((show) => (
        <Text key={show.id} onPress={() => router.push(`/shows/${show.id}`)}>
          {show.name}
        </Text>
      ))}
      <TouchableOpacity onPress={onLogout}>
        <Text>Example Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Home;
