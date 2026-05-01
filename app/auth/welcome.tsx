import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { COLORS } from '@/constants/theme';

export default function WelcomeScreen() {
  return (
    <LinearGradient colors={[COLORS.gradientTop, COLORS.gradientBottomLight]} style={styles.container}>
      <View style={styles.inner}>
        <View style={{ flex: 1 }} />
        <Text style={styles.title}>Welcome to InnerBloom</Text>
        <View style={styles.logoBox}>
          <Image source={require('@/assets/images/icon.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.tagline}>Grow through what you go through.</Text>
        <Text style={styles.subtitle}>A gentle space for your mental well-being.</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/signup'as any)}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
        <View style={{ height: 60 }} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, alignItems: 'center', paddingHorizontal: 28, paddingTop: 40 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  logoBox: { width: 280, height: 280, marginVertical: 20 },
  logo: { width: '100%', height: '100%' },
  tagline: { fontSize: 18, fontWeight: '700', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: 8 },
  button: {
    backgroundColor: COLORS.primary, paddingVertical: 16, paddingHorizontal: 60,
    borderRadius: 30,
  },
  buttonText: { color: '#fff', fontSize: 16, letterSpacing: 1.2, fontWeight: '600' },
});
