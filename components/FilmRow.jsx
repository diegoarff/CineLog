import { FlatList } from "react-native";
import Film from "./Film";

const FilmRow = ({ data }) => {
  return (
    <FlatList
      data={data}
      horizontal
      contentContainerStyle={{ gap: 20 }}
      renderItem={({ item }) => <Film item={item} />}
      keyExtractor={(item) => item.id + item.media_type}
    />
  );
};

export default FilmRow;