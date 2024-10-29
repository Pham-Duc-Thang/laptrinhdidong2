import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';

const DATA = [
  {
    id: 'category-1',
    title: 'Iphone',
    description: 'Danh sách tất cả sản phẩm có sẵn.',
    products: [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Iphone 8',
        description: 'iPhone 8 là một chiếc điện thoại thông minh của Apple, ra mắt vào tháng 9 năm 2017. Nó có thiết kế mịn màng, vỏ kim loại, và được trang bị màn hình Retina HD 4.7 inch với độ phân giải 1334 x 750 pixel. Ngoài ra, iPhone 8 cũng có chip A11 Bionic mạnh mẽ, camera 12MP, và khả năng chống nước, bụi với độ cấp IP67',
        imageUrl: require('../../assets/images/iphone8.jpg'),
        price: '4.590.000đ',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Iphone 9',
        description: 'iPhone 9 là bản nâng cấp của iPhone 8 với chip A13 Bionic và màn hình 4.7 inch, mang lại hiệu năng mạnh mẽ và thiết kế quen thuộc.',
        imageUrl: require('../../assets/images/iphone9.jpg'),
        price: '9.590.000đ',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Iphone X',
        description: 'iPhone X là smartphone cao cấp của Apple, với màn hình OLED 5.8 inch và Face ID.',
        imageUrl: require('../../assets/images/iphoneX.jpg'),
        price: '8.090.000đ',
      },
      {
        id: 'iphone11',
        title: 'Iphone 11',
        description: 'iPhone 11 là một chiếc điện thoại thông minh của Apple, ra mắt vào tháng 9 năm 2019, với màn hình Liquid Retina HD 6.1 inch, camera 12MP sau và 12MP trước, chip A13 Bionic, và khả năng chống nước, bụi IP68.',
        imageUrl: require('../../assets/images/iphone-11.jpg'),
        price: '8.990.000₫',
      },
      {
        id: 'iphone12',
        title: 'Iphone 12',
        description: 'Mô tả cho sản phẩm cafe mocha.',
        imageUrl: require('../../assets/images/iphone12.jpg'),
        price: '10.990.000₫',
      },
    ],
  },
  {
    id: 'category-2',
    title: 'Samsung ',
    description: 'Danh sách đồ ăn vặt.',
    products: [
      {
        id: 'SamsungGalaxyS22',
        title: 'Samsung Galaxy S22',
        description: 'Samsung Galaxy S22 là một chiếc điện thoại thông minh với màn hình 6.1 inch Dynamic AMOLED 2X, camera 50MP sau và 10MP trước, chip Exynos 2200, và khả năng chống nước, bụi IP68.',
        imageUrl: require('../../assets/images/samsunggalaxys22.jpg'),
        price: '8.990.000₫',
      },
      {
        id: 'Samsung Galaxy S24 Plus',
        title: 'Samsung Galaxy S24 Plus',
        description: 'Samsung Galaxy S24 Plus là một chiếc điện thoại thông minh với màn hình Dynamic AMOLED 6.7 inch, chip Snapdragon 8 Gen 3, camera 50MP sau và 12MP trước, và khả năng chống nước, bụi IP68.',
        imageUrl: require('../../assets/images/samsunggalaxys24plus.jpg'),
        price: '14.590.000₫',
      },
      {
        id: 'Galaxy Note 20 Ultra',
        title: 'Galaxy Note 20 Ultra',
        description: 'Samsung Galaxy Note 20 Ultra là một chiếc điện thoại thông minh với màn hình 6.9 inch Dynamic AMOLED 2X, camera 108MP sau và 12MP trước, chip Exynos 990, và khả năng chống nước, bụi IP68.',
        imageUrl: require('../../assets/images/samsunggalaxynote20ultra.jpg'),
        price: '9.590.000₫',
      },
    ],
  },
  {
    id: 'category-3',
    title: 'Xiaomi',
    description: 'Danh sách các loại điện thoại Xiaomi.',
    products: [
      {
        id: 'Xiaomi Redmi Note 13 Pro',
        title: 'Xiaomi Redmi Note 13 Pro',
        description: 'Xiaomi Redmi Note 13 Pro là một chiếc điện thoại thông minh với màn hình AMOLED 6.67 inch, camera 200MP sau, chip Snapdragon 7s Gen 2, và khả năng sạc nhanh 67W.',
        imageUrl: require('../../assets/images/xiaomiredminote13pro.jpg'),
        price: '5.490.000₫',
      },
      {
        id: 'Xiaomi 13',
        title: 'Xiaomi 13',
        description: 'Xiaomi 13 là một chiếc điện thoại thông minh với màn hình AMOLED 6.36 inch, chip Snapdragon 8 Gen 2, và khả năng sạc nhanh 50W.',
        imageUrl: require('../../assets/images/Xiaomi13.png'),
        price: '9,590,000₫',
      },
      {
        id: 'Xiaomi Redmi Note 14 Pro',
        title: 'Xiaomi Redmi Note 14 Pro',
        description: 'Xiaomi Redmi Note 14 Pro là một chiếc điện thoại thông minh với màn hình AMOLED 6.67 inch, camera 200MP sau, chip Snapdragon 7s Gen 2, và khả năng sạc nhanh 67W.',
        imageUrl: require('../../assets/images/xiaomiredminote14pro.jpg'),
        price: '6.290.000₫',
      },
      {
        id: 'Xiaomi Redmi Note 13 Pro2',
        title: 'Xiaomi Redmi Note 13 Pro',
        description: 'Mô tả cho sản phẩm trà sữa.',
        imageUrl: require('../../assets/images/XiaomiRedmiNote13Pro.png'),
        price: '4,690,000₫',
      },
    ],
  },
  {
    id: 'category-4',
    title: 'Vivo',
    description: 'Danh sách các loại điện thoại VIvo.',
    products: [
      {
        id: 'Vivo X100',
        title: 'Vivo X100',
        description: 'Vivo X100 là một chiếc điện thoại thông minh với màn hình LTPO AMOLED 6.78 inch, chip Dimensity 9300, camera 50MP sau và 64MP trước, và khả năng sạc nhanh 120W.',
        imageUrl: require('../../assets/images/VivoX100.png'),
        price: '13,390,000₫',
      },
      {
        id: 'vivo Y28',
        title: 'Vivo Y28',
        description: 'Vivo Y28 là một chiếc điện thoại thông minh với màn hình IPS LCD 6.56 inch, chip Dimensity 6020, camera 50MP sau và 8GB RAM.',
        imageUrl: require('../../assets/images/vivoy28.jpg'),
        price: '6.490.000₫',
      },
    ],
  },
  {
    id: 'category-5',
    title: 'OPPO',
    description: 'Danh sách các loại thức uống khác.',
    products: [
      {
        id: 'Oppo Reno7 Pro 5G',
        title: 'Oppo Reno7 Pro 5G',
        description: 'Oppo Reno7 Pro 5G là một chiếc điện thoại thông minh với màn hình AMOLED 6.55 inch, chip MediaTek Dimensity 1200 Max 5G, camera 50MP sau và 8MP góc siêu rộng, và khả năng sạc nhanh 65W.',
        imageUrl: require('../../assets/images/OppoReno7Pro5G.jpg'),
        price: '4,690,000₫',
      },
      {
        id: 'OPPO Find X6 Pro 5G',
        title: 'OPPO Find X6 Pro 5G',
        description: 'OPPO Find X6 Pro 5G là một chiếc điện thoại thông minh với màn hình LTPO3 AMOLED 6.82 inch, chip Snapdragon 8 Gen 2, camera 50MP sau và 5000 mAh pin.',
        imageUrl: require('../../assets/images/OPPOFindX6Pro5G.png'),
        price: '14,490,000₫',
      },
    ],
  },
];
const Item = ({ title, description, imageUrl, price }) => {
  const handleOrder = () => {
    Alert.alert('Đặt hàng thành công', `Bạn đã đặt hàng: ${title}`);
  };

  return (
    <View style={styles.item}>
      <Image source={imageUrl} style={styles.productImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{price}</Text>
      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.buttonText}>Đặt hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('category-1');

  const filteredProducts = DATA.find((cat) => cat.id === selectedCategory)
    .products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.header}>Chào mừng đến với cửa hàng của chúng tôi</Text>
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.hotline}>Hotline: 0962605719</Text>
          <Text style={styles.address}>Địa chỉ: 190/3 Đình Phong Phú, TP.Thủ Đức, TP.HCM</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.categoryContainer}>
          {DATA.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id &&
                  styles.categoryButtonSelected,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Item {...item} />}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#007bff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  hotline: {
    fontSize: 16,
    color: '#ffffff',
  },
  address: {
    fontSize: 16,
    color: '#ffffff',
  },
  searchInput: {
    height: 50,
    width: '100%',
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  categoryButton: {
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
  },
  categoryButtonSelected: {
    backgroundColor: '#ffc107',
  },
  categoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#FFD700',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    flex: 1,
    maxWidth: '45%',
  },
  productImage: {
    width: '100%',
    height: 500,  // Increase the height
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#004d40',
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    color: '#ff5722',
    fontWeight: 'bold',
    marginTop: 5,
  },
  orderButton: {
    marginTop: 5,
    backgroundColor: '#00796b',
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
  },
});


export default App;
