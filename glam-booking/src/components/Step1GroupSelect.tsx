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
    <div className="relative min-h-screen bg-[#fff8f5] overflow-hidden">

      {/* 🌫 Прозорий фон */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="/images/fon.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Контент поверх фону */}
      <div className="relative z-10">

        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-6">
          <img
            src="/images/header.jpg"
            alt="Header"
            className="w-full max-h-60 object-contain mx-auto rounded-xl shadow"
          />
        </div>

        {/* Секції */}
        <div className="flex flex-col gap-12 p-6 sm:p-10 max-w-6xl mx-auto">
          {groups.map((group, idx) => (
            <div
              key={group.id}
              className={`flex flex-col md:flex-row ${
                idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                } bg-white border border-pink-100 rounded-full shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-in-out cursor-pointer overflow-hidden`}


              onClick={() => onSelect(group.id)}
            >
              <div className="md:w-1/2 bg-white flex items-center justify-center">
                <img
                  src={group.image}
                  alt={group.name}
                  className="h-40 md:h-48 w-full object-contain bg-white"
                />
              </div>
              <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-center bg-gradient-to-br from-pink-50 to-yellow-50">
                <h2 className="text-2xl md:text-3xl font-bold text-pink-700 mb-2 tracking-wide">{group.name}</h2>
                <p className="text-gray-700 text-lg">{group.description}</p>
                <p className="text-md font-semibold text-yellow-600 mt-3">{group.duration}</p>
                <p className="text-pink-600 text-lg font-medium italic">{group.priceRange}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🌸 Декор внизу */}
        <div className="w-full mt-10">
          <img
            src="/images/flutter.jpg"
            alt="Flutter Decoration"
            className="w-full max-h-40 object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1GroupSelect;
// This component allows users to select a service group by clicking on the displayed cards.
// Each card shows an image, name, description, duration, and price range of the service group.
// The `onSelect` function is called with the selected group's ID when a card is clicked.
// The layout is responsive, adjusting the card arrangement based on screen size.       