import { View, Pressable, TextInput, Keyboard } from "react-native";
import { forwardRef, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import colors from "tailwindcss/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomText from "./CustomText";
import { useCreateCommentMutation } from "../queries/useMediaReviewsQuery";

const CreateCommentBottomSheet = forwardRef(({ isReplyTo, type }, ref) => {
  const snapPoints = useMemo(() => ["100%"], []);
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  const createCommentMutation = useCreateCommentMutation();

  const handleCommentCreate = () => {
    createCommentMutation.mutate(
      { isReplyTo, type, content },
      {
        onSuccess: (data) => {
          Keyboard.dismiss();
          ref.current.close();
          setContent("");
          queryClient.setQueryData(["comments", type, isReplyTo], (oldData) => {
            return [data, ...oldData];
          });
          queryClient.invalidateQueries({
            queryKey: ["comments", type, isReplyTo],
          });
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
          Create comment
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

      <View className="mt-4 flex-1 gap-4 px-3 pb-6 pt-2">
        <CustomText variant="h6" className="text-baseLight">
          Comment
        </CustomText>

        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Begin writing your comment..."
          placeholderTextColor={colors.teal[700]}
          multiline
          className="w-full flex-1 rounded-lg border border-teal-700 p-4 align-top font-interRegular text-lg text-baseLight"
        />

        <Pressable
          disabled={createCommentMutation.isPending}
          onPress={handleCommentCreate}
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

export default CreateCommentBottomSheet;
