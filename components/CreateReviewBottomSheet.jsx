import { useMemo, forwardRef, useState, useCallback } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import colors from "tailwindcss/colors";
import { Pressable, TextInput, View } from "react-native";
import CustomText from "./CustomText";
import { Rating } from "@kolking/react-native-rating";
import { useCreateReviewMutation } from "../queries/useMediaReviewsQuery";
import { useQueryClient } from "@tanstack/react-query";

const CreateReviewBottomSheet = forwardRef(({ id }, ref) => {
  const snapPoints = useMemo(() => ["100%"], []);
  const [score, setScore] = useState(0);
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  const handleScoreChange = useCallback(
    (value) => {
      setScore(value);
    },
    [score],
  );

  const createReviewMutation = useCreateReviewMutation();

  const handleReviewCreate = () => {
    createReviewMutation.mutate(
      { id, score, content },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(["reviews", id], (oldData) => {
            return {
              reviews: [data, ...oldData.reviews],
              userHasReviewed: true,
            };
          });
          ref.current.close();
        },
        onError: () => {
          ref.current.close();
        },
      },
    );
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enablePanDownToClose
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: "#10181f" }}
      handleIndicatorStyle={{ backgroundColor: colors.teal[800] }}
    >
      <View className="flex-row items-center justify-between px-3 py-2">
        <CustomText variant="h4" className="text-accentDark">
          Create review
        </CustomText>
        <Pressable
          onPress={() => ref.current.close()}
          className="rounded-full bg-accentDark px-3 py-2"
        >
          <CustomText variant="caption" className="text-zinc-300">
            Close
          </CustomText>
        </Pressable>
      </View>

      <View className="mt-4 items-center gap-2">
        <Rating
          size={40}
          rating={score}
          scale={1}
          onChange={handleScoreChange}
          spacing={10}
          fillColor={colors.amber[500]}
          touchColor={colors.amber[700]}
        />
        <CustomText variant="h5" className="text-baseLight">
          Score of {score}/5
        </CustomText>
      </View>
      <View className="flex-1 gap-4 px-3 pb-6 pt-2">
        <CustomText variant="h6" className="text-baseLight">
          Review
        </CustomText>
        <View className="flex-1 rounded-lg border border-teal-700 p-4">
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Begin writing your review..."
            placeholderTextColor={colors.teal[700]}
            multiline
            className="w-full font-interRegular text-lg text-baseLight"
          />
        </View>
        <Pressable
          disabled={createReviewMutation.isPending}
          onPress={handleReviewCreate}
          className="items-center justify-center rounded-full bg-accentDark py-4"
        >
          <CustomText variant="h5" className="text-light">
            Create
          </CustomText>
        </Pressable>
      </View>
    </BottomSheet>
  );
});

export default CreateReviewBottomSheet;
