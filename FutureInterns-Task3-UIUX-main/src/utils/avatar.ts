// Deterministic avatar generator matching names to gender-correct Unsplash photos.

const FEMALE_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150'
];

const MALE_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150'
];

// Determine if name is likely female
export function isFemaleName(name: string): boolean {
  const normalized = name.toLowerCase();
  
  // Specific list of names or common prefixes/suffixes
  const femaleNames = [
    'shreya', 'ananya', 'chaya', 'sarah', 'jane', 'halleyear', 
    'emma', 'sofia', 'olivia', 'isabella', 'mia', 'clara', 'lisa',
    'chloe', 'anna', 'laura', 'rachel', 'priya', 'neha', 'rahle',
    'veridian', 'julia', 'jessica', 'rebecca'
  ];

  if (femaleNames.some(f => normalized.includes(f))) {
    return true;
  }

  // Common female name endings in many cultures
  if (normalized.endsWith('a') || normalized.endsWith('ie') || normalized.endsWith('ah')) {
    // Exclude common male names ending in 'a'
    const maleEndingsWithA = ['joshua', 'luca', 'mustafa'];
    if (!maleEndingsWithA.includes(normalized)) {
      return true;
    }
  }

  return false;
}

// Get deterministic avatar based on the name hash
export function getAvatarForName(name: string): string {
  if (!name) return FEMALE_AVATARS[0];
  
  const isFemale = isFemaleName(name);
  const avatarsList = isFemale ? FEMALE_AVATARS : MALE_AVATARS;
  
  // Hash name to get consistent index
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarsList.length;
  
  return avatarsList[index];
}
