import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  Text,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import React, { useState } from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data = [
  {
    id: 1,
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_34_433031.jpg?width=1600&impolicy=quality_75",
  },
  {
    id: 2,
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_30_433031.jpg?width=1600&impolicy=quality_75",
  },
  {
    id: 3,
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_09_433031.jpg?width=1600&impolicy=quality_75",
  },
  {
    id: 4,
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_68_433031.jpg?width=1600&impolicy=quality_75",
  },
];

let renderItem = ({ item, index }) => {
  return (
    <View>
      <Image style={styles.images} source={{ uri: item.imgUrl }} />
      <Text>{index}</Text>
    </View>
  );
};

export default function Product() {
  let [harga, setHarga] = useState(0);

  const onViewRef = React.useRef((viewableItems) => {
    console.log(viewableItems.viewableItems[0].item.id);
    // Use viewable items in state or as intended
    let id = +viewableItems.viewableItems[0].item.id;
    if (id === 1) {
      setHarga(10000);
    } else if (id === 2) {
      setHarga(12000);
    } else if (id === 3) {
      setHarga(11000);
    } else if (id === 4) {
      setHarga(13000);
    }
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
      />
      <Text>Kaos Polos Berkualitas</Text>
      <Text>{harga}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  images: {
    width: windowWidth,
    height: windowHeight / 2,
  },
});
