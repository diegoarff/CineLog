import { useLocalSearchParams } from "expo-router";
import {
  useReviewQuery,
  useCommentsQuery,
} from "../../../queries/useMediaReviewsQuery";
import ReviewCommentDetailScreen from "../../../screens/ReviewCommentDetailScreen";

const ReviewDetails = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useReviewQuery(id);
  const { data: comments, isLoading: isLoadingComments } = useCommentsQuery(
    "review",
    id,
  );

  return (
    <ReviewCommentDetailScreen
      type="review"
      isLoading={isLoading}
      data={data}
      comments={comments}
      isLoadingComments={isLoadingComments}
    />
  );
};

export default ReviewDetails;
