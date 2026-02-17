import type { LucideIcon } from 'lucide-react';
import { Wifi, Smartphone, GraduationCap, Lightbulb } from 'lucide-react';

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

export type ServiceType = 'data' | 'airtime' | 'results' | 'bills';

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
    title: 'Buy Data Bundle',
    description: 'Instant data for all networks.',
    icon: Wifi,
    iconColor: 'text-blue-500',
    requiresPhone: true,
    products: [],
    networkProducts: {
      MTN: [
        { id: 'mtn-data-1', name: '500 MB (1 Day)', price: 2.50 },
        { id: 'mtn-data-2', name: '1.2 GB (7 Days)', price: 5.00 },
        { id: 'mtn-data-3', name: '5 GB (30 Days)', price: 20.00 },
        { id: 'mtn-data-4', name: '10 GB (30 Days)', price: 40.00 },
      ],
      Telecel: [
        { id: 'telecel-data-1', name: '600 MB (1 Day)', price: 2.50 },
        { id: 'telecel-data-2', name: '1.5 GB (7 Days)', price: 5.00 },
        { id: 'telecel-data-3', name: '6 GB (30 Days)', price: 20.00 },
        { id: 'telecel-data-4', name: '12 GB (30 Days)', price: 40.00 },
      ],
      AirtelTigo: [
        { id: 'airteltigo-data-1', name: '550 MB (1 Day)', price: 2.50 },
        { id: 'airteltigo-data-2', name: '1.3 GB (7 Days)', price: 5.00 },
        { id: 'airteltigo-data-3', name: '5.5 GB (30 Days)', price: 20.00 },
        { id: 'airteltigo-data-4', name: '11 GB (30 Days)', price: 40.00 },
      ],
    }
  },
  airtime: {
    type: 'airtime',
    title: 'Buy Airtime',
    description: 'Top up any number instantly.',
    icon: Smartphone,
    iconColor: 'text-green-500',
    requiresPhone: true,
    products: [], // Airtime uses a custom amount
  },
  results: {
    type: 'results',
    title: 'Result Checkers',
    description: 'WASSCE, BECE & more.',
    icon: GraduationCap,
    iconColor: 'text-purple-500',
    requiresPhone: false,
    products: [
      { id: 'res-1', name: 'BECE Results Checker', price: 25.00 },
      { id: 'res-2', name: 'WASSCE Results Checker', price: 30.00 },
      { id: 'res-3', name: 'CSSPS Placement Checker', price: 15.00 },
    ],
  },
  bills: {
    type: 'bills',
    title: 'Pay Bills',
    description: 'ECG, Ghana Water, and more.',
    icon: Lightbulb,
    iconColor: 'text-yellow-500',
    requiresPhone: false,
    products: [
      { id: 'bill-1', name: 'ECG Postpaid', price: 0 },
      { id: 'bill-2', name: 'Ghana Water', price: 0 },
    ],
  },
};
