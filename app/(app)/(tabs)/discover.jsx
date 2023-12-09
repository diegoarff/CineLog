import { View, Pressable, ActivityIndicator } from "react-native";
import { useRef, useState } from "react";
import { CustomText, CustomBottomSheet, FilmGrid } from "../../../components";
import { options } from "../../../utils/filterOptions";
import { useDiscoverQuery } from "../../../queries/useSearchQuery";
import colors from "tailwindcss/colors";

const SheetButton = ({ title, onPress }) => {
  return (
    <Pressable
      className="flex-1 rounded-xl border border-accentDark px-4 py-2"
      onPress={onPress}
    >
      <CustomText variant="h6" className="text-baseLight">
        {title}
      </CustomText>
    </Pressable>
  );
};

const Discover = () => {
  const [selectedType, setSelectedType] = useState("movie");
  const [selectedSort, setSelectedSort] = useState("popularity.desc");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [valueToChange, setValueToChange] = useState("");

  const sheetRef = useRef(null);

  const handleModalOpen = (option) => {
    const selectedOption =
      option === "genre" ? options[option][selectedType] : options[option];
    setSelectedOptions(selectedOption);
    setValueToChange(option);
    sheetRef.current.snapToIndex(1);
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
    useDiscoverQuery(selectedType, selectedSort, selectedYear, selectedGenre);

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
            title="Type"
            onPress={() => {
              handleModalOpen("type");
            }}
          />
          <SheetButton
            title="Sort"
            onPress={() => {
              handleModalOpen("sort");
            }}
          />
        </View>
        <View className="flex-row gap-4">
          <SheetButton
            title="Year"
            onPress={() => {
              handleModalOpen("year");
            }}
          />
          <SheetButton
            title="Genre"
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
