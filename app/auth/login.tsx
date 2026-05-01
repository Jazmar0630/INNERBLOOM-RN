import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { login } from '../services/auth';
import { COLORS } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) return Alert.alert('Error', 'Fill in all fields');
    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Login failed', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient colors={[COLORS.gradientTop, COLORS.gradientBottomLight]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <Text style={styles.subtitle}>and track your progress daily</Text>

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999"
          keyboardType="email-address" autoCapitalize="none"
          value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999"
          secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>LOG IN</Text>}
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.mutedText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.replace('/auth/signup'as any)}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 80 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  subtitle: { color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 28 },
  input: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    marginBottom: 16, fontSize: 15,
  },
  button: {
    backgroundColor: COLORS.primary, borderRadius: 30,
    paddingVertical: 16, alignItems: 'center', marginBottom: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 1 },
  signupRow: { flexDirection: 'row', justifyContent: 'center' },
  mutedText: { color: 'rgba(0,0,0,0.7)', fontSize: 14 },
  link: { color: '#565BFF', textDecorationLine: 'underline', fontSize: 14 },
});
