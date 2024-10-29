import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: "username",
          password: "password"
        })
      })      
        .then((res) => res.json())
        .then((json) => {
          console.log(json); // Thêm dòng này để kiểm tra phản hồi từ API
          if (json.token) {
            Alert.alert('Đăng Nhập Thành Công', `Chào mừng ${username}`);
          } else {
            Alert.alert('Đăng Nhập Thất Bại', 'Sai tên người dùng hoặc mật khẩu.');
          }
        })        
        .catch((error) => {
          Alert.alert('Lỗi Kết Nối', 'Không thể kết nối đến máy chủ.');
          console.error(error);
        });
    } else {
      Alert.alert('Lỗi', 'Vui lòng nhập cả tên người dùng và mật khẩu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        placeholderTextColor="black"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor="black"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Đăng Nhập" onPress={handleLogin}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20,backgroundColor:"#fff" },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, },
});
