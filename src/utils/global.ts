export function PxToRem(value: number) {
  return `${value / 16}rem`; // browser default fontSize 16px
}

export const fontSize = {
  '12': {
    fontSize: PxToRem(12),
    lineHeight: PxToRem(18),
  },
  '14': {
    fontSize: PxToRem(14),
    lineHeight: PxToRem(21),
  },
  '16': {
    fontSize: PxToRem(16),
    lineHeight: PxToRem(24),
  },
  '18': {
    fontSize: PxToRem(18),
    lineHeight: PxToRem(27),
  },
  '20': {
    fontSize: PxToRem(20),
    lineHeight: PxToRem(32),
  },
  '22': {
    fontSize: PxToRem(22),
    lineHeight: PxToRem(32),
  },
  '24': {
    fontSize: PxToRem(24),
    lineHeight: PxToRem(32),
  },
};
