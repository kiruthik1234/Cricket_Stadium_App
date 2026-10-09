import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { generateMockSchedules } from '../data/mockSchedules';

type Props = {
  country: string;
  stadiums: any[];
  theme: { accent: string; highlight: string; textColor?: string };
  onBack: () => void;
};

export default function ScheduleScreen({ country, stadiums, theme, onBack }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={[styles.backButtonText, { color: theme.accent }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Matches in {country}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={true}>
        {stadiums.map((stadium, index) => {
          const schedules = generateMockSchedules(stadium.name, country);
          
          return (
            <View key={index} style={styles.stadiumCard}>
              <View style={[styles.cardHeader, { backgroundColor: theme.accent + '20', borderLeftColor: theme.accent }]}>
                <Text style={styles.stadiumName}>{stadium.name}</Text>
                <Text style={styles.cityName}>{stadium.city}</Text>
              </View>
              
              <View style={styles.matchesList}>
                {schedules.map(match => (
                  <View key={match.id} style={styles.matchItem}>
                    <View style={styles.matchDateCol}>
                      <Text style={styles.matchDate}>{match.date.split(' ')[0]}</Text>
                      <Text style={styles.matchMonth}>{match.date.split(' ')[1]}</Text>
                    </View>
                    
                    <View style={styles.matchDetailsCol}>
                      <Text style={styles.matchType}>{match.matchType} Match • {match.time}</Text>
                      <View style={styles.teamsRow}>
                        <Text style={styles.teamText}>{match.team1}</Text>
                        <Text style={styles.vsText}>vs</Text>
                        <Text style={styles.teamText}>{match.team2}</Text>
                      </View>
                    </View>
                  </View>
                ))}
                {schedules.length === 0 && (
                  <Text style={styles.noMatchesText}>No upcoming matches scheduled.</Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#071510',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  stadiumCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardHeader: {
    padding: 16,
    borderLeftWidth: 4,
  },
  stadiumName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  cityName: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  matchesList: {
    padding: 16,
  },
  matchItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingBottom: 16,
  },
  matchDateCol: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 10,
    width: 60,
    marginRight: 16,
  },
  matchDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  matchMonth: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
  },
  matchDetailsCol: {
    flex: 1,
  },
  matchType: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 6,
    fontWeight: '500',
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  vsText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    marginHorizontal: 12,
    fontStyle: 'italic',
  },
  noMatchesText: {
    color: 'rgba(255,255,255,0.5)',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
});
