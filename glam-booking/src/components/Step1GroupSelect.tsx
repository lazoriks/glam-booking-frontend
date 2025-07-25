import React from 'react';

type Group = {
  id: number;
  name: string;
  description: string;
  duration: string;
  priceRange: string;
  image: string;
};

type Props = {
  onSelect: (groupId: number) => void;
};

const groups: Group[] = [
  {
    id: 1,
    name: 'Hair',
    description: 'Styling, cutting and coloring tailored to your style.',
    duration: '30–90 min',
    priceRange: 'From €25',
    image: '/images/hair.jpg',
  },
  {
    id: 2,
    name: 'Nails',
    description: 'Classic, gel, and creative manicure services.',
    duration: '20–60 min',
    priceRange: '€20 – €45',
    image: '/images/nails.jpg',
  },
  {
    id: 3,
    name: 'Make-up',
    description: 'day/evening make-up.',
    duration: '45–70 min',
    priceRange: '€35 – €50',
    image: '/images/makeup.jpg',
  },
  {
    id: 4,
    name: 'Treatments',
    description: 'Keratin/Botox/Nanoplastics.',
    duration: '60–90 min',
    priceRange: '€40 – €60',
    image: '/images/treatments.jpg',
  },
  {
    id: 5,
    name: 'Massage',
    description: 'Professional massage.',
    duration: '30–60 min',
    priceRange: '€30 – €55',
    image: '/images/massage.jpg',
  },
  {
    id: 6,
    name: 'Brows & Lashes',
    description: 'Tinting, shaping, lamination and lifting.',
    duration: '20–45 min',
    priceRange: '€15 – €40',
    image: '/images/brows.jpg',
  },
  {
    id: 7,
    name: 'Permanent',
    description: 'Long-lasting makeup and enhancements.',
    duration: '90–120 min',
    priceRange: '€120 – €200',
    image: '/images/permanent.jpg',
  },
  {
    id: 8,
    name: 'Waxing',
    description: 'Facial and body waxing for smooth skin.',
    duration: '15–40 min',
    priceRange: '€10 – €35',
    image: '/images/waxing.jpg',
  },
];

const Step1GroupSelect: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex flex-col gap-12 p-6 sm:p-10 max-w-6xl mx-auto">
      {groups.map((group, idx) => (
        <div
          key={group.id}
          className={`flex flex-col md:flex-row ${
            idx % 2 === 1 ? 'md:flex-row-reverse' : ''
          } bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition`}
          onClick={() => onSelect(group.id)}
        >
          <div className="md:w-1/2">
            <img
              src={group.image}
              alt={group.name}
              className="h-64 w-full object-cover md:h-full"
            />
          </div>
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{group.name}</h2>
            <p className="text-gray-600">{group.description}</p>
            <p className="text-sm font-bold text-indigo-600 mt-4">{group.duration}</p>
            <p className="text-pink-600 text-lg italic">{group.priceRange}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Step1GroupSelect;
// This component allows users to select a service group by clicking on the displayed cards.
// Each card shows an image, name, description, duration, and price range of the service group.
// The `onSelect` function is called with the selected group's ID when a card is clicked.
// The layout is responsive, adjusting the card arrangement based on screen size.       