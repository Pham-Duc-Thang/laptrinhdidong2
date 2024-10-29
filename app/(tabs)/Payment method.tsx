import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PaymentMethod = () => {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [momoPhone, setMomoPhone] = useState('');
    const [zaloPhone, setZaloPhone] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);

    useEffect(() => {
        // Kiểm tra xem có chạy trên trình duyệt không
        if (typeof document !== 'undefined') {
            console.log('Component mounted in browser');
        }
    }, []);

    const handlePaymentChange = (value) => {
        setSelectedPayment(value);
    };

    const handleAgreeChange = () => {
        setIsAgreed(!isAgreed);
    };

    const handleSubmit = () => {
        Alert.alert(`Đã chọn phương thức: ${selectedPayment}`);
    };

    return (
        <View style={styles.container}  >
            <Text style={styles.title}>Chọn phương thức thanh toán</Text>

            <View style={styles.option}>
                <TouchableOpacity onPress={() => handlePaymentChange('cash')}>
                    <Text>Tiền mặt</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.option}>
                <TouchableOpacity onPress={() => handlePaymentChange('momo')}>
                    <Text>Momo</Text>
                </TouchableOpacity>
                {selectedPayment === 'momo' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập số điện thoại Momo"
                        value={momoPhone}
                        onChangeText={setMomoPhone}
                    />
                )}
            </View>

            <View style={styles.option}>
                <TouchableOpacity onPress={() => handlePaymentChange('zalopay')}>
                    <Text>Zalo Pay</Text>
                </TouchableOpacity>
                {selectedPayment === 'zalopay' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập số điện thoại Zalo"
                        value={zaloPhone}
                        onChangeText={setZaloPhone}
                    />
                )}
            </View>

            <View style={styles.option}>
                <TouchableOpacity onPress={() => handlePaymentChange('bank')}>
                    <Text>Ngân hàng</Text>
                </TouchableOpacity>
                {selectedPayment === 'bank' && (
                    <>
                        <Picker
                            selectedValue={selectedBank}
                            style={styles.pickers}
                            onValueChange={(itemValue) => setSelectedBank(itemValue)}
                        >
                            <Picker.Item label="Chọn ngân hàng" value="" />
                            <Picker.Item label="Vietcombank" value="bank_a" />
                            <Picker.Item label="Techcombank" value="bank_b" />
                            <Picker.Item label="Agribank" value="bank_c" />
                        </Picker>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập số tài khoản"
                            value={bankAccount}
                            onChangeText={setBankAccount}
                        />
                    </>
                )}
            </View>

            <Text style={styles.total}>Tổng số tiền: <Text style={styles.amount}>100000 VNĐ</Text></Text>

            <TouchableOpacity onPress={handleAgreeChange} style={styles.checkbox}>
                <Text>{isAgreed ? '☑' : '☐'} Tôi đồng ý với điều khoản và điều kiện.</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isAgreed}
                style={[styles.button, { opacity: isAgreed ? 1 : 0.5 }]}
            >
                <Text style={styles.buttonText}>Xác nhận thanh toán</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        fontFamily: 'Arial, sans-serif',
        backgroundColor:"#fff",
        height:700,

    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    option: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginTop: 20,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    total: {
        fontSize: 16,
        marginVertical: 10,
    },
    amount: {
        fontWeight: 'bold',
    },
    checkbox: {
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    pickers: {
      height: 50,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
      paddingBottom:200,
    },
});

export default PaymentMethod;
