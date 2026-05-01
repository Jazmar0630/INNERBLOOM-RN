import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { signup } from '../services/auth';
import { COLORS } from '@/constants/theme';

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!username.trim() || username.length < 3) return Alert.alert('Error', 'Username min 3 characters');
    if (!email.includes('@')) return Alert.alert('Error', 'Enter a valid email');
    if (password.length < 6) return Alert.alert('Error', 'Password min 6 characters');
    if (password !== confirm) return Alert.alert('Error', 'Passwords do not match');
    if (!agreed) return Alert.alert('Error', 'Please agree to the privacy policy');

    setLoading(true);
    try {
      await signup(username.trim(), email.trim(), password);
      Alert.alert('Success', 'Account created! Please login.');
      router.replace('/auth/login'as any);
    } catch (e: any) {
      Alert.alert('Signup failed', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient colors={[COLORS.gradientTop, COLORS.gradientBottomLight]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>and start your journey today</Text>

        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#999"
          value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999"
          keyboardType="email-address" autoCapitalize="none"
          value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999"
          secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#999"
          secureTextEntry value={confirm} onChangeText={setConfirm} />

        <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
            {agreed && <Text style={{ color: '#fff', fontSize: 12 }}>✓</Text>}
          </View>
          <Text style={styles.checkText}>I have read the </Text>
          <Text style={styles.link}>privacy policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>SIGN UP</Text>}
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.checkText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace('/auth/login'as any)}>    
            <Text style={styles.link}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  subtitle: { color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 28 },
  input: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    marginBottom: 16, fontSize: 15,
  },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checkbox: {
    width: 20, height: 20, borderRadius: 4, borderWidth: 2,
    borderColor: COLORS.primary, marginRight: 8, alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: COLORS.primary },
  checkText: { color: 'rgba(0,0,0,0.7)', fontSize: 14 },
  link: { color: '#565BFF', textDecorationLine: 'underline', fontSize: 14 },
  button: {
    backgroundColor: COLORS.primary, borderRadius: 30,
    paddingVertical: 16, alignItems: 'center', marginBottom: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 1 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
});
