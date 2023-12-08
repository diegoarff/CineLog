import { FilmGrid } from "../../../../components";
import { useTrendingPaginatedQuery } from "../../../../queries/useTrendingQuery";

const all = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTrendingPaginatedQuery("all", "day");

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

export default all;
