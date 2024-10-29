import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Sample product data
const DATA = [
  {
    id: 'category-1',
    title: 'Tất Cả Sản Phẩm',
    products: [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Điện thoại Iphone X',
        description: 'iPhone X là smartphone cao cấp của Apple, với màn hình OLED 5.8 inch và Face ID.',
        attributes: '100% hàng thật',
        
        colors: ['Đen', 'Xám'], 
        
        
        imageUrl: require('../../assets/images/OPPOFindX6Pro5G.png'), 
        price: '7.050.000 VNĐ',
      },
      // Add more products here...
    ],
  },
];

const ProductDetail = ({ visible, onClose, product, onAddToCart }) => {
  const [selectedcolor, setSelectedcolor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Image source={product.imageUrl} style={styles.fullImage} />

        <View style={styles.modalContent}>
          <Text style={styles.productDetailTitle}>Chi tiết sản phẩm</Text>
          <Text style={styles.modalTitle}>{product.title}</Text>
          <Text style={styles.modalDescription}>{product.description}</Text>
          <Text style={styles.modalAttributes}>Thuộc tính: {product.attributes}</Text>
          {/* color Selection */}
          <Text style={styles.modalColors}>Chọn màu:</Text>
          <View style={styles.colorContainer}>
            {product.colors.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedcolor(color)}
                style={[
                  styles.colorButton,
                  selectedcolor === color && styles.selectedcolorButton,
                ]}
              >
                <Text style={styles.colorText}>{color}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.modalPrice}>{product.price}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (selectedcolor) {
                onAddToCart({ ...product, color: selectedcolor }, quantity);
              }
            }}
            style={styles.addToCartButton}
          >
            <Icon name="add-shopping-cart" color={20} color="#fff" />
            <Text style={styles.buttonText}> Thêm vào giỏ hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Icon name="close" color={20} color="#fff" />
            <Text style={styles.buttonText}> Đóng</Text>
          </TouchableOpacity>

          <Text style={styles.relatedTitle}>Sản phẩm liên quan:</Text>
          <FlatList
            data={product.relatedProducts}
            renderItem={({ item }) => (
              <View style={styles.relatedItem}>
                <Image source={item.imageUrl} style={styles.relatedImage} />
                <Text style={styles.relatedProduct}>{item.title}</Text>
              </View>
            )}
            keyExtractor={(item) => item.title}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />

          <Text style={styles.reviewsTitle}>Đánh giá:</Text>
          <FlatList
            data={product.reviews}
            renderItem={({ item }) => (
              <View style={styles.reviewItem}>
                <Text style={styles.reviewUser}>{item.user}:</Text>
                <Text style={styles.reviewComment}>{item.comment}</Text>
                <Text style={styles.reviewRating}>Rating: {item.rating} ★</Text>
              </View>
            )}
            keyExtractor={(item) => item.user}
          />
        </View>
      </View>
    </Modal>
  );
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const openDetail = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeDetail = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const addToCart = (product, quantity) => {
    const item = { ...product, quantity };
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id && cartItem.color === item.color);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
    closeDetail();
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); 

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openDetail(item)}>
      <View style={styles.item}>
        <Image source={item.imageUrl} style={styles.productImage} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredProducts = DATA[0].products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sản phẩm</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Icon name="shopping-cart" color={30} color="#fff" />
          {cartCount > 0 && (
            <View style={styles.cartCountContainer}>
              <Text style={styles.cartCountText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm sản phẩm..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {selectedProduct && (
        <ProductDetail
          visible={modalVisible}
          onClose={closeDetail}
          product={selectedProduct}
          onAddToCart={addToCart}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#e0f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#00796b',
  },
  headerTitle: {
    fontcolor: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  cartButton: {
    padding: 10,
    position: 'relative',
  },
  cartCountContainer: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontcolor: 12,
  },
  searchInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: '#FFFFFF',
  },
  item: {
    backgroundColor: '#80deea',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 400,
    recolorMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontcolor: 16,
    fontWeight: '600',
  },
  price: {
    fontcolor: 14,
    color: '#ff5722',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  fullImage: {
    width: '100%',
    height: 300,
    recolorMode: 'cover',
    borderRadius: 10,
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: -50,
    width: '100%',
  },
  productDetailTitle: {
    fontcolor: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTitle: {
    fontcolor: 22,
    color: '#000000',
    fontWeight: 'bold',
  },
  modalDescription: {
    fontcolor: 16,
    color: '#000000',
    marginVertical: 10,
  },
  modalAttributes: {
    fontcolor: 14,
    color: '#000000',
  },
  modalSugar: {
    fontcolor: 14,
    color: '#000000',
  },
  modalIce: {
    fontcolor: 14,
    color: '#000000',
  },
  modalcolor: {
    fontcolor: 14,
    color: '#000000',
    marginTop: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorButton: {
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: '#ffffff', 
  },
  selectedcolorButton: {
    backgroundColor: '#ffeb3b', 
  },
  colorText: {
    color: '#00796b',
  },
  modalPrice: {
    fontcolor: 20,
    color: '#ff5722',
    fontWeight: 'bold',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#00796b',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartButton: {
    marginTop: 20,
    backgroundColor: '#00796b',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityText: {
    fontcolor: 18,
    marginHorizontal: 10,
  },
  relatedTitle: {
    fontcolor: 18,
    color: '#000000',
    marginTop: 10,
    fontWeight: 'bold',
  },
  relatedItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  relatedImage: {
    width: 100,
    height: 100,
    recolorMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
  },
  relatedProduct: {
    fontcolor: 14,
    color: '#000000',
  },
  reviewsTitle: {
    fontcolor: 18,
    color: '#000000',
    marginTop: 20,
    fontWeight: 'bold',
  },
  reviewItem: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  reviewUser: {
    fontWeight: 'bold',
  },
  reviewComment: {
    marginVertical: 5,
  },
  reviewRating: {
    color: '#ff5722',
  },
  button: {
    backgroundColor: '#00796b',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
});

export default App;
