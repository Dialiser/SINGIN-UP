import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';

export default function SignIn() {
  const router = useRouter();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show('Please enter Email & Password', ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // Check if the email is verified
        if (user.emailVerified) {
          // Successfully logged in and email is verified
          ToastAndroid.show('Login successful!', ToastAndroid.LONG);
          console.log('User logged in:', user);
          // You can redirect or perform other actions here
        } else {
          // If email is not verified
          ToastAndroid.show(' Login successful.', ToastAndroid.LONG);
          console.log('Email not verified:', user);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error code:', errorCode);
        console.log('Error message:', errorMessage);
        ToastAndroid.show('Please Create Account.', ToastAndroid.LONG);
      });
  };

  return (
    <View style={{ padding: 25, marginTop: 60, backgroundColor: Colors.WHITE, paddingTop: 40, height: '100%' }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{ fontSize: 30, marginTop: 30 }}>Let's Sign You In</Text>
      <Text style={{ fontSize: 30, color: "#808080" }}>Welcome Back</Text>
      <Text style={{ fontSize: 30, color: "#808080" }}>You've been missed</Text>

      <View style={{ marginTop: 38 }}>
        <Text>Email</Text>
        <TextInput
          style={{ borderWidth: 1, borderRadius: 15, padding: 15, borderColor: "#808080" }}
          onChangeText={(value) => setEmail(value)}
          placeholder="Enter Email"
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={{ borderWidth: 1, borderRadius: 15, padding: 15, borderColor: "#808080" }}
          onChangeText={(value) => setPassword(value)}
          placeholder="Enter Password"
        />
      </View>

      <TouchableOpacity onPress={onSignIn} style={{ padding: 20, backgroundColor: Colors.PRIMARY, borderRadius: 15, marginTop: 50 }}>
        <Text style={{ color: Colors.WHITE, textAlign: "center" }}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('/auth/sign-up')}
        style={{ padding: 20, backgroundColor: Colors.WHITE, borderRadius: 15, borderWidth: 1, marginTop: 20 }}>
        <Text style={{ color: Colors.PRIMARY, textAlign: "center" }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
