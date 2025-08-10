export type MoodKey =
  | 'happy'
  | 'romantic'
  | 'naughty'
  | 'playful'
  | 'frisky'
  | 'affectionate'
  | 'tired'
  | 'disconnected';

export type MoodMap = Record<MoodKey, number>;
