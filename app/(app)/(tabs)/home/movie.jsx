import { FilmGrid } from "../../../../components";
import { useTrendingPaginatedQuery } from "../../../../queries/useTrendingQuery";

const movie = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTrendingPaginatedQuery("movie", "week");

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

export default movie;
