import { FlatList } from "react-native";
import Film from "./Film";

const FilmRow = ({ data, chip, big }) => {
  return (
    <FlatList
      data={data}
      horizontal
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => <Film item={item} chip={chip} big={big} />}
      keyExtractor={(item) => item.id + (item.media_type || item.title)}
    />
  );
};

export default FilmRow;
