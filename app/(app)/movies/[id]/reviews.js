import { useLocalSearchParams } from "expo-router";
import ReviewsScreen from "../../../../screens/ReviewsScreen";

const MovieReviews = () => {
  const { id } = useLocalSearchParams();
  return <ReviewsScreen id={id} />;
};

export default MovieReviews;
