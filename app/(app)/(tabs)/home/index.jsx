import { ScrollView } from "react-native";
import { TrendingSection } from "../../../../components";

const Home = () => {
  return (
    <ScrollView
      className="flex-1 bg-base p-4"
      contentContainerStyle={{ gap: 16 }}
    >
      <TrendingSection
        title="Trending"
        linkText="View all trending"
        linkRoute="/home/all"
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
    </ScrollView>
  );
};

export default Home;
