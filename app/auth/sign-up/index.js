import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';

export default function SignUp() {
  const router = useRouter();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const checkPasswordStrength = (password) => {
    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const mediumPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (strongPassword.test(password)) {
      setPasswordStrength('Strong Password');
    } else if (mediumPassword.test(password)) {
      setPasswordStrength('Medium Password');
    } else {
      setPasswordStrength('Weak Password');
    }
  };

  const OnCreateAccount = () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show('Please enter all details', ToastAndroid.LONG);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log(user);

        // Show success message
        ToastAndroid.show('Account created successfully!', ToastAndroid.LONG);

        // Redirect to Sign In page or perform other actions as needed
        // router.replace('/auth/sign-in'); // Uncomment if you want to auto-login after account creation
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);

        // Show error message if account creation fails
        ToastAndroid.show('Account creation failed. Please try again.', ToastAndroid.LONG);
      });
  };

  return (
    <View style={{ padding: 25, paddingTop: 50, backgroundColor: Colors.WHITE, height: '100%' }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 30 }}>Create New Account</Text>

      <View style={{ marginTop: 38 }}>
        <Text>Full Name</Text>
        <TextInput
          style={{ borderWidth: 1, borderRadius: 15, padding: 15, borderColor: '#808080' }}
          placeholder="User Full Name"
          onChangeText={(value) => setFullName(value)}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>Email</Text>
        <TextInput
          style={{ borderWidth: 1, borderRadius: 15, padding: 15, borderColor: '#808080' }}
          onChangeText={(value) => setEmail(value)}
          placeholder="Enter Email"
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={{ borderWidth: 1, borderRadius: 15, padding: 15, borderColor: '#808080' }}
          onChangeText={(value) => {
            setPassword(value);
            checkPasswordStrength(value); // Check password strength on change
          }}
          placeholder="Enter Password"
        />
        <Text style={{ marginTop: 5, color: passwordStrength === 'Strong Password' ? 'green' : passwordStrength === 'Medium Password' ? 'orange' : 'red' }}>
          {passwordStrength}
        </Text>
      </View>

      <TouchableOpacity
        onPress={OnCreateAccount}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}>
        <Text style={{ color: Colors.WHITE, textAlign: 'center' }}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('/auth/sign-in')}
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          borderWidth: 1,
          marginTop: 20,
        }}>
        <Text style={{ color: Colors.PRIMARY, textAlign: 'center' }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
