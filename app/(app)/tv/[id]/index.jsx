import { useLocalSearchParams } from "expo-router";
import DetailsScreen from "../../../../screens/DetailsScreen";

const ShowDetails = () => {
  const { id } = useLocalSearchParams();

  return <DetailsScreen mediaType="tv" id={id} />;
};

export default ShowDetails;
