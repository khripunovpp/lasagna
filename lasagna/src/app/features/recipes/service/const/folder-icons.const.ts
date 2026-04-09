export const FOLDER_ICONS = [
  'cake',
  'breakfast_dining',
  'cookie',
  'icecream',
  'local_pizza',
  'ramen_dining',
  'set_meal',
  'restaurant',
  'outdoor_grill',
  'kitchen',
  'star',
  'favorite',
  'bookmark',
  'label',
  'eco',
  'local_fire_department',
  'redeem',
  'local_cafe',
  'emoji_food_beverage',
  'blender',
] as const;

export type FolderIconKey = typeof FOLDER_ICONS[number];

export const DEFAULT_FOLDER_ICON: FolderIconKey = 'cake';
