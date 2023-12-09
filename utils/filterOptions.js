export const options = {
  type: [
    {
      value: "movie",
      label: "Movies",
    },
    {
      value: "tv",
      label: "TV Shows",
    },
  ],
  year: [...Array(60).keys()].map((idx) => {
    const currentYear = new Date().getFullYear();
    const year = (currentYear - idx).toString();
    return { label: year, value: year };
  }),
  sort: [
    {
      value: "popularity.desc",
      label: "Popularity Descending",
    },
    {
      value: "popularity.asc",
      label: "Popularity Ascending",
    },
    {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
    },
    {
      value: "primary_release_date.asc",
      label: "Release Date Ascending",
    },
    {
      value: "revenue.desc",
      label: "Revenue Descending",
    },
    {
      value: "revenue.asc",
      label: "Revenue Ascending",
    },
  ],
  genre: {
    movie: [
      {
        value: 28,
        label: "Action",
      },
      {
        value: 12,
        label: "Adventure",
      },
      {
        value: 16,
        label: "Animation",
      },
      {
        value: 35,
        label: "Comedy",
      },
      {
        value: 80,
        label: "Crime",
      },
      {
        value: 99,
        label: "Documentary",
      },
      {
        value: 18,
        label: "Drama",
      },
      {
        value: 10751,
        label: "Family",
      },
      {
        value: 14,
        label: "Fantasy",
      },
      {
        value: 36,
        label: "History",
      },
      {
        value: 27,
        label: "Horror",
      },
      {
        value: 10402,
        label: "Music",
      },
      {
        value: 9648,
        label: "Mystery",
      },
      {
        value: 10749,
        label: "Romance",
      },
      {
        value: 878,
        label: "Science Fiction",
      },
      {
        value: 10770,
        label: "TV Movie",
      },
      {
        value: 53,
        label: "Thriller",
      },
      {
        value: 10752,
        label: "War",
      },
      {
        value: 37,
        label: "Western",
      },
    ],

    tv: [
      {
        value: 10759,
        label: "Action & Adventure",
      },
      {
        value: 16,
        label: "Animation",
      },
      {
        value: 35,
        label: "Comedy",
      },
      {
        value: 80,
        label: "Crime",
      },
      {
        value: 99,
        label: "Documentary",
      },
      {
        value: 18,
        label: "Drama",
      },
      {
        value: 10751,
        label: "Family",
      },
      {
        value: 10762,
        label: "Kvalues",
      },
      {
        value: 9648,
        label: "Mystery",
      },
      {
        value: 10763,
        label: "News",
      },
      {
        value: 10764,
        label: "Reality",
      },
      {
        value: 10765,
        label: "Sci-Fi & Fantasy",
      },
      {
        value: 10766,
        label: "Soap",
      },
      {
        value: 10767,
        label: "Talk",
      },
      {
        value: 10768,
        label: "War & Politics",
      },
      {
        value: 37,
        label: "Western",
      },
    ],
  },
};
