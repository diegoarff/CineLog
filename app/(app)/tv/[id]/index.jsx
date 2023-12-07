import { useLocalSearchParams } from "expo-router";
import DetailsScreen from "../../../../screens/DetailsScreen";

const ShowDetails = () => {
  const { id } = useLocalSearchParams();

  return <DetailsScreen type="shows" id={id} />;
};

export default ShowDetails;

