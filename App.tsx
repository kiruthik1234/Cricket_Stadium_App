/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SeatSelectionScreen from './src/screens/SeatSelectionScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import ProfileScreen from './src/screens/ProfileScreen';

type Screen = 'signin' | 'signup' | 'home' | 'schedule' | 'profile';

type StandInfo = {
  name: string;
  priceMultiplier: number;
  description: string;
};

type LayoutType = 'bowl' | 'disconnected' | 'lords' | 'adelaide' | 'dharamshala';

type Stadium = {
  name: string;
  city: string;
  capacity: string;
  price: string;
  rating: string;
  highlightColor: string;
  stands: StandInfo[];
  layoutType: LayoutType;
  logo?: any;
};

const stadiumData: Record<string, Stadium[]> = {
  India: [
    {
      name: 'Narendra Modi Stadium',
      city: 'Ahmedabad',
      capacity: '132,000 spectators',
      price: '₹75,000 / seat',
      rating: '⭐️ 4.9 (1.2k reviews)',
      highlightColor: '#FF9933',
      layoutType: 'bowl',
      logo: require('./src/assets/gt.png'),
      stands: [
        { name: "President's Box", priceMultiplier: 1.8, description: 'Luxury air-conditioned suites behind bowler wickets' },
        { name: 'Club Pavilion', priceMultiplier: 1.4, description: 'Premium corporate seats with gourmet food inclusion' },
        { name: 'North Stand', priceMultiplier: 1.0, description: 'Excellent straight-on view of the cricket pitch' },
        { name: 'Adani Stand', priceMultiplier: 0.8, description: 'Lively atmosphere close to deep boundary lines' },
      ],
    },
    {
      name: 'Wankhede Stadium',
      city: 'Mumbai',
      capacity: '33,108 spectators',
      price: '₹60,000 / seat',
      rating: '⭐️ 4.8 (850 reviews)',
      highlightColor: '#2196F3',
      layoutType: 'disconnected',
      logo: require('./src/assets/mi.png'),
      stands: [
        { name: 'Garware Pavilion', priceMultiplier: 1.5, description: 'Historic members reserve with direct pitch views' },
        { name: 'Sachin Tendulkar Stand', priceMultiplier: 1.2, description: 'Iconic stand dedicated to the batting maestro' },
        { name: 'Sunil Gavaskar Stand', priceMultiplier: 1.0, description: 'Great behind-the-wickets view of spin/seam action' },
        { name: 'Vijay Merchant Stand', priceMultiplier: 0.8, description: 'Popular budget-friendly outfield boundary seating' },
      ],
    },
    {
      name: 'Eden Gardens',
      city: 'Kolkata',
      capacity: '68,000 spectators',
      price: '₹55,000 / seat',
      rating: '⭐️ 4.7 (910 reviews)',
      highlightColor: '#138808',
      layoutType: 'bowl',
      logo: require('./src/assets/kkr.png'),
      stands: [
        { name: 'Club House VVIP', priceMultiplier: 1.6, description: 'Exclusive historical suites for ultimate viewing' },
        { name: 'B.C. Roy Stand', priceMultiplier: 1.1, description: 'Huge high-angle stand with panoramic views' },
        { name: 'High Court Stand', priceMultiplier: 1.0, description: 'Excellent side-on views of boundaries and runouts' },
        { name: 'L&R Block Fan Stand', priceMultiplier: 0.8, description: 'Loudest cheering zone for passionate local fans' },
      ],
    },
    {
      name: 'M. A. Chidambaram Stadium',
      city: 'Chennai',
      capacity: '38,200 spectators',
      price: '₹50,000 / seat',
      rating: '⭐️ 4.8 (730 reviews)',
      highlightColor: '#FFE082',
      layoutType: 'disconnected',
      logo: require('./src/assets/csk.png'),
      stands: [
        { name: 'Anna Pavilion', priceMultiplier: 1.5, description: 'Venerable pavilion seating at Bowlers End' },
        { name: 'MAC Terrace', priceMultiplier: 1.3, description: 'Breezy elevated viewing deck above sightscreen' },
        { name: 'C/D/E General Stand', priceMultiplier: 1.0, description: 'Lively crowd blocks deep on deep midwicket' },
        { name: 'G/H Cheerful Stand', priceMultiplier: 0.8, description: 'Budget fan blocks with great local drum squads' },
      ],
    },
    {
      name: 'M. Chinnaswamy Stadium',
      city: 'Bengaluru',
      capacity: '40,000 spectators',
      price: '₹55,000 / seat',
      rating: '⭐️ 4.8 (640 reviews)',
      highlightColor: '#E53935',
      layoutType: 'disconnected',
      logo: require('./src/assets/rcb.png'),
      stands: [
        { name: 'Pavilion End Suites', priceMultiplier: 1.5, description: 'Luxury seating at the historic pavilion end' },
        { name: 'Grand Stand', priceMultiplier: 1.2, description: 'Great wide-angle viewing above boundary ropes' },
        { name: 'BEML End', priceMultiplier: 1.0, description: 'Excellent view of pitch length and bowling action' },
        { name: 'East Fan Gallery', priceMultiplier: 0.8, description: 'Budget friendly stand with highly vocal crowds' },
      ],
    },
    {
      name: 'HPCA Stadium',
      city: 'Dharamshala',
      capacity: '23,000 spectators',
      price: '₹45,000 / seat',
      rating: '⭐️ 4.9 (580 reviews)',
      highlightColor: '#00E676',
      layoutType: 'dharamshala',
      logo: require('./src/assets/pbks.png'),
      stands: [
        { name: 'Himalayan Pavilion', priceMultiplier: 1.6, description: 'Premium stand directly facing Dhauladhar ranges' },
        { name: 'Snow View Stand', priceMultiplier: 1.2, description: 'Spectacular views of snowcapped mountain backdrops' },
        { name: 'North Stand', priceMultiplier: 1.0, description: 'Standard straight views with beautiful scenery' },
        { name: 'West Stand', priceMultiplier: 0.8, description: 'Affordable seats under the clear mountain air' },
      ],
    },
  ],
  Australia: [
    {
      name: 'Melbourne Cricket Ground (MCG)',
      city: 'Melbourne',
      capacity: '100,024 spectators',
      price: '$1,500 AUD / seat',
      rating: '⭐️ 4.9 (1.5k reviews)',
      highlightColor: '#FFCD00',
      layoutType: 'bowl',
      logo: require('./src/assets/mel.png'),
      stands: [
        { name: 'Members Pavilion', priceMultiplier: 1.8, description: 'Historic MCC Members Club Reserve experience' },
        { name: 'Great Southern Stand', priceMultiplier: 1.2, description: 'Massive multi-tier stand with panoramic field views' },
        { name: 'Olympic Stand', priceMultiplier: 1.1, description: 'Modern stand with outstanding straight-line views' },
        { name: 'Ponsford Stand', priceMultiplier: 0.8, description: 'Traditional stand behind the bowler arm sight-lines' },
      ],
    },
    {
      name: 'Sydney Cricket Ground (SCG)',
      city: 'Sydney',
      capacity: '48,000 spectators',
      price: '$1,200 AUD / seat',
      rating: '⭐️ 4.8 (640 reviews)',
      highlightColor: '#00843D',
      layoutType: 'bowl',
      logo: require('./src/assets/sydney.png'),
      stands: [
        { name: 'Members Pavilion', priceMultiplier: 1.6, description: 'Historic members clubhouse built in 1886' },
        { name: 'Victor Trumper Stand', priceMultiplier: 1.3, description: 'Premium modern stand honoring the batting pioneer' },
        { name: 'Brewongle Stand', priceMultiplier: 1.0, description: 'Superb elevated view of the pitch square' },
        { name: 'Clive Churchill Stand', priceMultiplier: 0.8, description: 'Budget level seating close to deep boundary action' },
      ],
    },
    {
      name: 'Adelaide Oval',
      city: 'Adelaide',
      capacity: '53,583 spectators',
      price: '$1,100 AUD / seat',
      rating: '⭐️ 4.8 (780 reviews)',
      highlightColor: '#8BC34A',
      layoutType: 'adelaide',
      logo: require('./src/assets/adelaide.png'),
      stands: [
        { name: 'Bradman Pavilion', priceMultiplier: 1.5, description: 'Premium grandstand named after Sir Donald Bradman' },
        { name: 'Riverbank Stand', priceMultiplier: 1.2, description: 'Modern southern stand overlooking the Torrens River' },
        { name: 'Chappell Stand', priceMultiplier: 1.0, description: 'Outstanding side-on view of the wickets' },
        { name: 'Northern Mound Hill', priceMultiplier: 0.7, description: 'Famous grassy slope picnic area for relaxed watching' },
      ],
    },
    {
      name: 'Optus Stadium',
      city: 'Perth',
      capacity: '60,000 spectators',
      price: '$1,300 AUD / seat',
      rating: '⭐️ 4.9 (510 reviews)',
      highlightColor: '#D4AF37',
      layoutType: 'bowl',
      logo: require('./src/assets/optus.png'),
      stands: [
        { name: 'River View Club', priceMultiplier: 1.6, description: 'Luxury air-conditioned club rooms facing Swan River' },
        { name: 'City View Stand', priceMultiplier: 1.3, description: 'Spectacular views towards the Perth CBD skyline' },
        { name: 'Victory Grandstand', priceMultiplier: 1.0, description: 'Superb straight-line view behind bowlers arm' },
        { name: 'Boundary Deck', priceMultiplier: 0.8, description: 'Lower bowl seats immediately adjacent to turf boundary' },
      ],
    },
    {
      name: 'The Gabba',
      city: 'Brisbane',
      capacity: '42,000 spectators',
      price: '$1,200 AUD / seat',
      rating: '⭐️ 4.7 (490 reviews)',
      highlightColor: '#00ACC1',
      layoutType: 'bowl',
      logo: require('./src/assets/gabba.png'),
      stands: [
        { name: 'Clem Jones Stand', priceMultiplier: 1.4, description: 'Excellent view behind bowler wickets at pavilion end' },
        { name: 'Bradman Stand', priceMultiplier: 1.2, description: 'High-visibility side-on view of batsman creases' },
        { name: 'Stanley Stand', priceMultiplier: 1.0, description: 'Great seats overlooking square leg/point areas' },
        { name: 'Boundary Deck', priceMultiplier: 0.8, description: 'Lively budget deck right next to deep fielders' },
      ],
    },
    {
      name: 'Bellerive Oval',
      city: 'Hobart',
      capacity: '20,000 spectators',
      price: '$950 AUD / seat',
      rating: '⭐️ 4.7 (320 reviews)',
      highlightColor: '#FFB300',
      layoutType: 'disconnected',
      logo: require('./src/assets/bellerive.png'),
      stands: [
        { name: 'Ricky Ponting Stand', priceMultiplier: 1.4, description: 'Vanguard grandstand named after Ricky Ponting' },
        { name: 'David Boon Stand', priceMultiplier: 1.2, description: 'Excellent elevated view of short-leg and creases' },
        { name: 'Southern Stand', priceMultiplier: 1.0, description: 'Outstanding behind-wicket view at Derwent river end' },
        { name: 'Members Stand', priceMultiplier: 0.9, description: 'Cozy members clubhouse view near player dugouts' },
      ],
    },
  ],
  England: [
    {
      name: "Lord's Cricket Ground",
      city: 'London',
      capacity: '31,100 spectators',
      price: '£950 / seat',
      rating: '⭐️ 5.0 (980 reviews)',
      highlightColor: '#E53935',
      layoutType: 'lords',
      logo: require('./src/assets/lord.png'),
      stands: [
        { name: 'Pavilion Stand', priceMultiplier: 1.9, description: 'Grade II listed Victorian structure (Formal Dress Required)' },
        { name: 'Grand Stand', priceMultiplier: 1.4, description: 'Modern elevated stand with unmatched views over outfield' },
        { name: 'Compton Stand', priceMultiplier: 1.1, description: 'Newly rebuilt stand with straight views from Nursery End' },
        { name: 'Edrich Stand', priceMultiplier: 1.1, description: 'Spectacular elevated companion stand at Nursery End' },
        { name: 'Futuristic Media Centre', priceMultiplier: 1.3, description: 'Unique space pod design with amazing press views' },
      ],
    },
    {
      name: 'The Kia Oval',
      city: 'London',
      capacity: '27,500 spectators',
      price: '£800 / seat',
      rating: '⭐️ 4.7 (420 reviews)',
      highlightColor: '#002040',
      layoutType: 'disconnected',
      logo: require('./src/assets/theoval.png'),
      stands: [
        { name: 'Galadari Stand', priceMultiplier: 1.5, description: 'State-of-the-art multi-tier stand with roof terrace' },
        { name: 'Members Pavilion', priceMultiplier: 1.4, description: 'Traditional pavilion building with field-side deck' },
        { name: 'Bedser Stand', priceMultiplier: 1.1, description: 'Named after Surrey legends, great view of spin bowling' },
        { name: 'Laker Boundary Stand', priceMultiplier: 0.8, description: 'Lively boundary-side seating near gas holders' },
      ],
    },
    {
      name: 'Edgbaston Stadium',
      city: 'Birmingham',
      capacity: '25,000 spectators',
      price: '£750 / seat',
      rating: '⭐️ 4.6 (380 reviews)',
      highlightColor: '#0D47A1',
      layoutType: 'disconnected',
      logo: require('./src/assets/edg.png'),
      stands: [
        { name: 'RES Pavilion Suites', priceMultiplier: 1.5, description: 'Premium hospitality lounges at the bowler end' },
        { name: 'Eric Hollies Stand', priceMultiplier: 1.3, description: 'Famous for loudest crowd, fancy dress, and party vibes' },
        { name: 'Wyatt Stand', priceMultiplier: 1.0, description: 'Traditional stand with excellent straight views' },
        { name: 'South Stand Boundary', priceMultiplier: 0.8, description: 'Budget level seating next to deep boundary ropes' },
      ],
    },
    {
      name: 'Trent Bridge',
      city: 'Nottingham',
      capacity: '17,500 spectators',
      price: '£700 / seat',
      rating: '⭐️ 4.8 (340 reviews)',
      highlightColor: '#004D40',
      layoutType: 'disconnected',
      logo: require('./src/assets/trent.png'),
      stands: [
        { name: 'Radcliffe Road Stand', priceMultiplier: 1.4, description: 'Modern, multi-story stand behind the wickets' },
        { name: 'Historic Pavilion', priceMultiplier: 1.3, description: 'Beautiful Victorian brick pavilion dating back to 1889' },
        { name: 'William Clarke Stand', priceMultiplier: 1.0, description: 'Popular family-friendly stand on deep boundary' },
        { name: 'Hound Road Stand', priceMultiplier: 0.8, description: 'Great value seats close to boundary rope action' },
      ],
    },
    {
      name: 'Headingley',
      city: 'Leeds',
      capacity: '18,350 spectators',
      price: '£750 / seat',
      rating: '⭐️ 4.7 (290 reviews)',
      highlightColor: '#1E88E5',
      layoutType: 'disconnected',
      logo: require('./src/assets/head.png'),
      stands: [
        { name: 'Carnegie Pavilion', priceMultiplier: 1.4, description: 'Premium state-of-the-art pavilion at bowler end' },
        { name: 'Western Terrace', priceMultiplier: 1.2, description: 'Vibrant, rowdy stand with amazing crowd banners and chants' },
        { name: 'East Stand Grand', priceMultiplier: 1.0, description: 'Large grandstand with perfect side-on wicket views' },
        { name: 'North Stand Blocks', priceMultiplier: 0.8, description: 'Value seating with clear outfield viewing' },
      ],
    },
    {
      name: 'Old Trafford',
      city: 'Manchester',
      capacity: '26,000 spectators',
      price: '£800 / seat',
      rating: '⭐️ 4.7 (410 reviews)',
      highlightColor: '#D32F2F',
      layoutType: 'bowl',
      logo: require('./src/assets/old.png'),
      stands: [
        { name: 'The Point Club', priceMultiplier: 1.6, description: 'Iconic red luxury stand with panoramic balcony view' },
        { name: 'Historic Pavilion', priceMultiplier: 1.4, description: 'Elegant brick pavilion with traditional atmosphere' },
        { name: 'Brian Statham Stand', priceMultiplier: 1.0, description: 'Direct viewing straight down the pitch creases' },
        { name: 'James Anderson Stand', priceMultiplier: 0.8, description: 'Seating named after England’s leading wicket taker' },
      ],
    },
  ],
  Afghanistan: [
    {
      name: 'Kabul International Cricket Stadium',
      city: 'Kabul',
      capacity: '18,000 spectators',
      price: '؋25,000 / seat',
      rating: '⭐️ 4.5 (210 reviews)',
      highlightColor: '#D32F2F',
      layoutType: 'disconnected',
      logo: require('./src/assets/kabul.png'),
      stands: [
        { name: 'Presidential Box', priceMultiplier: 1.8, description: 'VIP enclosure with luxury seating and security' },
        { name: 'Pavilion Stand', priceMultiplier: 1.3, description: 'Main covered grandstand with pitch-front views' },
        { name: 'East Gallery', priceMultiplier: 1.0, description: 'Open-air seating with panoramic mountain views' },
        { name: 'General Stand', priceMultiplier: 0.7, description: 'Budget seating with passionate local supporters' },
      ],
    },
    {
      name: 'Ghazi Amanullah Khan Stadium',
      city: 'Jalalabad',
      capacity: '14,000 spectators',
      price: '؋20,000 / seat',
      rating: '⭐️ 4.3 (150 reviews)',
      highlightColor: '#1B5E20',
      layoutType: 'disconnected',
      logo: require('./src/assets/khan.png'),
      stands: [
        { name: 'Main Pavilion', priceMultiplier: 1.4, description: 'Covered premium seating behind the wickets' },
        { name: 'West Wing', priceMultiplier: 1.1, description: 'Shaded afternoon seating with side-on views' },
        { name: 'East Terrace', priceMultiplier: 1.0, description: 'Open terrace seating along square leg boundary' },
        { name: 'Hilltop Gallery', priceMultiplier: 0.7, description: 'Elevated grass bank viewing area' },
      ],
    },
    {
      name: 'Khost Cricket Stadium',
      city: 'Khost',
      capacity: '12,000 spectators',
      price: '؋18,000 / seat',
      rating: '⭐️ 4.2 (90 reviews)',
      highlightColor: '#000000',
      layoutType: 'disconnected',
      logo: require('./src/assets/khost.png'),
      stands: [
        { name: 'Khost Pavilion', priceMultiplier: 1.4, description: 'Main pavilion with covered premium seats' },
        { name: 'South Stand', priceMultiplier: 1.0, description: 'Side-on viewing with mountain backdrop' },
        { name: 'North Terrace', priceMultiplier: 0.9, description: 'Open terrace behind bowlers arm' },
        { name: 'Fan Zone', priceMultiplier: 0.7, description: 'Lively uncovered supporters area' },
      ],
    },
  ],
  'Sri Lanka': [
    {
      name: 'R. Premadasa Stadium',
      city: 'Colombo',
      capacity: '35,000 spectators',
      price: 'Rs.45,000 / seat',
      rating: '⭐️ 4.7 (520 reviews)',
      highlightColor: '#8B1A1A',
      layoutType: 'bowl',
      logo: require('./src/assets/prem.png'),
      stands: [
        { name: 'Ranasinghe Premadasa Pavilion', priceMultiplier: 1.6, description: 'Premium covered grandstand with air-conditioned suites' },
        { name: 'De Saram Stand', priceMultiplier: 1.2, description: 'Historic stand honoring Sri Lankan cricket pioneer' },
        { name: 'Jaya Stand', priceMultiplier: 1.0, description: 'Excellent straight-on view from behind bowler arm' },
        { name: 'Outer Circle Stand', priceMultiplier: 0.8, description: 'Affordable seating with vibrant local atmosphere' },
      ],
    },
    {
      name: 'Galle International Stadium',
      city: 'Galle',
      capacity: '35,000 spectators',
      price: 'Rs.40,000 / seat',
      rating: '⭐️ 4.9 (680 reviews)',
      highlightColor: '#FF8C00',
      layoutType: 'dharamshala',
      logo: require('./src/assets/galle.png'),
      stands: [
        { name: 'Fort End Pavilion', priceMultiplier: 1.7, description: 'Premium stand overlooking the historic Galle Fort' },
        { name: 'Clock Tower Stand', priceMultiplier: 1.3, description: 'Stunning views of the iconic Galle clock tower' },
        { name: 'Sea View Stand', priceMultiplier: 1.1, description: 'Beautiful Indian Ocean views behind the boundary' },
        { name: 'Grass Bank', priceMultiplier: 0.7, description: 'Scenic grassy slope overlooking the ground and sea' },
      ],
    },
    {
      name: 'Pallekele International Stadium',
      city: 'Kandy',
      capacity: '35,000 spectators',
      price: 'Rs.35,000 / seat',
      rating: '⭐️ 4.6 (340 reviews)',
      highlightColor: '#2E7D32',
      layoutType: 'bowl',
      logo: require('./src/assets/palle.png'),
      stands: [
        { name: 'Main Pavilion', priceMultiplier: 1.4, description: 'Covered grandstand with central pitch views' },
        { name: 'Hill Country Stand', priceMultiplier: 1.2, description: 'Elevated views with Knuckles mountain range backdrop' },
        { name: 'Kandy End', priceMultiplier: 1.0, description: 'Behind the wickets view at city end' },
        { name: 'North Stand', priceMultiplier: 0.8, description: 'Budget friendly seats with great crowd atmosphere' },
      ],
    },
    {
      name: 'Sinhalese Sports Club Ground',
      city: 'Colombo',
      capacity: '15,000 spectators',
      price: 'Rs.38,000 / seat',
      rating: '⭐️ 4.5 (280 reviews)',
      highlightColor: '#1565C0',
      layoutType: 'disconnected',
      logo: require('./src/assets/sin.png'),
      stands: [
        { name: 'SSC Pavilion', priceMultiplier: 1.5, description: 'Historic member pavilion with traditional character' },
        { name: 'De Mel Stand', priceMultiplier: 1.2, description: 'Named after SSC founder, excellent side views' },
        { name: 'Press Box Gallery', priceMultiplier: 1.0, description: 'Elevated seating near media facilities' },
        { name: 'General Admission', priceMultiplier: 0.7, description: 'Open terraces with passionate Sri Lankan fans' },
      ],
    },
  ],
  'New Zealand': [
    {
      name: 'Basin Reserve',
      city: 'Wellington',
      capacity: '11,600 spectators',
      price: '$850 NZD / seat',
      rating: '⭐️ 4.8 (380 reviews)',
      highlightColor: '#000000',
      layoutType: 'disconnected',
      stands: [
        { name: 'Museum Stand', priceMultiplier: 1.5, description: 'Heritage grandstand with NZ Cricket Museum inside' },
        { name: 'R.A. Vance Stand', priceMultiplier: 1.3, description: 'Modern covered stand with excellent bowler-end views' },
        { name: 'Embankment Grass', priceMultiplier: 1.0, description: 'Famous grassy slope for picnic-style viewing' },
        { name: 'Scoreboard End', priceMultiplier: 0.8, description: 'Open seating near the traditional manual scoreboard' },
      ],
    },
    {
      name: 'Hagley Oval',
      city: 'Christchurch',
      capacity: '17,500 spectators',
      price: '$900 NZD / seat',
      rating: '⭐️ 4.9 (410 reviews)',
      highlightColor: '#FFFFFF',
      layoutType: 'disconnected',
      stands: [
        { name: 'Hadlee Pavilion', priceMultiplier: 1.6, description: 'Premium stand honoring Sir Richard Hadlee' },
        { name: 'Cathedral Stand', priceMultiplier: 1.3, description: 'Views towards Christchurch Cathedral spires' },
        { name: 'Park End', priceMultiplier: 1.0, description: 'Relaxed viewing within Hagley Park greenery' },
        { name: 'Village Green', priceMultiplier: 0.7, description: 'Open grass banks surrounded by oak trees' },
      ],
    },
    {
      name: 'Eden Park',
      city: 'Auckland',
      capacity: '41,000 spectators',
      price: '$950 NZD / seat',
      rating: '⭐️ 4.7 (350 reviews)',
      highlightColor: '#1B5E20',
      layoutType: 'bowl',
      stands: [
        { name: 'ASB Stand', priceMultiplier: 1.5, description: 'State-of-the-art grandstand with corporate suites' },
        { name: 'South Stand', priceMultiplier: 1.2, description: 'Covered seating with excellent straight views' },
        { name: 'West Stand', priceMultiplier: 1.0, description: 'Multi-tier grandstand overlooking the square' },
        { name: 'East Terrace', priceMultiplier: 0.8, description: 'Budget terraced seating close to boundary' },
      ],
    },
    {
      name: 'Seddon Park',
      city: 'Hamilton',
      capacity: '10,000 spectators',
      price: '$800 NZD / seat',
      rating: '⭐️ 4.6 (220 reviews)',
      highlightColor: '#4CAF50',
      layoutType: 'disconnected',
      stands: [
        { name: 'WEL Energy Stand', priceMultiplier: 1.4, description: 'Main covered grandstand with central view' },
        { name: 'Embankment', priceMultiplier: 1.1, description: 'Grass hill popular for family picnic viewing' },
        { name: 'River End', priceMultiplier: 1.0, description: 'Behind the wickets view near Waikato River' },
        { name: 'Open Terrace', priceMultiplier: 0.7, description: 'Affordable uncovered terrace seating' },
      ],
    },
  ],
  'South Africa': [
    {
      name: 'Newlands Cricket Ground',
      city: 'Cape Town',
      capacity: '25,000 spectators',
      price: 'R8,500 / seat',
      rating: '⭐️ 4.9 (620 reviews)',
      highlightColor: '#007749',
      layoutType: 'dharamshala',
      stands: [
        { name: 'Oaks Enclosure', priceMultiplier: 1.7, description: 'VIP area shaded by 100-year-old oak trees with Table Mountain backdrop' },
        { name: 'Kelvin Grove End', priceMultiplier: 1.3, description: 'Premium covered stand with stunning mountain views' },
        { name: 'Railway Stand', priceMultiplier: 1.0, description: 'Traditional stand along the western boundary' },
        { name: 'Grass Embankment', priceMultiplier: 0.7, description: 'Famous grassy slope with picnic atmosphere' },
      ],
    },
    {
      name: 'The Wanderers Stadium',
      city: 'Johannesburg',
      capacity: '34,000 spectators',
      price: 'R9,000 / seat',
      rating: '⭐️ 4.8 (530 reviews)',
      highlightColor: '#FFB81C',
      layoutType: 'bowl',
      stands: [
        { name: 'Centenary Pavilion', priceMultiplier: 1.6, description: 'Premium hospitality pavilion at the Corlett Drive End' },
        { name: 'Unity Stand', priceMultiplier: 1.3, description: 'Multi-tier grandstand with expansive field views' },
        { name: 'Bullring Stand', priceMultiplier: 1.0, description: 'Legendary stand known for intimidating atmosphere' },
        { name: 'Grass Embankment', priceMultiplier: 0.7, description: 'Famous open slope at the Golf Course End' },
      ],
    },
    {
      name: 'SuperSport Park',
      city: 'Centurion',
      capacity: '22,000 spectators',
      price: 'R7,500 / seat',
      rating: '⭐️ 4.7 (380 reviews)',
      highlightColor: '#0D47A1',
      layoutType: 'disconnected',
      stands: [
        { name: 'Oval Pavilion', priceMultiplier: 1.5, description: 'Main pavilion with corporate boxes and restaurants' },
        { name: 'Castle Corner', priceMultiplier: 1.2, description: 'Popular elevated stand at the Hennops River End' },
        { name: 'Gautrain Stand', priceMultiplier: 1.0, description: 'Modern covered grandstand with easy transit access' },
        { name: 'Embankment', priceMultiplier: 0.7, description: 'Grassy slope perfect for family outings' },
      ],
    },
    {
      name: 'Kingsmead',
      city: 'Durban',
      capacity: '25,000 spectators',
      price: 'R7,000 / seat',
      rating: '⭐️ 4.6 (290 reviews)',
      highlightColor: '#E65100',
      layoutType: 'disconnected',
      stands: [
        { name: 'Presidents Suite', priceMultiplier: 1.5, description: 'Luxury enclosed suite with panoramic pitch views' },
        { name: 'Old Fort End', priceMultiplier: 1.2, description: 'Historic stand with behind-the-wicket views' },
        { name: 'Umgeni End', priceMultiplier: 1.0, description: 'Named after the Umgeni River, great side views' },
        { name: 'Duck Pond Stand', priceMultiplier: 0.7, description: 'Relaxed seating near the famous duck pond' },
      ],
    },
  ],
  'West Indies': [
    {
      name: 'Kensington Oval',
      city: 'Bridgetown, Barbados',
      capacity: '28,000 spectators',
      price: '$3,200 BBD / seat',
      rating: '⭐️ 4.9 (450 reviews)',
      highlightColor: '#7B2D26',
      layoutType: 'bowl',
      stands: [
        { name: '3Ws Stand', priceMultiplier: 1.7, description: 'Named after Worrell, Weekes & Walcott – premium views' },
        { name: 'Greenidge & Haynes Stand', priceMultiplier: 1.3, description: 'Modern stand honoring Bajan opening legends' },
        { name: 'Garner Stand', priceMultiplier: 1.0, description: 'Exciting viewing behind the fast bowler arm' },
        { name: 'Party Stand', priceMultiplier: 0.8, description: 'Legendary Party Stand – music, DJ, and cricket!' },
      ],
    },
    {
      name: 'Sabina Park',
      city: 'Kingston, Jamaica',
      capacity: '20,000 spectators',
      price: '$2,800 JMD / seat',
      rating: '⭐️ 4.7 (340 reviews)',
      highlightColor: '#009B3A',
      layoutType: 'disconnected',
      stands: [
        { name: 'George Headley Stand', priceMultiplier: 1.6, description: 'Premium stand named after the legendary batsman' },
        { name: 'Blue Mountains End', priceMultiplier: 1.2, description: 'Spectacular views of the Blue Mountain range' },
        { name: 'Northern Stand', priceMultiplier: 1.0, description: 'Energetic stand with loud Jamaican supporters' },
        { name: 'Mound Stand', priceMultiplier: 0.7, description: 'Historic grass mound seating area' },
      ],
    },
    {
      name: "Queen's Park Oval",
      city: 'Port of Spain, Trinidad',
      capacity: '20,000 spectators',
      price: '$2,500 TTD / seat',
      rating: '⭐️ 4.8 (380 reviews)',
      highlightColor: '#FFC72C',
      layoutType: 'disconnected',
      stands: [
        { name: 'Brian Lara Pavilion', priceMultiplier: 1.7, description: 'Premium pavilion honoring Trinidad batting legend' },
        { name: 'Carib Stand', priceMultiplier: 1.2, description: 'Lively corporate stand with excellent views' },
        { name: 'Northern Hills End', priceMultiplier: 1.0, description: 'Views towards the Northern Range mountains' },
        { name: 'Concrete Stand', priceMultiplier: 0.7, description: 'Budget concrete terrace with fierce crowd energy' },
      ],
    },
    {
      name: 'Sir Vivian Richards Stadium',
      city: 'North Sound, Antigua',
      capacity: '10,000 spectators',
      price: '$2,800 XCD / seat',
      rating: '⭐️ 4.6 (200 reviews)',
      highlightColor: '#CE1126',
      layoutType: 'bowl',
      stands: [
        { name: 'Viv Richards Pavilion', priceMultiplier: 1.6, description: 'Modern premium stand honoring the Master Blaster' },
        { name: 'Curtly Ambrose Stand', priceMultiplier: 1.3, description: 'Named after Antiguanfast bowling legend' },
        { name: 'Caribbean View', priceMultiplier: 1.0, description: 'Open seating with stunning Caribbean Sea views' },
        { name: 'Island Terrace', priceMultiplier: 0.7, description: 'Relaxed island-style seating with music and vibes' },
      ],
    },
  ],
};

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#071510" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [screen, setScreen] = useState<Screen>('signin');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('User');
  const [userPhone, setUserPhone] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('India');
  const [dashboardCountry, setDashboardCountry] = useState<string>('India');
  const [bookingStadium, setBookingStadium] = useState<Stadium | null>(null);

  function handleSignIn(email: string, country: string) {
    setUserEmail(email);
    setUserName('User');
    setSelectedCountry(country);
    setDashboardCountry(country);
    setScreen('home');
  }

  function handleSignUp(email: string, country: string) {
    setUserEmail(email);
    setUserName('User');
    setSelectedCountry(country);
    setDashboardCountry(country);
    setScreen('home');
  }

  function handleSignOut() {
    setUserEmail(null);
    setUserName('User');
    setUserPhone('');
    setBookingStadium(null);
    setScreen('signin');
  }

  function handleConfirmBooking(seats: string[], totalCost: string) {
    if (!bookingStadium) return;
    Alert.alert(
      'Booking Confirmed! 🏏',
      `Successfully reserved ${seats.length} seat(s) at ${bookingStadium.name}.\n\nSeats: ${seats.join(', ')}\nTotal Paid: ${totalCost}\n\nConfirmation has been sent to ${userEmail}.`,
      [{text: 'Awesome!', onPress: () => setBookingStadium(null)}],
    );
  }

  const countryThemes: Record<string, { accent: string; highlight: string; textColor?: string }> = {
    India: {accent: '#0055A4', highlight: '#138808'},
    Australia: {accent: '#FFCD00', highlight: '#00843D'},
    England: {accent: '#FF0000', highlight: '#002040', textColor: '#FFFFFF'},
    Afghanistan: {accent: '#00BFFF', highlight: '#000000'},
    'Sri Lanka': {accent: '#8B1A1A', highlight: '#FF8C00', textColor: '#FFFFFF'},
    'New Zealand': {accent: '#808080', highlight: '#FFFFFF', textColor: '#FFFFFF'},
    'South Africa': {accent: '#007749', highlight: '#FFB81C', textColor: '#FFFFFF'},
    'West Indies': {accent: '#7B2D26', highlight: '#FFC72C', textColor: '#FFFFFF'},
  };

  const theme = countryThemes[dashboardCountry] || countryThemes.India;

  return (
    <View style={[styles.container, {paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom}]}>
      {screen === 'signin' && (
        <SignInScreen
          onSignIn={handleSignIn}
          onGoToSignUp={(country) => {
            setSelectedCountry(country);
            setScreen('signup');
          }}
          defaultCountry={selectedCountry}
        />
      )}
      {screen === 'signup' && (
        <SignUpScreen
          onSignUp={handleSignUp}
          onGoToSignIn={() => setScreen('signin')}
          defaultCountry={selectedCountry}
        />
      )}
      {screen === 'schedule' && (
        <ScheduleScreen 
          country={dashboardCountry}
          stadiums={stadiumData[dashboardCountry] || []}
          theme={theme}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'profile' && (
        <ProfileScreen
          userName={userName}
          userEmail={userEmail || 'user@example.com'}
          userPhone={userPhone}
          onUpdateProfile={(newName, newPhone) => {
            setUserName(newName);
            setUserPhone(newPhone);
          }}
          onSignOut={handleSignOut}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'home' && (
        bookingStadium ? (
          <SeatSelectionScreen
            stadium={bookingStadium}
            onConfirmBooking={handleConfirmBooking}
            onCancel={() => setBookingStadium(null)}
          />
        ) : (
          <View style={styles.dashboardContainer}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerTitle}>Dashboard</Text>
                <Text style={styles.headerWelcome}>Welcome back, {userName}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* User Initial Avatar Circle -> Opens Profile */}
                <TouchableOpacity
                  style={styles.userAvatarCircle}
                  onPress={() => setScreen('profile')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.avatarInitialText}>
                    {(userName || 'User').charAt(0).toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>



            {/* Region Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Select Region to Browse</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabsScroll}>
                {Object.keys(countryThemes).map((country) => {
                  const isSelected = dashboardCountry === country;
                  const flagMap: Record<string, string> = {
                    'India': '🇮🇳', 'Australia': '🇦🇺', 'England': '🇬🇧',
                    'Afghanistan': '🇦🇫', 'Sri Lanka': '🇱🇰', 'New Zealand': '🇳🇿',
                    'South Africa': '🇿🇦', 'West Indies': '🏝️',
                  };
                  const shortMap: Record<string, string> = {
                    'India': 'IND', 'Australia': 'AUS', 'England': 'ENG',
                    'Afghanistan': 'AFG', 'Sri Lanka': 'SL', 'New Zealand': 'NZ',
                    'South Africa': 'SA', 'West Indies': 'WI',
                  };
                  return (
                    <TouchableOpacity
                      key={country}
                      style={[
                        styles.filterTab,
                        isSelected && {
                          borderColor: '#00875A',
                          backgroundColor: '#00875A',
                        },
                      ]}
                      onPress={() => setDashboardCountry(country)}
                    >
                      <Text style={[styles.filterTabText, isSelected && {color: '#FFFFFF', fontWeight: 'bold'}]}>
                        {flagMap[country] || '🏏'} {shortMap[country] || country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Stadium List */}
            <ScrollView contentContainerStyle={styles.listContent} bounces={true}>
              <Text style={styles.sectionSubtitle}>
                Available pitches in {dashboardCountry}
              </Text>

              {stadiumData[dashboardCountry].map((stadium, index) => (
                <View key={index} style={styles.stadiumCard}>
                  {/* Visual Accent Bar */}
                  <View style={[styles.accentBar, {backgroundColor: stadium.highlightColor}]} />
                  
                  <View style={styles.stadiumDetails}>
                    <View style={styles.stadiumMainInfo}>
                      {stadium.logo && (
                        <Image source={stadium.logo} style={{ width: 44, height: 44, marginRight: 12, borderRadius: 22, backgroundColor: '#F1F5F9' }} resizeMode="contain" />
                      )}
                      <View style={{flex: 1}}>
                        <Text style={styles.stadiumName}>{stadium.name}</Text>
                        <Text style={styles.stadiumCity}>📍 {stadium.city}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.statsRow}>
                      <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Capacity</Text>
                        <Text style={styles.statVal}>{stadium.capacity}</Text>
                      </View>
                      <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Price</Text>
                        <Text style={styles.statVal}>{stadium.price}</Text>
                      </View>
                    </View>

                    <View style={styles.footerRow}>
                      <Text style={styles.ratingText}>{stadium.rating}</Text>
                      <TouchableOpacity
                        style={styles.bookButton}
                        onPress={() => setBookingStadium(stadium)}
                      >
                        <Text style={styles.bookButtonText}>Book Slot</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  headerWelcome: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  userAvatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00875A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#059669',
    shadowColor: '#00875A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarInitialText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  signOutButton: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  signOutText: {
    color: '#991B1B',
    fontSize: 12,
    fontWeight: '700',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  filterTabsScroll: {
    flexDirection: 'row',
    paddingHorizontal: 2,
  },
  filterTab: {
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  filterTabText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 30,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '700',
    marginBottom: 16,
  },
  stadiumCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  accentBar: {
    width: 6,
  },
  stadiumDetails: {
    flex: 1,
    padding: 16,
  },
  stadiumMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stadiumName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 22,
  },
  stadiumCity: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statBox: {
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    color: '#94A3B8',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  bookButton: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#00875A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00875A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default App;

