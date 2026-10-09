export type MatchType = 'T20I' | 'ODI' | 'Test' | 'League';

export type ScheduleItem = {
  id: string;
  date: string;
  team1: string;
  team2: string;
  matchType: MatchType;
  time: string;
};

// Simple pseudo-random generator based on a string seed so schedules stay consistent
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

const teamsByCountry: Record<string, string[]> = {
  India: ['🇮🇳 IND', '🇦🇺 AUS', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENG', '🇿🇦 SA', '🇳🇿 NZ'],
  Australia: ['🇦🇺 AUS', '🇮🇳 IND', '🇵🇰 PAK', '🇿🇦 SA', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENG'],
  England: ['🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENG', '🇦🇺 AUS', '🇮🇳 IND', '🇳🇿 NZ', '🇵🇰 PAK'],
  Afghanistan: ['🇦🇫 AFG', '🇮🇪 IRE', '🇿🇼 ZIM', '🇱🇰 SL', '🇧🇩 BAN'],
  'Sri Lanka': ['🇱🇰 SL', '🇮🇳 IND', '🇵🇰 PAK', '🇧🇩 BAN', '🇦🇫 AFG'],
  'New Zealand': ['🇳🇿 NZ', '🇦🇺 AUS', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENG', '🇵🇰 PAK', '🇿🇦 SA'],
  'South Africa': ['🇿🇦 SA', '🇮🇳 IND', '🇦🇺 AUS', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENG', '🇱🇰 SL'],
  'West Indies': ['🏝️ WI', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENG', '🇮🇳 IND', '🇿🇦 SA', '🇦🇺 AUS'],
};

const matchTypes: MatchType[] = ['T20I', 'ODI', 'Test'];

export function generateMockSchedules(stadiumName: string, country: string): ScheduleItem[] {
  const seed = hashString(stadiumName + country);
  const countryTeams = teamsByCountry[country] || teamsByCountry['India'];
  
  const schedules: ScheduleItem[] = [];
  
  // Generate 2 to 4 matches for the stadium
  const numMatches = 2 + (Math.abs(seed) % 3); 
  
  let currentDayOffset = Math.abs(seed) % 5 + 1; // start 1-5 days from now
  
  for (let i = 0; i < numMatches; i++) {
    const typeIndex = (Math.abs(seed) + i) % matchTypes.length;
    const matchType = matchTypes[typeIndex];
    
    // Pick teams
    const homeTeam = countryTeams[0]; // Usually the host nation
    const awayTeam = countryTeams[(Math.abs(seed) + i + 1) % (countryTeams.length - 1) + 1];
    
    // Pick date
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + currentDayOffset);
    const dateStr = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    
    // Pick time
    const isDayNight = (Math.abs(seed) + i) % 2 === 0;
    let timeStr = '10:30 AM';
    if (matchType === 'T20I') timeStr = '07:30 PM';
    else if (matchType === 'ODI' && isDayNight) timeStr = '01:30 PM';
    
    schedules.push({
      id: `${stadiumName.replace(/\s+/g, '-')}-match-${i}`,
      date: dateStr,
      time: timeStr,
      team1: homeTeam,
      team2: awayTeam,
      matchType,
    });
    
    // Advance days for next match
    currentDayOffset += (matchType === 'Test' ? 6 : Math.abs(seed + i) % 4 + 2);
  }
  
  return schedules;
}
