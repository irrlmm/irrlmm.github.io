/**
 *
 * @param power 0...1
 * @returns
 */
export function pew(power?: number) {
  const p = power || 0;

  return {
    type: "spring" as const,
    stiffness: 350 + p * 350,
    damping: 20 + p * 20,
    mass: 0.1 + p * 4.9,
  };
}
