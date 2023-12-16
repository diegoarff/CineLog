import { useLocalSearchParams } from "expo-router";
import {
  useCommentQuery,
  useCommentsQuery,
} from "../../../queries/useMediaReviewsQuery";
import ReviewCommentDetailScreen from "../../../screens/ReviewCommentDetailScreen";

const CommentDetails = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useCommentQuery(id);
  const { data: comments, isLoading: isLoadingComments } = useCommentsQuery(
    "comment",
    id,
  );

  return (
    <ReviewCommentDetailScreen
      type="comment"
      isLoading={isLoading}
      data={data}
      comments={comments}
      isLoadingComments={isLoadingComments}
    />
  );
};

export default CommentDetails;
