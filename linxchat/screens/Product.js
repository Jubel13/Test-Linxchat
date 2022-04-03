import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Pressable,
  Share,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import React, { useState } from "react";
import ModalProd from "./Modal";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

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

  let index = flatListRef.current?.currentIndex;
  const shareOptions = {
    title: "Kaos Polos Berkualitas",
    message:
      `Produk Kaos Polos Berkualitas ` +
      data[index]?.imgUrl +
      ` Dengan harga` +
      harga,
    url: data[index]?.imgUrl,
    subject: "Product",
  };

  function shareProd() {
    Share.share(shareOptions);
  }

  function currencyFormat(num) {
    return "Rp " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

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
          sliderHeight={windowHeight * 0.35}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          ref={flatListRef}
        />
      </View>
      <View style={styles.productDesc}>
        <View style={styles.titleIcon}>
          <View>
            <Text style={styles.title}>Kaos Polos Berkualitas</Text>
          </View>
          <View style={styles.icon}>
            <Pressable onPress={shareProd}>
              <AntDesign
                style={styles.share}
                name='sharealt'
                size={24}
                color='black'
              />
            </Pressable>

            <MaterialIcons name='favorite-border' size={28} color='black' />
          </View>
        </View>
        <Text style={styles.harga}>{currencyFormat(+harga)}</Text>
        <Text style={{ marginBottom: 10 }}>Kondisi: Baru</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
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
        <View style={styles.ukuran}>
          <View>
            <Text>Ukuran</Text>
          </View>
          <View style={styles.jenisUkuran}>
            <Text style={{ ...styles.buttonColor, marginHorizontal: 10 }}>
              M
            </Text>
            <Text style={styles.activeStyle}>L</Text>
          </View>
        </View>
        <View style={styles.jumlahSection}>
          <View>
            <Text>Jumlah</Text>
          </View>
          <View style={styles.changeJumlah}>
            <Text
              style={{
                ...styles.buttonColor,
                borderRadius: 50,
                paddingHorizontal: 18,
              }}
            >
              -
            </Text>
            <Text style={{ marginHorizontal: 8 }}>1</Text>
            <Text
              style={{
                ...styles.activeStyle,
                borderRadius: 50,
                paddingHorizontal: 18,
              }}
            >
              +
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            marginTop: 10,
          }}
        />
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Deskripsi</Text>
          <Text>
            T-shirt siluet oversized untuk pria dan wanita. Mudah dipadupadankan
            untuk berbagai pilihan styling. Dengan kantong fungsional.
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            marginTop: 10,
          }}
        />
        <View style={styles.bottomSection}>
          <Entypo name='chat' size={40} color='orange' />
          <AntDesign name='shoppingcart' size={40} color='orange' />
          <Text
            style={{
              ...styles.activeStyle,
              paddingHorizontal: 70,
              fontSize: 20,
              maxHeight: 100,
              borderRadius: 50,
            }}
          >
            Beli Sekarang
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  carousel: {
    flex: 0.65,
    padding: 0,
  },
  productDesc: {
    flex: 1,
    margin: 12,
    marginTop: 0,
  },
  titleIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  icon: {
    flexDirection: "row",
  },
  share: {
    marginHorizontal: 8,
  },
  images: {
    width: windowWidth,
    height: windowHeight * 0.35,
  },
  colors: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
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
  harga: {
    color: "red",
  },
  ukuran: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  jenisUkuran: {
    flexDirection: "row",
  },
  jumlahSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changeJumlah: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomSection: {
    marginVertical: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
