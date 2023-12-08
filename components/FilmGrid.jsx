import { ActivityIndicator, FlatList, View } from "react-native";
import Film from "./Film";

const FilmGrid = ({ data, isLoading, loadMore, isFetchingNextPage }) => {
  return (
    <View className="flex-1 bg-base px-4">
      {isLoading ? (
        <ActivityIndicator size="large" color="#14b8a6" />
      ) : (
        <>
          <FlatList
            data={data.pages.map((page) => page.results).flat()}
            numColumns={3}
            renderItem={({ item }) => <Film item={item} />}
            contentContainerStyle={{ gap: 4, paddingBottom: 4 }}
            columnWrapperStyle={{ gap: 8 }}
            keyExtractor={(item) => item.id + item.media_type}
            onEndReachedThreshold={0}
            onEndReached={loadMore}
          />
          {isFetchingNextPage && (
            <ActivityIndicator size="large" color="#14b8a6" />
          )}
        </>
      )}
    </View>
  );
};

export default FilmGrid;
