import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, ActivityIndicator, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDetailsQuery } from "../../../../queries/useDetailsQuery";
import YoutubePlayer from "react-native-youtube-iframe";
import colors from "tailwindcss/colors";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { CastList, CustomText, FilmRow } from "../../../../components";
import { useState } from "react";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [showTrailer, setShowTrailer] = useState(false);

  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 150], [0, 1]),
    };
  });

  const { data, isLoading } = useDetailsQuery("movie", id);

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTintColor: colors.zinc[200],
          headerBackVisible: false,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={25}
              color={colors.zinc[200]}
              onPress={() => router.back()}
              className="mr-4 rounded-full bg-base p-2"
            />
          ),
          headerTitle: () => (
            <Animated.Text
              className="w-[260px] font-interSemiBold text-xl text-zinc-200"
              numberOfLines={1}
              style={[headerAnimatedStyle]}
            >
              {data?.title || ""}
            </Animated.Text>
          ),
          headerRight: () => (
            <Ionicons
              name="share-social"
              size={25}
              color={colors.zinc[200]}
              onPress={() => router.back()}
              className="rounded-full bg-base p-2"
            />
          ),
          headerBackground: () => (
            <Animated.View
              className="h-32 bg-base"
              style={[headerAnimatedStyle]}
            />
          ),
        }}
      />
      <Animated.ScrollView ref={scrollRef} className="flex-1 bg-base">
        {isLoading ? (
          <View className="h-screen items-center justify-center">
            <ActivityIndicator size="large" color={colors.teal[500]} />
          </View>
        ) : (
          <>
            <View className="relative">
              <Image
                source={{
                  uri: !data.backdrop.split("/")[6]
                    ? "https://firebasestorage.googleapis.com/v0/b/imgstorage-b6657.appspot.com/o/imgNotFound.png?alt=media&token=3eec4488-078e-4130-a238-36936cb38807"
                    : data.backdrop,
                }}
                className="aspect-video w-full "
              />
              <Image
                source={require("../../../../assets/backdrop.png")}
                className="absolute bottom-0 left-0 aspect-video w-full "
              />
            </View>

            <View className="-mt-12 flex-1 px-4">
              {/* POSTER AND HEADER INFO */}
              <View className={`${showTrailer ? "mb-6" : ""} flex-row gap-8`}>
                <Image
                  source={{
                    uri: !data.poster.split("/")[6]
                      ? "https://firebasestorage.googleapis.com/v0/b/imgstorage-b6657.appspot.com/o/imgNotFound.png?alt=media&token=3eec4488-078e-4130-a238-36936cb38807"
                      : data.poster,
                  }}
                  className="aspect-[2/3] w-36 rounded-lg border-[1px] border-baseMedium"
                />
                <View className="flex-1 justify-center gap-4">
                  <View>
                    <CustomText variant="h4" className="text-light">
                      {data.title}
                    </CustomText>
                    {data.original_language !== "en" && (
                      <CustomText className="italic text-baseLight">
                        {data.original_title}
                      </CustomText>
                    )}
                  </View>
                  <View className="flex-row justify-around">
                    <CustomText
                      variant="button"
                      className=" self-start rounded-full bg-baseDark px-4 py-2 text-baseLight"
                    >
                      {data.year}
                    </CustomText>
                    <CustomText
                      variant="button"
                      className=" self-start rounded-full bg-accentDark px-4 py-2 text-light"
                      onPress={() => setShowTrailer((prev) => !prev)}
                    >
                      {showTrailer ? "HIDE PLAYER" : "SEE TRAILER"}
                    </CustomText>
                  </View>
                </View>
              </View>

              {/* TRAILER */}
              {showTrailer && (
                <View className="aspect-[16/9] overflow-hidden rounded-xl">
                  <YoutubePlayer
                    videoId={data.trailer.split("=")[1]}
                    height="100%"
                    webViewStyle={{ opacity: 0.99 }}
                    resumePlayAndroid={false}
                  />
                </View>
              )}

              {/* CAST */}

              {/* SECTIONS */}
              <View className="mt-6 gap-6">
                {/* OVERVIEW */}
                <View className="gap-2">
                  <CustomText variant="button" className="text-baseMedium">
                    OVERVIEW
                  </CustomText>
                  <CustomText className=" text-baseLight">
                    {data.overview}
                  </CustomText>
                </View>

                {/* GENRES */}
                <View className="gap-2">
                  <CustomText variant="button" className="text-baseMedium">
                    GENRES
                  </CustomText>
                  <View className="flex-row flex-wrap gap-4">
                    {data.genres.map((genre) => (
                      <CustomText
                        key={genre.id}
                        variant="button"
                        className="rounded-full bg-baseDark px-4 py-2 capitalize text-baseLight"
                      >
                        {genre.name}
                      </CustomText>
                    ))}
                  </View>
                </View>

                {/* CAST */}
                <View className="gap-4">
                  <CustomText variant="button" className="text-baseMedium">
                    CAST
                  </CustomText>

                  <CastList data={data.cast} />
                </View>

                {/* SIMILAR */}
                <View className="gap-4">
                  <CustomText variant="button" className="text-baseMedium">
                    SIMILAR TO THIS
                  </CustomText>
                  {data.similar.length > 0 ? (
                    <FilmRow data={data.similar} />
                  ) : (
                    <CustomText className="text-baseLight">
                      No similar media found
                    </CustomText>
                  )}
                </View>
              </View>
            </View>
          </>
        )}
      </Animated.ScrollView>
    </>
  );
};

export default MovieDetails;
