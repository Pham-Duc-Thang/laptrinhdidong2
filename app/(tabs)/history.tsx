import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [cart, setCart] = useState([
    { id: '1', title: 'Điện thoại Iphone X', price: '7.050.000 VNĐ', quantity: 2, imageUrl: require('../../assets/images/iphoneX.jpg') },
    { id: '2', title: 'iphone12', price: '19.945.000 VNĐ', quantity: 1, imageUrl: require('../../assets/images/iphone12.jpg') },
  ]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [momoPhone, setMomoPhone] = useState('');
  const [zaloPhone, setZaloPhone] = useState('');
  const [bankCardNumber, setBankCardNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const totalAmount = cart.reduce((sum, item) => 
    sum + (parseFloat(item.price.replace(/ VNĐ/g, '').replace(/\./g, '')) * item.quantity), 
    0
  );

  const handlePayment = () => {
    if (!name || !email || !phone || !shippingAddress || !paymentMethod || 
        (paymentMethod === 'momo' && !momoPhone) || 
        (paymentMethod === 'zalopay' && !zaloPhone) || 
        (paymentMethod === 'bank' && (!bankCardNumber || !selectedBank))) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin và chọn phương thức thanh toán');
      return;
    }

    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 3000);

    // Clear cart and input fields
    setCart([]);
    setName('');
    setEmail('');
    setPhone('');
    setShippingAddress('');
    setPaymentMethod('');
    setMomoPhone('');
    setZaloPhone('');
    setBankCardNumber('');
    setSelectedBank('');
  };

  const CartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.imageUrl} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  const handleQuantityChange = (id, change) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>

      <FlatList
        data={cart}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={item => item.id}
      />

      <Text style={styles.totalText}>Tổng tiền: {totalAmount.toLocaleString()} VNĐ</Text>

      {/* Picker cho phương thức thanh toán */}
      <Picker
        selectedValue={paymentMethod}
        onValueChange={(itemValue) => {
          setPaymentMethod(itemValue);
          // Reset fields based on selected payment method
          if (itemValue !== 'bank') {
            setBankCardNumber('');
            setSelectedBank('');
          }
          if (itemValue !== 'momo') {
            setMomoPhone('');
          }
          if (itemValue !== 'zalopay') {
            setZaloPhone('');
          }
        }}
      >
        <Picker.Item label="Chọn phương thức thanh toán" value="" />
        <Picker.Item label="Ngân hàng" value="bank" />
        <Picker.Item label="MoMo" value="momo" />
        <Picker.Item label="Zalo Pay" value="zalopay" />
        <Picker.Item label="Tiền mặt" value="cash" />
      </Picker>

      {paymentMethod === 'momo' && (
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại MoMo"
          value={momoPhone}
          onChangeText={setMomoPhone}
          keyboardType="phone-pad"
        />
      )}

      {paymentMethod === 'zalopay' && (
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại Zalo Pay"
          value={zaloPhone}
          onChangeText={setZaloPhone}
          keyboardType="phone-pad"
        />
      )}

      {paymentMethod === 'bank' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Số thẻ ngân hàng"
            value={bankCardNumber}
            onChangeText={setBankCardNumber}
          />
          <Picker
            selectedValue={selectedBank}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedBank(itemValue)}
          >
            <Picker.Item label="Chọn ngân hàng" value="" />
            <Picker.Item label="Vietcombank" value="bank_a" />
            <Picker.Item label="Techcombank" value="bank_b" />
            <Picker.Item label="Agribank" value="bank_c" />
          </Picker>
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Tên khách hàng"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ giao hàng"
        value={shippingAddress}
        onChangeText={setShippingAddress}
      />

      <TouchableOpacity onPress={handlePayment} style={styles.button}>
        <Text style={styles.buttonText}>Xác Nhận Thanh Toán</Text>
      </TouchableOpacity>

      {paymentSuccess && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Thanh toán thành công! Cảm ơn bạn đã đặt hàng.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 18,
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00796b',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#ff5722',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
  },
  successMessage: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#dff0d8',
    borderColor: '#d6e9c6',
    borderWidth: 1,
    borderRadius: 5,
  },
  successText: {
    color: '#3c763d',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
