import { Text, TouchableOpacity, ScrollView } from "react-native";
import { useAuth } from "../../../../context/AuthContext";
import { TrendingSection } from "../../../../components";

const Home = () => {
  const { onLogout } = useAuth();

  return (
    <ScrollView
      className="bg-base flex-1 p-4"
      contentContainerStyle={{ gap: 16 }}
    >
      <TrendingSection
        title="Trending"
        linkText="View all trending"
        linkRoute="/home/trending"
        type="all"
        time="day"
      />

      <TrendingSection
        title="Popular movies"
        linkText="View all movies"
        linkRoute="/home/movie"
        type="movie"
        time="week"
      />

      <TrendingSection
        title="Popular shows"
        linkText="View all shows"
        linkRoute="/home/tv"
        type="tv"
        time="week"
      />

      <TouchableOpacity onPress={onLogout}>
        <Text>Example Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Home;
