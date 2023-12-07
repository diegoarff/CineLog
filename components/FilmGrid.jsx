import { ActivityIndicator, FlatList, View } from "react-native";
import Film from "./Film";
import { useTrendingPaginatedQuery } from "../queries/useTrendingQuery";

const FilmGrid = ({ type, time }) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTrendingPaginatedQuery(type, time);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View className="flex-1 bg-base p-4 pb-0">
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
