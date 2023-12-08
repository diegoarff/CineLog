import { FilmGrid } from "../../../../components";
import { useTrendingPaginatedQuery } from "../../../../queries/useTrendingQuery";

const tv = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTrendingPaginatedQuery("tv", "week");

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FilmGrid
      data={data}
      isLoading={isLoading}
      loadMore={loadMore}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default tv;
