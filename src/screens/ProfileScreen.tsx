import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Props = {
  userName: string;
  userEmail: string;
  userPhone?: string;
  onUpdateProfile: (newName: string, newPhone: string) => void;
  onSignOut: () => void;
  onBack: () => void;
};

// Vector Icons
function UserIcon({color = '#64748B'}: {color?: string}) {
  return (
    <View style={iconStyles.userContainer}>
      <View style={[iconStyles.userHead, {backgroundColor: color}]} />
      <View style={[iconStyles.userBody, {backgroundColor: color}]} />
    </View>
  );
}

function PhoneIcon({color = '#64748B'}: {color?: string}) {
  return (
    <View style={[iconStyles.phoneFrame, {borderColor: color}]}>
      <View style={[iconStyles.phoneSpeaker, {backgroundColor: color}]} />
      <View style={[iconStyles.phoneHomeBtn, {backgroundColor: color}]} />
    </View>
  );
}

function EmailIcon({color = '#64748B'}: {color?: string}) {
  return (
    <View style={[iconStyles.emailEnvelope, {borderColor: color}]}>
      <View style={[iconStyles.emailFlapLeft, {borderColor: color}]} />
      <View style={[iconStyles.emailFlapRight, {borderColor: color}]} />
    </View>
  );
}

export default function ProfileScreen({
  userName,
  userEmail,
  userPhone = '',
  onUpdateProfile,
  onSignOut,
  onBack,
}: Props) {
  const [name, setName] = useState(userName || 'User');
  const [phone, setPhone] = useState(userPhone);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const initialLetter = (name.trim() || 'User').charAt(0).toUpperCase();

  function handleSave() {
    onUpdateProfile(name.trim() || 'User', phone.trim());
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(null), 3000);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={true}>
        {/* HEADER BAR */}
        <View style={styles.topHeaderBar}>
          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
            <Text style={styles.backButtonText}>← Back to Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          {/* AVATAR BADGE */}
          <View style={styles.avatarSection}>
            <View style={styles.bigAvatarCircle}>
              <Text style={styles.avatarLetter}>{initialLetter}</Text>
            </View>
            <Text style={styles.profileNameTitle}>{name || 'User'}</Text>
            <Text style={styles.profileEmailSub}>{userEmail || 'user@example.com'}</Text>
          </View>

          {/* SUCCESS NOTIFICATION */}
          {successMsg ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>✅ {successMsg}</Text>
            </View>
          ) : null}

          {/* FORM FIELDS */}
          <Text style={styles.sectionHeading}>ACCOUNT DETAILS</Text>

          {/* Display Name Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Display Name</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconBox}>
                <UserIcon color="#64748B" />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="User"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Email Address Field (Read-only) */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <View style={[styles.inputWrapper, styles.disabledWrapper]}>
              <View style={styles.iconBox}>
                <EmailIcon color="#94A3B8" />
              </View>
              <TextInput
                style={[styles.textInput, styles.disabledText]}
                value={userEmail}
                editable={false}
              />
            </View>
          </View>

          {/* Phone Number Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconBox}>
                <PhoneIcon color="#64748B" />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Add phone number"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          {/* SAVE BUTTON */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.88}
          >
            <Text style={styles.saveButtonText}>Save Profile Changes</Text>
          </TouchableOpacity>

          {/* DIVIDER */}
          <View style={styles.divider} />

          {/* SIGN OUT BUTTON */}
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={onSignOut}
            activeOpacity={0.85}
          >
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const iconStyles = StyleSheet.create({
  userContainer: {
    width: 16,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userHead: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginBottom: 1,
  },
  userBody: {
    width: 14,
    height: 7,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  phoneFrame: {
    width: 14,
    height: 20,
    borderRadius: 3,
    borderWidth: 1.8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  phoneSpeaker: {
    width: 4,
    height: 1.5,
    borderRadius: 1,
  },
  phoneHomeBtn: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  emailEnvelope: {
    width: 16,
    height: 12,
    borderRadius: 2,
    borderWidth: 1.8,
    position: 'relative',
    overflow: 'hidden',
  },
  emailFlapLeft: {
    position: 'absolute',
    left: -2,
    top: -2,
    width: 10,
    height: 8,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    transform: [{rotate: '30deg'}],
  },
  emailFlapRight: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 10,
    height: 8,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    transform: [{rotate: '-30deg'}],
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  topHeaderBar: {
    width: '100%',
    maxWidth: 440,
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00875A',
  },
  profileCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  bigAvatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00875A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#059669',
    shadowColor: '#00875A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarLetter: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  profileNameTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  profileEmailSub: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  successBox: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 18,
    alignItems: 'center',
  },
  successText: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FAFAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  disabledWrapper: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  iconBox: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 50,
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '500',
  },
  disabledText: {
    color: '#64748B',
  },
  saveButton: {
    height: 50,
    backgroundColor: '#00875A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#00875A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 24,
  },
  signOutButton: {
    height: 48,
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#991B1B',
    fontSize: 15,
    fontWeight: '800',
  },
});
