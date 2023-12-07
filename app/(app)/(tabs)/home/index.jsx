import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useAuth } from "../../../../context/AuthContext";
import { useTrendingQuery } from "../../../../queries/useTrendingQuery";
import { FilmSection } from "../../../../components";

const Home = () => {
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
    <ScrollView
      className="bg-base flex-1 p-4"
      contentContainerStyle={{ gap: 16 }}
    >
      <FilmSection
        title="Trending"
        rowData={allDayData}
        linkText="View all trending"
        linkRoute="/home/trending"
      />

      <FilmSection
        title="Popular movies"
        rowData={movieWeekData}
        linkText="View all movies"
        linkRoute="/home/movie"
      />

      <FilmSection
        title="Popular shows"
        rowData={tvWeekData}
        linkText="View all shows"
        linkRoute="/home/tv"
      />

      <TouchableOpacity onPress={onLogout}>
        <Text>Example Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Home;
