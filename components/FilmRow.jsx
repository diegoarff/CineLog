import { ActivityIndicator, FlatList } from "react-native";
import Film from "./Film";
import { useTrendingQuery } from "../queries/useTrendingQuery";

const FilmRow = ({ type, time }) => {
  const { data, isLoading } = useTrendingQuery(type, time);

  return isLoading ? (
    <ActivityIndicator size="large" color="#14b8a6" />
  ) : (
    <FlatList
      data={data}
      horizontal
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => <Film item={item} />}
      keyExtractor={(item) => item.id + item.media_type}
    />
  );
};

export default FilmRow;
