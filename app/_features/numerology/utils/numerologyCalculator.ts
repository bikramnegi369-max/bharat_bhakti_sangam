/**
 * Helper algorithms to calculate Vedic Numerology numbers:
 * 1. Mulank (Root/Psychic Number): Sum of birth date digits reduced to 1-9
 * 2. Bhagyank (Destiny/Life Path Number): Sum of entire birth date (DD+MM+YYYY) reduced to 1-9
 * 3. Namank (Name Number): Chaldean/Pythagorean vibration value of name
 */

export function calculateMulank(day: number): number {
  if (day <= 0 || day > 31) return 1;
  let sum = day;
  while (sum > 9) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
}

export function calculateBhagyank(day: number, month: number, year: number): number {
  const dateString = `${day}${month}${year}`;
  let sum = dateString
    .split("")
    .filter((ch) => !isNaN(parseInt(ch, 10)))
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  while (sum > 9) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum || 1;
}

// Chaldean Numerology Value Map
const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

export function calculateNamank(name: string): number {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, "");
  if (!cleanName) return 1;

  let sum = 0;
  for (let i = 0; i < cleanName.length; i++) {
    const char = cleanName[i];
    sum += CHALDEAN_MAP[char] || 0;
  }

  while (sum > 9) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  return sum || 1;
}
