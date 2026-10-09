import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';

type Props = {
  onSignIn: (email: string, country: string) => void;
  onGoToSignUp: (defaultCountry: string) => void;
  defaultCountry?: string;
};

export default function SignInScreen({onSignIn, onGoToSignUp, defaultCountry = 'India'}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>(defaultCountry);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const countryThemes: Record<string, { accent: string; highlight: string; tagline: string; stadium: string }> = {
    India: {
      accent: '#0F52BA', // Royal Sapphire Blue
      highlight: '#138808', // Indian Green
      tagline: 'Wankhede • Eden Gardens • Narendra Modi Stadium',
      stadium: '🇮🇳 India Venues',
    },
    Australia: {
      accent: '#00843D', // Australian Deep Green
      highlight: '#FFCD00',
      tagline: 'MCG • SCG • Adelaide Oval • Optus Stadium',
      stadium: '🇦🇺 Australia Venues',
    },
    England: {
      accent: '#002040', // Deep Navy
      highlight: '#CE1124',
      tagline: "Lord's • The Oval • Edgbaston • Trent Bridge",
      stadium: '🇬🇧 England Venues',
    },
    Afghanistan: {
      accent: '#0284C7', // Sky Blue
      highlight: '#000000',
      tagline: 'Kabul International Stadium • Ghazi Amanullah',
      stadium: '🇦🇫 Afghanistan Venues',
    },
    'Sri Lanka': {
      accent: '#8B1A1A', // Maroon Red
      highlight: '#FF8C00',
      tagline: 'R.Premadasa • Galle Fort • Pallekele',
      stadium: '🇱🇰 Sri Lanka Venues',
    },
    'New Zealand': {
      accent: '#334155', // Slate Grey
      highlight: '#0F172A',
      tagline: 'Basin Reserve • Hagley Oval • Eden Park',
      stadium: '🇳🇿 New Zealand Venues',
    },
    'South Africa': {
      accent: '#007749', // Springbok Green
      highlight: '#FFB81C',
      tagline: 'Newlands • Wanderers • SuperSport Park',
      stadium: '🇿🇦 South Africa Venues',
    },
    'West Indies': {
      accent: '#7B2D26', // Crimson Maroon
      highlight: '#FFC72C',
      tagline: 'Kensington Oval • Sabina Park • Queens Park',
      stadium: '🏝️ West Indies Venues',
    },
  };

  const theme = countryThemes[selectedCountry] || countryThemes.India;

  function handleSubmit() {
    setError(null);
    setSuccessMessage(null);
    if (!email.trim() || !password) {
      setError('Please enter both your email and password.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    onSignIn(email.trim(), selectedCountry);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        {/* Decorative soft ambient background glows */}
        <View style={[styles.glowTop, {backgroundColor: theme.accent + '0D'}]} />
        <View style={[styles.glowBottom, {backgroundColor: theme.accent + '08'}]} />

        <View style={styles.content}>
          {/* Professional Header Branding */}
          <View style={styles.logoContainer}>
            <View style={styles.logoRing}>
              <Image 
                source={require('../../assets/stadium_logo.jpg')} 
                style={styles.logoImage} 
                resizeMode="cover"
              />
            </View>
            <Text style={styles.appName}>CricVenue</Text>
            <Text style={styles.appSubtitle}>STADIUM TICKET & SUITE RESERVATIONS</Text>
          </View>

          {/* Professional Card Container */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Sign In to Your Account</Text>
              <Text style={styles.cardSubtitle}>Select your primary region to customize venue availability</Text>
            </View>

            {/* Country / Region Selector */}
            <View style={styles.regionWrapper}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.countryScroller} 
                contentContainerStyle={styles.countrySelectorContent}
              >
                {Object.keys(countryThemes).map((country) => {
                  const isSelected = selectedCountry === country;
                  const flagMap: Record<string, string> = {
                    'India': '🇮🇳', 'Australia': '🇦🇺', 'England': '🇬🇧',
                    'Afghanistan': '🇦🇫', 'Sri Lanka': '🇱🇰', 'New Zealand': '🇳🇿',
                    'South Africa': '🇿🇦', 'West Indies': '🏝️',
                  };
                  const shortMap: Record<string, string> = {
                    'India': 'India', 'Australia': 'Australia', 'England': 'England',
                    'Afghanistan': 'Afghanistan', 'Sri Lanka': 'Sri Lanka', 'New Zealand': 'New Zealand',
                    'South Africa': 'South Africa', 'West Indies': 'West Indies',
                  };
                  return (
                    <TouchableOpacity
                      key={country}
                      style={[
                        styles.countryTab,
                        isSelected && [styles.countryTabSelected, {backgroundColor: theme.accent, borderColor: theme.accent}],
                      ]}
                      onPress={() => setSelectedCountry(country)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.countryTabText, isSelected && styles.countryTabTextSelected]}>
                        {flagMap[country]} {shortMap[country]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Region Tagline Badge */}
            <View style={[styles.taglineBadge, {backgroundColor: theme.accent + '10', borderColor: theme.accent + '25'}]}>
              <Text style={[styles.taglineText, {color: theme.accent}]}>
                📍 {theme.tagline}
              </Text>
            </View>

            {/* Error Banner */}
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Success Banner */}
            {successMessage ? (
              <View style={styles.successContainer}>
                <Text style={styles.successIcon}>✅</Text>
                <Text style={styles.successText}>{successMessage}</Text>
              </View>
            ) : null}

            {/* Form Fields */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="name@example.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.inputLabel}>Password</Text>
                <TouchableOpacity
                  onPress={() => {
                    setError(null);
                    setSuccessMessage(null);
                    if (!email.trim()) {
                      setError('Please enter your email address first to reset your password.');
                    } else {
                      setSuccessMessage(`Password reset link sent to ${email.trim()}`);
                    }
                  }}
                >
                  <Text style={[styles.forgotPasswordText, {color: theme.accent}]}>Forgot?</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Enter your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.6}
                >
                  <Text style={styles.eyeButtonText}>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign In Primary Button */}
            <TouchableOpacity
              style={[styles.signInButton, {backgroundColor: theme.accent}]}
              onPress={handleSubmit}
              activeOpacity={0.85}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.socialDividerText}>OR CONTINUE WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Logins */}
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => onSignIn('user@google.com', selectedCountry)}
                activeOpacity={0.7}
              >
                <Image source={require('../../assets/google_logo.png')} style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => onSignIn('user@apple.com', selectedCountry)}
                activeOpacity={0.7}
              >
                <Image source={require('../../assets/apple_logo.png')} style={[styles.socialIcon, {resizeMode: 'contain'}]} />
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Redirect Footer */}
            <View style={styles.redirectRow}>
              <Text style={styles.redirectText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => onGoToSignUp(selectedCountry)}>
                <Text style={[styles.redirectLink, {color: theme.accent}]}> Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Pure clean white background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  glowTop: {
    position: 'absolute',
    top: -80,
    alignSelf: 'center',
    width: 380,
    height: 380,
    borderRadius: 190,
  },
  glowBottom: {
    position: 'absolute',
    bottom: -100,
    right: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 36,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoRing: {
    padding: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 12,
  },
  logoImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  appName: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A', // Slate navy
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 2,
    marginTop: 4,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  regionWrapper: {
    marginBottom: 12,
  },
  countryScroller: {
    marginHorizontal: -4,
  },
  countrySelectorContent: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  countryTab: {
    marginHorizontal: 3,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  countryTabSelected: {
    borderWidth: 1,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  countryTabText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  countryTabTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  taglineBadge: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  taglineText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  errorIcon: {
    marginRight: 8,
    fontSize: 14,
  },
  errorText: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  successIcon: {
    marginRight: 8,
    fontSize: 14,
  },
  successText: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputLabel: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '500',
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 45,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  eyeButtonText: {
    fontSize: 16,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontWeight: '600',
  },
  signInButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 6,
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  socialDividerText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    marginHorizontal: 12,
    letterSpacing: 0.8,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialButtonText: {
    color: '#1E293B',
    fontSize: 14,
    fontWeight: '600',
  },
  redirectRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  redirectText: {
    fontSize: 13,
    color: '#64748B',
  },
  redirectLink: {
    fontSize: 13,
    fontWeight: '700',
  },
});


