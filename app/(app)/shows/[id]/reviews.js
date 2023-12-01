import { useLocalSearchParams } from "expo-router";
import ReviewsScreen from "../../../../screens/ReviewsScreen";

const ShowReviews = () => {
  const { id } = useLocalSearchParams();
  return <ReviewsScreen id={id} />;
};

export default ShowReviews;
