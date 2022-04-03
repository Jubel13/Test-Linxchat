import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Pressable,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import React, { useState } from "react";
import ModalProd from "./Modal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data = [
  {
    id: 1,
    color: "Coklat",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_34_433031.jpg?width=1600&impolicy=quality_75",
  },
  {
    id: 2,
    color: "Putih",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_30_433031.jpg?width=1600&impolicy=quality_75",
  },
  {
    id: 3,
    color: "Hitam",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_09_433031.jpg?width=1600&impolicy=quality_75",
  },
  {
    id: 4,
    color: "Grey",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_68_433031.jpg?width=1600&impolicy=quality_75",
  },
];

export default function Product() {
  let [harga, setHarga] = useState(0);
  const [focus, setFocus] = useState({});
  let flatListRef = React.useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  function changeFocus(color, index) {
    flatListRef.current.snapToItem(index);
    setFocus((prevRes) => {
      return {
        ...(prevRes = false),
        [color]: true,
      };
    });
  }

  let renderItem = ({ item, index }) => {
    return (
      <Pressable onPress={showPic}>
        <Image style={styles.images} source={{ uri: item.imgUrl }} />
      </Pressable>
    );
  };

  function showPic() {
    // let index = flatListRef.current.currentIndex();
    setModalVisible(true);
  }

  // console.log(focus);

  const onViewRef = React.useRef((viewableItems) => {
    // console.log(viewableItems.viewableItems[0].item.id);
    // Use viewable items in state or as intended
    let id = +viewableItems?.viewableItems[0].item.id;
    if (id === 1) {
      setHarga(10000);
      changeFocus("Coklat");
    } else if (id === 2) {
      setHarga(12000);
      changeFocus("Putih");
    } else if (id === 3) {
      setHarga(11000);
      changeFocus("Hitam");
    } else if (id === 4) {
      setHarga(13000);
      changeFocus("Grey");
    }
  });

  return (
    <View style={styles.container}>
      <ModalProd
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data[flatListRef.current?.currentIndex]}
      ></ModalProd>
      <View style={styles.carousel}>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          sliderHeight={windowHeight / 2}
          itemHeight={windowHeight / 2}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          ref={flatListRef}
        />
      </View>
      <View style={styles.productDesc}>
        <Text>Kaos Polos Berkualitas</Text>
        <Text>{harga}</Text>
        <View style={styles.colors}>
          <Text>Warna</Text>
          {data.map((el, index) => {
            return (
              <Text
                style={
                  focus[el.color] ? styles.activeStyle : styles.buttonColor
                }
                onPress={() => changeFocus(el.color, index)}
                key={el.id}
              >
                {el.color}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },

  carousel: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
  },
  productDesc: {
    flex: 1,
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    borderStyle: "solid",
  },
  images: {
    width: windowWidth,
    height: windowHeight / 2,
  },
  colors: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonColor: {
    maxHeight: 45,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    color: "black",
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 1,
  },
  activeStyle: {
    maxHeight: 45,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "green",
    color: "white",
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 1,
  },
});
