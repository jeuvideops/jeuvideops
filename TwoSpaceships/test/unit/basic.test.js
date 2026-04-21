import {describe, it, expect} from 'vitest';
import {lerp, mapLinear, randFloatSpread} from '../../src/math.js';

describe('Math [../src/math.js]', () => {
  describe('lerp', () => {
    it('should move spaceship beyond target position when t exceeds 1', () => {
      expect(lerp(1, 3, 20)).toBe(41);
    });

    it('xshould interpolate bullet raycast endpoint between start and end', () => {
      expect(lerp(1.3, -7, 2)).toBe(-15.3);
    });

    it('should keep spaceship at start position when t is 0', () => {
      expect(lerp(5, 10, 0)).toBe(5);
    });

    it('should reach target position when t is 1', () => {
      expect(lerp(5, 10, 1)).toBe(10);
    });
  });

  describe('mapLinear', () => {
    it('should map a game value from one range to another', () => {
      expect(mapLinear(1, 2, 3, 4, 5)).toBe(3);
    });

    it('should map score to UI display range with decimal precision', () => {
      expect(mapLinear(1, 20, 3, 40, 5)).toBe(0.882352941176471);
    });

    it('should return minimum UI value at minimum input', () => {
      expect(mapLinear(2, 2, 3, 4, 5)).toBe(4);
    });

    it('should return maximum UI value at maximum input', () => {
      expect(mapLinear(3, 2, 3, 4, 5)).toBe(5);
    });
  });

  describe('randFloatSpread', () => {
    it('should spread 3D object position within positive bound', () => {
      expect(randFloatSpread(1)).toBeLessThanOrEqual(1);
    });

    it('should spread 3D object position within negative bound', () => {
      expect(randFloatSpread(1)).toBeGreaterThanOrEqual(-1);
    });

    it('should produce no spread when white noise amplitude is zero', () => {
      expect(Math.abs(randFloatSpread(0))).toBe(0);
    });
  });
});
