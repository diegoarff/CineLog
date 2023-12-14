import { useLocalSearchParams } from "expo-router";
import DetailsScreen from "../../../../screens/DetailsScreen";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  return <DetailsScreen mediaType="movie" id={id} />;
};

export default MovieDetails;
