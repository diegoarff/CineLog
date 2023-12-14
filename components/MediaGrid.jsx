import React from "react";
import { useTrendingPaginatedQuery } from "../queries/useTrendingQuery";
import FilmGrid from "./FilmGrid";

const MediaGrid = ({ type, time }) => {
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
      chip
    />
  );
};

export default MediaGrid;
