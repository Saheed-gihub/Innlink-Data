import type { LucideIcon } from 'lucide-react';
import { Wifi, Smartphone, GraduationCap, Lightbulb, Tv, Router, Ticket, ShieldCheck, RefreshCcw } from 'lucide-react';

export type Network = 'MTN' | 'Telecel' | 'AirtelTigo' | 'Unknown';

export interface NetworkInfo {
  name: Network;
  color: string;
  logo: string;
}

export const NETWORKS: Record<Network, NetworkInfo> = {
  MTN: { name: 'MTN', color: '#ffc107', logo: 'mtn-logo' },
  Telecel: { name: 'Telecel', color: '#e60000', logo: 'telecel-logo' },
  AirtelTigo: { name: 'AirtelTigo', color: '#00a9e0', logo: 'airteltigo-logo' },
  Unknown: { name: 'Unknown', color: '#888', logo: '' },
};

const networkPrefixes: { [key: string]: Network } = {
  '024': 'MTN', '054': 'MTN', '055': 'MTN', '059': 'MTN', '025': 'MTN',
  '020': 'Telecel', '050': 'Telecel',
  '027': 'AirtelTigo', '057': 'AirtelTigo', '026': 'AirtelTigo', '056': 'AirtelTigo'
};

export const detectNetwork = (phoneNumber: string): Network => {
  if (phoneNumber.length >= 3) {
    const prefix = phoneNumber.substring(0, 3);
    return networkPrefixes[prefix] || 'Unknown';
  }
  return 'Unknown';
};

export interface Product {
  id: string;
  name: string;
  price: number;
}

export type ServiceType = 'data' | 'airtime' | 'results' | 'bills' | 'tv' | 'internet' | 'vouchers' | 'tickets' | 'airtime-to-cash';

export interface Service {
  type: ServiceType;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  products: Product[];
  networkProducts?: Record<string, Product[]>;
  requiresPhone: boolean;
}

export const SERVICES: Record<ServiceType, Service> = {
  data: {
    type: 'data',
    title: 'Buy Data',
    description: 'Instant data for all networks.',
    icon: Wifi,
    iconColor: 'text-blue-500',
    requiresPhone: true,
    products: [],
    networkProducts: {
        MTN: [
            { id: 'mtn-data-1', name: '500MB (1 Day)', price: 2.50 },
            { id: 'mtn-data-2', name: '1.2GB (7 Days)', price: 5.00 },
            { id: 'mtn-data-3', name: '5GB (30 Days)', price: 20.00 },
            { id: 'mtn-data-4', name: '15GB (Night Only)', price: 10.00 },
        ],
        Telecel: [
            { id: 'telecel-data-1', name: '600MB (1 Day)', price: 2.50 },
            { id: 'telecel-data-2', name: '1.5GB (7 Days)', price: 5.00 },
            { id: 'telecel-data-3', name: '6GB (30 Days)', price: 20.00 },
            { id: 'telecel-data-4', name: 'Unlimited (3 Hours)', price: 10.00 },
        ],
        AirtelTigo: [
            { id: 'airteltigo-data-1', name: '550MB (1 Day)', price: 2.50 },
            { id: 'airteltigo-data-2', name: '1.3GB (7 Days)', price: 5.00 },
            { id: 'airteltigo-data-3', name: '5.5GB (30 Days)', price: 20.00 },
            { id: 'airteltigo-data-4', name: 'Social Pack (WA/FB/IG)', price: 5.00 },
        ],
    }
  },
  airtime: {
    type: 'airtime',
    title: 'Airtime',
    description: 'Top up any number instantly.',
    icon: Smartphone,
    iconColor: 'text-green-500',
    requiresPhone: true,
    products: [],
  },
  'airtime-to-cash': {
    type: 'airtime-to-cash',
    title: 'Cash Out',
    description: 'Convert Airtime to Wallet Money.',
    icon: RefreshCcw,
    iconColor: 'text-pink-500',
    requiresPhone: true,
    products: [],
  },
  results: {
    type: 'results',
    title: 'Result PINs',
    description: 'WAEC, BECE & Checker PINs.',
    icon: GraduationCap,
    iconColor: 'text-purple-500',
    requiresPhone: false,
    products: [
      { id: 'res-1', name: 'BECE Checker PIN', price: 25.00 },
      { id: 'res-2', name: 'WASSCE Checker PIN', price: 30.00 },
      { id: 'res-3', name: 'CSSPS Placement PIN', price: 15.00 },
      { id: 'res-4', name: 'Nurses/Midwifery PIN', price: 50.00 },
    ],
  },
  bills: {
    type: 'bills',
    title: 'Bills',
    description: 'ECG, Ghana Water, Taxes.',
    icon: Lightbulb,
    iconColor: 'text-yellow-500',
    requiresPhone: false,
    products: [
      { id: 'bill-1', name: 'ECG Postpaid Bill', price: 0 },
      { id: 'bill-2', name: 'Ghana Water Bill', price: 0 },
      { id: 'bill-3', name: 'DStv Box Office', price: 15.00 },
    ],
  },
  tv: {
    type: 'tv',
    title: 'TV',
    description: 'DStv, GOtv, StarTimes.',
    icon: Tv,
    iconColor: 'text-orange-500',
    requiresPhone: false,
    products: [
        { id: 'tv-1', name: 'DStv Premium', price: 600.00 },
        { id: 'tv-2', name: 'DStv Compact Plus', price: 400.00 },
        { id: 'tv-3', name: 'GOtv Max', price: 120.00 },
        { id: 'tv-4', name: 'StarTimes Super', price: 90.00 },
    ]
  },
  internet: {
    type: 'internet',
    title: 'Internet',
    description: 'Fiber & Broadband.',
    icon: Router,
    iconColor: 'text-indigo-500',
    requiresPhone: false,
    products: [
        { id: 'internet-1', name: 'MTN Fiber (50GB)', price: 150.00 },
        { id: 'internet-2', name: 'Telecel Fixed (100GB)', price: 250.00 },
        { id: 'internet-3', name: 'Busy Unlimited Monthly', price: 400.00 },
    ]
  },
  vouchers: {
    type: 'vouchers',
    title: 'Vouchers',
    description: 'Gaming & App Store.',
    icon: ShieldCheck,
    iconColor: 'text-rose-500',
    requiresPhone: false,
    products: [
        { id: 'v-1', name: 'Google Play $10', price: 150.00 },
        { id: 'v-2', name: 'Netflix Premium (1m)', price: 100.00 },
        { id: 'v-3', name: 'PlayStation Plus (3m)', price: 350.00 },
    ]
  },
  tickets: {
    type: 'tickets',
    title: 'Tickets',
    description: 'Events & Concerts.',
    icon: Ticket,
    iconColor: 'text-cyan-500',
    requiresPhone: false,
    products: [
        { id: 't-1', name: 'Raptor Concert (VIP)', price: 250.00 },
        { id: 't-2', name: 'Accra Fashion Week', price: 100.00 },
        { id: 't-3', name: 'Decemba 2 Rememba', price: 150.00 },
    ]
  }
};