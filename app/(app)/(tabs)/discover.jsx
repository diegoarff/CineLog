import { View, Pressable, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import { CustomText, CustomBottomSheet, FilmGrid } from "../../../components";
import { options } from "../../../utils/filterOptions";
import { useDiscoverQuery } from "../../../queries/useSearchQuery";
import colors from "tailwindcss/colors";

const SheetButton = ({ title, onPress }) => {
  return (
    <Pressable
      className="flex-1 flex-row items-center justify-between gap-2 rounded-xl border border-accentDark px-4 py-2"
      onPress={onPress}
    >
      <CustomText variant="h6" className="text-baseLight flex-1" numberOfLines={1}>
        {title}
      </CustomText>
      <Ionicons name="chevron-down" size={20} color={colors.zinc[400]} />
    </Pressable>
  );
};

const Discover = () => {
  const [selectedType, setSelectedType] = useState({
    label: "Movie",
    value: "movie",
  });
  const [selectedSort, setSelectedSort] = useState({
    label: "Sort",
    value: "popularity.desc",
  });
  const [selectedYear, setSelectedYear] = useState({
    label: "Year",
    value: "",
  });
  const [selectedGenre, setSelectedGenre] = useState({
    label: "Genre",
    value: "",
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [valueToChange, setValueToChange] = useState("");

  const sheetRef = useRef(null);

  const handleModalOpen = (option) => {
    const selectedOption =
      option === "genre"
        ? options[option][selectedType.value]
        : options[option];
    setSelectedOptions(selectedOption);
    setValueToChange(option);
    sheetRef.current.snapToIndex(0);
  };

  const handleSelect = (value) => {
    switch (valueToChange) {
      case "type":
        setSelectedType(value);
        break;
      case "sort":
        setSelectedSort(value);
        break;
      case "year":
        setSelectedYear(value);
        break;
      case "genre":
        setSelectedGenre(value);
        break;
      default:
        break;
    }
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDiscoverQuery(
      selectedType.value,
      selectedSort.value,
      selectedYear.value,
      selectedGenre.value,
    );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View className="flex-1 bg-base">
      <View className="p-4">
        <View className="mb-4 flex-row gap-4">
          <SheetButton
            title={selectedType.label}
            onPress={() => {
              handleModalOpen("type");
            }}
          />
          <SheetButton
            title={selectedSort.label}
            onPress={() => {
              handleModalOpen("sort");
            }}
          />
        </View>
        <View className="flex-row gap-4">
          <SheetButton
            title={selectedYear.label}
            onPress={() => {
              handleModalOpen("year");
            }}
          />
          <SheetButton
            title={selectedGenre.label}
            onPress={() => {
              handleModalOpen("genre");
            }}
          />
        </View>
      </View>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={colors.teal[400]}
          className="mt-20"
        />
      )}

      {!isLoading && data.pages[0] && (
        <FilmGrid
          data={data}
          loadMore={loadMore}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}

      <CustomBottomSheet
        ref={sheetRef}
        options={selectedOptions}
        onSelect={(value) => {
          handleSelect(value);
        }}
      />
    </View>
  );
};

export default Discover;
