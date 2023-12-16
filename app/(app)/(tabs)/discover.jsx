import { View, Pressable, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useRef, useState } from "react";
import { CustomText, CustomBottomSheet, FilmGrid } from "../../../components";
import { options } from "../../../utils/filterOptions";
import { useDiscoverQuery } from "../../../queries/useSearchQuery";
import colors from "tailwindcss/colors";

const SheetButton = ({ selected, onPress }) => {
  return (
    <Pressable
      className="flex-1 flex-row items-center justify-between gap-2 rounded-xl border border-accentDark px-4 py-2"
      onPress={onPress}
    >
      <CustomText
        variant="body2"
        className="flex-1 text-baseLight"
        numberOfLines={1}
      >
        {selected}
      </CustomText>
      <Ionicons name="chevron-down" size={20} color={colors.zinc[400]} />
    </Pressable>
  );
};

const Discover = () => {
  const [selectedType, setSelectedType] = useState(options.type[0]);
  const [selectedSort, setSelectedSort] = useState(options.sort[0]);
  const [selectedYear, setSelectedYear] = useState(options.year[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(options.language[0]);
  const [selectedGenre, setSelectedGenre] = useState(
    options.genre[selectedType.value][2],
  );

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
    sheetRef.current.expand();
  };

  const handleSelect = (value) => {
    switch (valueToChange) {
      case "type":
        setSelectedType(value);
        setSelectedGenre(options.genre[value.value][0]);
        break;
      case "sort":
        setSelectedSort(value);
        break;
      case "year":
        setSelectedYear(value);
        break;
      case "language":
        setSelectedLanguage(value);
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
      selectedLanguage.value,
      selectedGenre.value,
    );

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const resetFilters = useCallback(() => {
    setSelectedType(options.type[0]);
    setSelectedSort(options.sort[0]);
    setSelectedYear(options.year[0]);
    setSelectedLanguage(options.language[0]);
    setSelectedGenre(options.genre[selectedType.value][2]);
  }, []);

  return (
    <View className="flex-1 bg-base">
      <View className="p-4">
        <View className="mb-4 flex-row items-center gap-4">
          <Pressable
            className="rounded-xl border border-red-500 p-2"
            onPress={resetFilters}
          >
            <MaterialIcons
              name="filter-off"
              size={20}
              color={colors.red[500]}
            />
          </Pressable>
          <SheetButton
            selected={selectedType.label}
            onPress={() => {
              handleModalOpen("type");
            }}
          />
          <SheetButton
            selected={selectedSort.label}
            onPress={() => {
              handleModalOpen("sort");
            }}
          />
        </View>
        <View className="flex-row gap-4">
          <SheetButton
            selected={selectedYear.label}
            onPress={() => {
              handleModalOpen("year");
            }}
          />
          <SheetButton
            selected={selectedLanguage.label}
            onPress={() => {
              handleModalOpen("language");
            }}
          />
          <SheetButton
            selected={selectedGenre.label}
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
        title={valueToChange}
        options={selectedOptions}
        onSelect={(value) => {
          handleSelect(value);
        }}
      />
    </View>
  );
};

export default Discover;
