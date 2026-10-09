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
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleSubmit() {
    setError(null);
    setSuccessMessage(null);
    if (!phoneOrEmail.trim() || !password) {
      setError('Please enter your phone number or password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    onSignIn(phoneOrEmail.trim(), defaultCountry);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.formCard}>
          {/* BRAND LOGO HEADER */}
          <View style={styles.brandHeader}>
            <View style={styles.logoIconContainer}>
              <View style={styles.wicketGroup}>
                <View style={styles.wicketBar} />
                <View style={styles.wicketBar} />
                <View style={styles.wicketBar} />
              </View>
              <View style={styles.cricketSeamBall} />
              <View style={styles.greenArc} />
            </View>
            <Text style={styles.brandName}>
              Stadium<Text style={styles.brandNameGreen}>Book</Text>
            </Text>
            <Text style={styles.brandTagline}>Book  •  Play  •  Enjoy</Text>
          </View>

          {/* WELCOME BACK TITLE */}
          <View style={styles.headerTextBlock}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>
              Log in to your account to continue booking your cricket stadium.
            </Text>
          </View>

          {/* ERROR / SUCCESS NOTIFICATIONS */}
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {successMessage ? (
            <View style={styles.successBox}>
              <Text style={styles.successIcon}>✅</Text>
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          ) : null}

          {/* INPUT FORM */}
          {/* Phone Number Input */}
          <View style={styles.inputFieldContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.leftInputIcon}>📱</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Phone Number"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                autoCapitalize="none"
                value={phoneOrEmail}
                onChangeText={setPhoneOrEmail}
              />
              <View style={styles.phoneDivider} />
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputFieldContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.leftInputIcon}>🔒</Text>
              <TextInput
                style={[styles.textInput, {paddingRight: 45}]}
                placeholder="Password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeToggleButton}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.6}
              >
                <Text style={styles.eyeToggleIcon}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* REMEMBER ME & FORGOT PASSWORD */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.rememberBox}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberLabel}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setError(null);
                if (!phoneOrEmail.trim()) {
                  setError('Please enter your phone number first.');
                } else {
                  setSuccessMessage(`Password reset code sent to ${phoneOrEmail.trim()}`);
                }
              }}
            >
              <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* LOG IN BUTTON */}
          <TouchableOpacity
            style={styles.logInButton}
            onPress={handleSubmit}
            activeOpacity={0.88}
          >
            <Text style={styles.logInButtonText}>Log In  ➔</Text>
          </TouchableOpacity>

          {/* OR DIVIDER */}
          <View style={styles.orDividerRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          {/* GOOGLE SOCIAL LOGIN */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => onSignIn('user@google.com', defaultCountry)}
            activeOpacity={0.75}
          >
            <Image
              source={require('../../assets/google_logo.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* CREATE ACCOUNT LINK */}
          <View style={styles.footerRow}>
            <Text style={styles.footerPrompt}>New to StadiumBook?</Text>
            <TouchableOpacity onPress={() => onGoToSignUp(defaultCountry)}>
              <Text style={styles.createAccountLink}>Create an Account</Text>
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
    backgroundColor: '#FAFAFC',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  formCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 36,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  wicketGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 30,
    width: 26,
    justifyContent: 'space-between',
  },
  wicketBar: {
    width: 3.5,
    height: 28,
    backgroundColor: '#0B192C',
    borderRadius: 2,
  },
  cricketSeamBall: {
    position: 'absolute',
    right: 8,
    top: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0F2C59',
    borderWidth: 2,
    borderColor: '#00875A',
  },
  greenArc: {
    position: 'absolute',
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: '#00875A',
    borderLeftColor: '#00875A',
    transform: [{rotate: '-45deg'}],
  },
  brandName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0B192C',
    letterSpacing: -0.8,
  },
  brandNameGreen: {
    color: '#00875A',
  },
  brandTagline: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 2,
    marginTop: 4,
  },
  headerTextBlock: {
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0B192C',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 12,
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
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
    borderWidth: 1,
    borderRadius: 12,
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
  inputFieldContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: '#FAFAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  leftInputIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    height: 52,
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '500',
  },
  phoneDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 10,
  },
  countryCodeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  eyeToggleButton: {
    position: 'absolute',
    right: 14,
    height: 52,
    justifyContent: 'center',
  },
  eyeToggleIcon: {
    fontSize: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 24,
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
  checkboxChecked: {
    backgroundColor: '#00875A',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    marginTop: -1,
  },
  rememberLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  forgotPasswordLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00875A',
  },
  logInButton: {
    height: 52,
    backgroundColor: '#00875A',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00875A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  logInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  orDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    marginHorizontal: 14,
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
    marginBottom: 28,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B192C',
  },
  footerRow: {
    alignItems: 'center',
  },
  footerPrompt: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
  },
  createAccountLink: {
    fontSize: 14,
    fontWeight: '800',
    color: '#00875A',
  },
});
