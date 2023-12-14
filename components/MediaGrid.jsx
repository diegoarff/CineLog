import React from "react";
import { useTrendingPaginatedQuery } from "../queries/useTrendingQuery";
import FilmGrid from "./FilmGrid";

const MediaGrid = ({ type, time, chip }) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTrendingPaginatedQuery(type, time);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FilmGrid
      data={data}
      isLoading={isLoading}
      loadMore={loadMore}
      isFetchingNextPage={isFetchingNextPage}
      chip={chip}
    />
  );
};

export default MediaGrid;
