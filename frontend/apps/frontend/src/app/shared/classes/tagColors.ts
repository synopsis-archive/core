const rgbs: string[] = [
  '255,202,0',
  '186,33,211',
  '89,25,224',
  '14,63,237',
  '2,184,247',
  '9,224,221',
  '2,237,100',
  '9,214,36',
  '248,182,2',
  '255,10,73',
  '221,3,255',
  '211,33,33',
  '255,153,0',
];

export const tagColors: Map<string, string> = new Map<string, string>();

export function setTagColors(tags: string[]) {
  for (let i = 0; i < tags.length; i++) {
    tagColors.set(tags[i], rgbs[i%rgbs.length]);
  }
}
