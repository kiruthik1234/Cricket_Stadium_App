import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

type StandInfo = {
  name: string;
  priceMultiplier: number;
  description: string;
};

type Stadium = {
  name: string;
  city: string;
  capacity: string;
  price: string;
  rating: string;
  highlightColor: string;
  stands: StandInfo[];
};

type Props = {
  stadium: Stadium;
  onConfirmBooking: (seats: string[], totalCost: string) => void;
  onCancel: () => void;
};

export default function SeatSelectionScreen({stadium, onConfirmBooking, onCancel}: Props) {
  const [selectedStandName, setSelectedStandName] = useState<string>(stadium.stands[0]?.name || '');
  const [localSelectedSeats, setLocalSelectedSeats] = useState<string[]>([]);

  // Find the active stand object
  const activeStand = useMemo(() => {
    return stadium.stands.find((s) => s.name === selectedStandName) || stadium.stands[0];
  }, [stadium.stands, selectedStandName]);

  // Parse price and currency details
  const {currency, basePrice} = useMemo(() => {
    let curr = '₹';
    if (stadium.price.includes('$')) {
      curr = '$';
    } else if (stadium.price.includes('£')) {
      curr = '£';
    }
    const numbersOnly = stadium.price.replace(/[^0-9]/g, '');
    const priceNum = parseInt(numbersOnly, 10) || 10000;
    return {currency: curr, basePrice: priceNum};
  }, [stadium.price]);

  const activeSeatPrice = Math.round(basePrice * (activeStand?.priceMultiplier || 1.0));

  // Rows and Columns for our Seat Grid (5 rows A-E, 8 seats per row)
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  // Deterministic reserved seats based on the stadium name and stand name
  const reservedSeats = useMemo(() => {
    const seed = stadium.name.length + selectedStandName.length;
    const reserved: Set<string> = new Set();
    
    // Reserve roughly 30% of the seats deterministically
    rows.forEach((row) => {
      seatNumbers.forEach((num) => {
        const id = `${row}${num}`;
        const charCodeSum = id.charCodeAt(0) + id.charCodeAt(1) + seed;
        if (charCodeSum % 3 === 0) {
          reserved.add(id);
        }
      });
    });
    return reserved;
  }, [stadium.name, selectedStandName]);

  const handleSeatPress = (seatId: string) => {
    if (reservedSeats.has(seatId)) {
      return; // Can't select reserved seats
    }

    if (localSelectedSeats.includes(seatId)) {
      setLocalSelectedSeats(localSelectedSeats.filter((s) => s !== seatId));
    } else {
      setLocalSelectedSeats([...localSelectedSeats, seatId]);
    }
  };

  const totalCost = localSelectedSeats.length * activeSeatPrice;
  const formattedTotalCost = `${currency}${totalCost.toLocaleString()}`;

  const handleProceed = () => {
    if (localSelectedSeats.length === 0) {
      Alert.alert('No Seats Selected', 'Please select at least one seat to book.');
      return;
    }
    const seatsList = localSelectedSeats.map((seat) => `${selectedStandName} - ${seat}`);
    onConfirmBooking(seatsList, formattedTotalCost);
  };

  // Helper to place stand names on layout positions
  const getStandNameAt = (index: number) => {
    return stadium.stands[index]?.name || '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onCancel}>
            <Text style={styles.backButtonText}>← Dashboard</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{stadium.name}</Text>
          <Text style={styles.headerSubtitle}>📍 {stadium.city}</Text>
        </View>

        {/* Stadium Center Visual Structure (Cricket Field & Pitch) */}
        <View style={styles.fieldSection}>
          <Text style={styles.sectionTitle}>Stadium Map Structure</Text>
          
          <View style={styles.stadiumOvalFrame}>
            {/* Outfield Grass */}
            <View style={styles.outfieldGrass}>
              {/* Inner Circle Ring */}
              <View style={styles.innerCircle}>
                {/* Cricket Pitch */}
                <View style={styles.cricketPitch}>
                  <View style={styles.creaseLineTop} />
                  <View style={styles.creaseLineBottom} />
                </View>
              </View>
              {/* Boundary Ring */}
              <View style={styles.boundaryRing} />
            </View>

            {/* Dynamic Stand Labels Surrounding Field */}
            {getStandNameAt(0) ? (
              <Text
                style={[
                  styles.standLabel,
                  styles.northStandLabel,
                  selectedStandName === getStandNameAt(0) && styles.activeStandLabel,
                ]}
                numberOfLines={1}
              >
                {getStandNameAt(0)}
              </Text>
            ) : null}
            {getStandNameAt(1) ? (
              <Text
                style={[
                  styles.standLabel,
                  styles.southStandLabel,
                  selectedStandName === getStandNameAt(1) && styles.activeStandLabel,
                ]}
                numberOfLines={1}
              >
                {getStandNameAt(1)}
              </Text>
            ) : null}
            {getStandNameAt(2) ? (
              <Text
                style={[
                  styles.standLabel,
                  styles.eastStandLabel,
                  selectedStandName === getStandNameAt(2) && styles.activeStandLabel,
                ]}
                numberOfLines={1}
              >
                {getStandNameAt(2)}
              </Text>
            ) : null}
            {getStandNameAt(3) ? (
              <Text
                style={[
                  styles.standLabel,
                  styles.westStandLabel,
                  selectedStandName === getStandNameAt(3) && styles.activeStandLabel,
                ]}
                numberOfLines={1}
              >
                {getStandNameAt(3)}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Stand Selection Tabs */}
        <View style={styles.tabSection}>
          <Text style={styles.sectionTitle}>Select Stand Block</Text>
          <View style={styles.tabRow}>
            {stadium.stands.map((stand) => {
              const isActive = selectedStandName === stand.name;
              return (
                <TouchableOpacity
                  key={stand.name}
                  style={[
                    styles.tabButton,
                    isActive && {
                      borderColor: stadium.highlightColor,
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  ]}
                  onPress={() => {
                    setSelectedStandName(stand.name);
                    setLocalSelectedSeats([]); // Reset seat selections when changing stands
                  }}
                >
                  <Text
                    style={[styles.tabButtonText, isActive && {color: '#FFF', fontWeight: 'bold'}]}
                    numberOfLines={1}
                  >
                    {stand.name}
                  </Text>
                  <Text style={styles.tabMultiplier}>
                    {stand.priceMultiplier}x Rate
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Stand Description Info */}
        {activeStand ? (
          <View style={styles.descriptionSection}>
            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionTitle}>ℹ️ Stand Overview</Text>
              <Text style={styles.descriptionText}>{activeStand.description}</Text>
            </View>
          </View>
        ) : null}

        {/* Seat Selection Area */}
        <View style={styles.seatGridSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Select Seats ({selectedStandName})</Text>
            <Text style={[styles.seatPriceTag, {color: stadium.highlightColor}]}>
              {currency}{activeSeatPrice.toLocaleString()} / seat
            </Text>
          </View>

          {/* Seat Grid Layout */}
          <View style={styles.gridContainer}>
            {rows.map((row) => (
              <View key={row} style={styles.gridRow}>
                {/* Row Label */}
                <Text style={styles.rowLabel}>{row}</Text>
                
                {/* Seat Icons */}
                <View style={styles.seatRow}>
                  {seatNumbers.map((num) => {
                    const seatId = `${row}${num}`;
                    const isReserved = reservedSeats.has(seatId);
                    const isSelected = localSelectedSeats.includes(seatId);
                    
                    let seatStyle: any = styles.seatAvailable;
                    let seatTextStyle = styles.seatTextAvailable;
                    if (isReserved) {
                      seatStyle = styles.seatReserved;
                      seatTextStyle = styles.seatTextReserved;
                    } else if (isSelected) {
                      seatStyle = [styles.seatSelected, {backgroundColor: stadium.highlightColor}];
                      seatTextStyle = styles.seatTextSelected;
                    }

                    return (
                      <TouchableOpacity
                        key={seatId}
                        style={[styles.seatBox, seatStyle]}
                        onPress={() => handleSeatPress(seatId)}
                        disabled={isReserved}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.seatNumberText, seatTextStyle]}>{num}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                
                {/* Row Label Right */}
                <Text style={styles.rowLabel}>{row}</Text>
              </View>
            ))}
          </View>

          {/* Seat Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={styles.legendDotAvailable} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDotSelected, {backgroundColor: stadium.highlightColor}]} />
              <Text style={styles.legendText}>Selected</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendDotReserved} />
              <Text style={styles.legendText}>Reserved</Text>
            </View>
          </View>
        </View>

        {/* Bottom Booking Summary Pane */}
        <View style={styles.summaryPane}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Selected Seats</Text>
              <Text style={styles.summaryVal}>
                {localSelectedSeats.length > 0
                  ? localSelectedSeats.join(', ')
                  : 'None'}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={[styles.summaryVal, styles.summaryTotal, {color: stadium.highlightColor}]}>
                {formattedTotalCost}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.checkoutButton,
              {backgroundColor: localSelectedSeats.length > 0 ? stadium.highlightColor : 'rgba(255,255,255,0.08)'},
            ]}
            onPress={handleProceed}
            disabled={localSelectedSeats.length === 0}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.checkoutButtonText,
                {color: localSelectedSeats.length > 0 ? '#071510' : 'rgba(255,255,255,0.2)'},
              ]}
            >
              Confirm Booking ({localSelectedSeats.length} Seats)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071510',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  backButtonText: {
    color: '#ECEFF1',
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  fieldSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seatPriceTag: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stadiumOvalFrame: {
    height: 180,
    backgroundColor: 'rgba(13, 38, 28, 0.4)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    overflow: 'hidden',
  },
  outfieldGrass: {
    width: '90%',
    height: '75%',
    backgroundColor: '#1E4620', // Green turf
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)', // Boundary line
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: '65%',
    height: '65%',
    borderRadius: 50,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.15)', // 30-yard circle
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cricketPitch: {
    width: 14,
    height: 38,
    backgroundColor: '#D2B48C', // Clay pitch color
    borderWidth: 0.5,
    borderColor: '#FFF',
    justifyContent: 'space-between',
  },
  creaseLineTop: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFF',
    marginTop: 6,
  },
  creaseLineBottom: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFF',
    marginBottom: 6,
  },
  boundaryRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  standLabel: {
    position: 'absolute',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 9,
    fontWeight: 'bold',
    maxWidth: 90,
    textAlign: 'center',
  },
  activeStandLabel: {
    color: '#FFF',
    textShadowColor: 'rgba(255,255,255,0.4)',
    textShadowRadius: 4,
  },
  northStandLabel: {
    top: 6,
  },
  southStandLabel: {
    bottom: 6,
  },
  eastStandLabel: {
    right: -10,
    transform: [{rotate: '90deg'}],
  },
  westStandLabel: {
    left: -10,
    transform: [{rotate: '-90deg'}],
  },
  tabSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tabButton: {
    width: '48%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    marginBottom: 10,
    alignItems: 'center',
  },
  tabButtonText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  tabMultiplier: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 2,
  },
  descriptionSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 10,
    padding: 14,
  },
  descriptionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 18,
  },
  seatGridSection: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  gridContainer: {
    backgroundColor: 'rgba(13, 38, 28, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
    justifyContent: 'space-between',
  },
  rowLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 13,
    fontWeight: 'bold',
    width: 20,
    textAlign: 'center',
  },
  seatRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  seatBox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatAvailable: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  seatSelected: {
    // Dynamic background
  },
  seatReserved: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  seatNumberText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  seatTextAvailable: {
    color: '#ECEFF1',
  },
  seatTextSelected: {
    color: '#071510',
  },
  seatTextReserved: {
    color: 'rgba(255, 255, 255, 0.15)',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDotAvailable: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 6,
  },
  legendDotSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendDotReserved: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginRight: 6,
  },
  legendText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11,
  },
  summaryPane: {
    backgroundColor: 'rgba(13, 38, 28, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
  },
  summaryVal: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 2,
    maxWidth: 150,
  },
  summaryTotal: {
    fontSize: 18,
  },
  checkoutButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
