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
  ImageBackground,
} from 'react-native';

type Props = {
  onSignIn: (email: string, country: string) => void;
  onGoToSignUp: (defaultCountry: string) => void;
  defaultCountry?: string;
};

export default function SignInScreen({onSignIn, onGoToSignUp, defaultCountry = 'India'}: Props) {
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>(defaultCountry);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const countryDialCodes: Record<string, string> = {
    India: '+91',
    Australia: '+61',
    England: '+44',
    Afghanistan: '+93',
    'Sri Lanka': '+94',
    'New Zealand': '+64',
    'South Africa': '+27',
    'West Indies': '+1-876',
  };

  const countryThemes: Record<string, { accent: string; tagline: string }> = {
    India: { accent: '#00875A', tagline: 'Wankhede • Eden Gardens • Narendra Modi' },
    Australia: { accent: '#00843D', tagline: 'MCG • SCG • Adelaide Oval • Optus' },
    England: { accent: '#002040', tagline: "Lord's • The Oval • Edgbaston • Trent Bridge" },
    Afghanistan: { accent: '#0284C7', tagline: 'Kabul International • Ghazi Amanullah' },
    'Sri Lanka': { accent: '#8B1A1A', tagline: 'R.Premadasa • Galle Fort • Pallekele' },
    'New Zealand': { accent: '#1E293B', tagline: 'Basin Reserve • Hagley Oval • Eden Park' },
    'South Africa': { accent: '#007749', tagline: 'Newlands • Wanderers • SuperSport Park' },
    'West Indies': { accent: '#7B2D26', tagline: 'Kensington Oval • Sabina Park • Queens Park' },
  };

  const theme = countryThemes[selectedCountry] || countryThemes.India;

  function handleSubmit() {
    setError(null);
    setSuccessMessage(null);
    if (!phoneOrEmail.trim() || !password) {
      setError('Please enter your phone number or email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    onSignIn(phoneOrEmail.trim(), selectedCountry);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        {/* HERO SECTION / BANNER */}
        <ImageBackground
          source={require('../assets/gabba.png')}
          style={styles.heroBackground}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            {/* StadiumBook Logo Header */}
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <View style={styles.wicketIconContainer}>
                  <View style={styles.wicketStick} />
                  <View style={styles.wicketStick} />
                  <View style={styles.wicketStick} />
                  <View style={styles.cricketBall} />
                </View>
              </View>
              <View>
                <Text style={styles.brandTitle}>
                  Stadium<Text style={styles.brandTitleHighlight}>Book</Text>
                </Text>
                <Text style={styles.brandTagline}>Book  •  Play  •  Enjoy</Text>
              </View>
            </View>

            {/* Hero Main Copy */}
            <View style={styles.heroCopyBlock}>
              <Text style={styles.heroTitle}>Your Next Match</Text>
              <Text style={styles.heroTitleGreen}>Starts Here</Text>
              <Text style={styles.heroSubtitle}>
                Find and book the best cricket stadiums near you. Play, practice or host your own match.
              </Text>
            </View>

            {/* Feature Badges */}
            <View style={styles.featuresRow}>
              <View style={styles.featureItem}>
                <View style={styles.featureIconCircle}>
                  <Text style={styles.featureIconText}>📅</Text>
                </View>
                <Text style={styles.featureLabel}>Easy{'\n'}Booking</Text>
              </View>

              <View style={styles.featureDivider} />

              <View style={styles.featureItem}>
                <View style={styles.featureIconCircle}>
                  <Text style={styles.featureIconText}>📍</Text>
                </View>
                <Text style={styles.featureLabel}>Verified{'\n'}Stadiums</Text>
              </View>

              <View style={styles.featureDivider} />

              <View style={styles.featureItem}>
                <View style={styles.featureIconCircle}>
                  <Text style={styles.featureIconText}>🛡️</Text>
                </View>
                <Text style={styles.featureLabel}>Secure{'\n'}Payments</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* LOGIN FORM CARD */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Welcome Back!</Text>
            <Text style={styles.cardSubtitle}>
              Log in to your account to continue booking your cricket stadium.
            </Text>
          </View>

          {/* Region / Country Selector */}
          <View style={styles.countrySection}>
            <Text style={styles.countryLabel}>SELECT YOUR REGION</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.countryScrollerContent}
            >
              {Object.keys(countryThemes).map((country) => {
                const isSelected = selectedCountry === country;
                const flagMap: Record<string, string> = {
                  India: '🇮🇳',
                  Australia: '🇦🇺',
                  England: '🇬🇧',
                  Afghanistan: '🇦🇫',
                  'Sri Lanka': '🇱🇰',
                  'New Zealand': '🇳🇿',
                  'South Africa': '🇿🇦',
                  'West Indies': '🏝️',
                };
                return (
                  <TouchableOpacity
                    key={country}
                    style={[
                      styles.countryChip,
                      isSelected && styles.countryChipSelected,
                    ]}
                    onPress={() => setSelectedCountry(country)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.countryChipText, isSelected && styles.countryChipTextSelected]}>
                      {flagMap[country]} {country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
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
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Text style={styles.fieldIcon}>📱</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Phone Number or Email"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={phoneOrEmail}
                onChangeText={setPhoneOrEmail}
              />
              <View style={styles.dialCodeBadge}>
                <Text style={styles.dialCodeText}>{countryDialCodes[selectedCountry] || '+91'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Text style={styles.fieldIcon}>🔒</Text>
              <TextInput
                style={[styles.textInput, {paddingRight: 45}]}
                placeholder="Password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeToggle}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.6}
              >
                <Text style={styles.eyeToggleText}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember me & Forgot Password */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.rememberBox}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setError(null);
                if (!phoneOrEmail.trim()) {
                  setError('Please enter your phone number or email first.');
                } else {
                  setSuccessMessage(`Password reset code sent to ${phoneOrEmail.trim()}`);
                }
              }}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Primary CTA Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.loginButtonText}>Login  ➔</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Logins */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => onSignIn('user@google.com', selectedCountry)}
              activeOpacity={0.7}
            >
              <Image source={require('../../assets/google_logo.png')} style={styles.googleIcon} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Redirect Footer */}
          <View style={styles.redirectRow}>
            <Text style={styles.redirectPrompt}>New to StadiumBook?</Text>
            <TouchableOpacity onPress={() => onGoToSignUp(selectedCountry)}>
              <Text style={styles.redirectLink}> Create an Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1728',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  heroBackground: {
    width: '100%',
    minHeight: 340,
    justifyContent: 'flex-end',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(7, 18, 33, 0.78)',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  wicketIconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 22,
    width: 22,
    justifyContent: 'space-between',
    position: 'relative',
  },
  wicketStick: {
    width: 3,
    height: 20,
    backgroundColor: '#00A859',
    borderRadius: 1.5,
  },
  cricketBall: {
    position: 'absolute',
    right: -2,
    top: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#00A859',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  brandTitleHighlight: {
    color: '#00A859',
  },
  brandTagline: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: 1.5,
    marginTop: 1,
  },
  heroCopyBlock: {
    marginVertical: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 34,
  },
  heroTitleGreen: {
    fontSize: 32,
    fontWeight: '900',
    color: '#00A859',
    lineHeight: 38,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 18,
    maxWidth: 340,
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
  },
  featureIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 168, 89, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureIconText: {
    fontSize: 13,
  },
  featureLabel: {
    fontSize: 11,
    color: '#E2E8F0',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 13,
  },
  featureDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 36,
  },
  cardHeader: {
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  countrySection: {
    marginBottom: 18,
  },
  countryLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  countryScrollerContent: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  countryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  countryChipSelected: {
    backgroundColor: '#00875A',
    borderColor: '#00875A',
  },
  countryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  countryChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
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
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
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
  inputGroup: {
    marginBottom: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  fieldIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 52,
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '500',
  },
  dialCodeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    marginLeft: 6,
  },
  dialCodeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  eyeToggle: {
    position: 'absolute',
    right: 12,
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  eyeToggleText: {
    fontSize: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  rememberBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#00875A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#00875A',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    marginTop: -2,
  },
  rememberText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00875A',
  },
  loginButton: {
    height: 54,
    backgroundColor: '#00875A',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00875A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    marginHorizontal: 14,
  },
  socialContainer: {
    marginBottom: 24,
  },
  googleButton: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  redirectRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  redirectPrompt: {
    fontSize: 14,
    color: '#64748B',
  },
  redirectLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00875A',
  },
});
