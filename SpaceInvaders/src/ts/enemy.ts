import { PolarVector } from './math/polar-vector';
import { WORLD_SIZE } from './config';

export enum Type {
  Basic = 'Basic',
  Spinner = 'Spinner',
  ZigZag = 'ZigZag',
  Oscillator = 'Oscillator'
}

export interface Enemy {
  initialPosition: PolarVector;
  position: PolarVector;
  type: Type;
  age: number;
  direction: number;
}

export interface NextPositionData {
  enemy: Enemy;
  deltaTime: number;
}

export function createEnemy(type: Type, position?: PolarVector): Enemy {
  const pos = position || { angle: Math.random() * Math.PI * 2, radius: WORLD_SIZE / 2 };
  return {
    age: 0,
    initialPosition: { ...pos },
    position: { ...pos },
    type,
    direction: Math.random() > 0.5 ? 1 : -1
  };
}

export function advanceEnemy(data: NextPositionData): void {
  data.enemy.age += data.deltaTime;
  data.enemy.position = movePatterns[data.enemy.type](data);
}

const movePatterns: Record<Type, (data: NextPositionData) => PolarVector> = {
  [Type.Basic]({ enemy, deltaTime }: NextPositionData) {
    return {
      angle: enemy.position.angle,
      radius: enemy.position.radius - deltaTime * 100
    };
  },
  [Type.Spinner]({ enemy, deltaTime }: NextPositionData) {
    return {
      angle: enemy.position.angle + enemy.direction * deltaTime * 2,
      radius: enemy.position.radius - deltaTime * 100
    };
  },
  [Type.ZigZag]({ enemy, deltaTime }: NextPositionData) {
    // Utilisation de sin(age) pour le mouvement de lacet
    const angleOffset = Math.sin(enemy.age * 2) * 0.5;
    return {
      angle: enemy.initialPosition.angle + angleOffset,
      radius: enemy.position.radius - deltaTime * 80
    };
  },
  [Type.Oscillator]({ enemy, deltaTime }: NextPositionData) {
    // Oscillation du rayon pendant qu'il avance vers le centre
    const baseRadius = enemy.initialPosition.radius - enemy.age * 60;
    const radiusOffset = Math.sin(enemy.age * 10) * 30;
    return {
      angle: enemy.position.angle + enemy.direction * deltaTime,
      radius: baseRadius + radiusOffset
    };
  }
};

export function getValue(type: Type): number {
  const values: Record<Type, number> = {
    [Type.Basic]: 5,
    [Type.Spinner]: 10,
    [Type.ZigZag]: 15,
    [Type.Oscillator]: 20
  };
  return values[type];
}
