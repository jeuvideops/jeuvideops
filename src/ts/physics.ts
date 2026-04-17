import { GAMEPAD_EPSILON, PLAYER_SPEED, FIRE_COOLDOWN, PROJECTILE_SPEED, PROJECTILE_SIZE, ENEMY_SIZE, PLAYER_OFFSET, PARTICLE_LIFESPAN, CENTER_RADIUS, WORLD_SIZE, ENEMY_SPAWN_COOLDOWN } from './config';
import { advanceEnemy, createEnemy, Enemy, Type, getValue } from './enemy';
import { Input } from './input';
import { distance, PolarVector, toPolarVector } from './math/polar-vector';
import { magnitude, slerp, mulFactor, Vector, normalize, add } from './math/vector';
import { Particle, createBoom } from './particle';
import { toRelativeVector } from './world';

export interface Projectile {
  position: PolarVector;
}

export interface PhysicsData {
  input: Input;
  deltaTime: number;
  addPoints: (_value: number) => void
}

export interface PhysicsOutput {
  playerPosition: Vector;
  projectiles: Projectile[];
  enemies: Enemy[];
  particles: Particle[];
  gameOver: boolean;
}

let currentPosition: Vector = { x: 0, y: 1 };
let destination: Vector = { x: 0, y: 1 };
let gameOver = false;

const particles: Particle[] = [];
const projectiles: Projectile[] = [];
const enemies: Enemy[] = [createEnemy(Type.Basic)];

let fireTimer = 0;
let spawnTimer = 0;

export function init() {
  return { calculate };
}

function calculate({ input, deltaTime, addPoints }: PhysicsData): PhysicsOutput {
  // Gestion des particules
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.age += deltaTime;
    if (particle.age > PARTICLE_LIFESPAN) {
      particles.splice(i, 1);
      continue;
    }
    particle.position = add(particle.position, particle.velocity);
  }

  if (!gameOver) {
    // Déplacement du joueur
    const mag = magnitude(input.axes);
    if (mag > GAMEPAD_EPSILON) {
      destination = normalize(input.axes);
    }
    currentPosition = slerp(currentPosition, destination, deltaTime * PLAYER_SPEED);

    // Tir
    fireTimer += deltaTime;
    if (input.fire && fireTimer > FIRE_COOLDOWN) {
      fireTimer = 0;
      projectiles.push({
        position: { ...toPolarVector(mulFactor(currentPosition, 50)) }
      });
    }

    // Spawn des ennemis
    spawnTimer += deltaTime;
    if (spawnTimer > ENEMY_SPAWN_COOLDOWN) {
      spawnTimer = 0;
      const angle = Math.random() * Math.PI * 2;
      const types = Object.values(Type);
      enemies.push(
          createEnemy(
              types[Math.floor(Math.random() * types.length)],
              { angle, radius: WORLD_SIZE / 2 }
          )
      );
    }

    // Mise à jour projectiles et ennemis
    for (const projectile of projectiles) {
      projectile.position.radius += deltaTime * PROJECTILE_SPEED;
    }

    for (const enemy of enemies) {
      advanceEnemy({ enemy, deltaTime });
    }

    // Check défaite (ennemi atteint le centre)
    for (const enemy of enemies) {
      if (enemy.position.radius < CENTER_RADIUS + ENEMY_SIZE) {
        gameOver = true;
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            particles.push(...createBoom({ x: WORLD_SIZE / 2, y: WORLD_SIZE / 2 }, 4 + i * 4));
          }, 100 * i);
        }
        break;
      }
    }

    // Collisions Projectiles / Ennemis
    for (let pIdx = projectiles.length - 1; pIdx >= 0; pIdx--) {
      for (let eIdx = enemies.length - 1; eIdx >= 0; eIdx--) {
        const projectile = projectiles[pIdx];
        const enemy = enemies[eIdx];

        if (distance(projectile.position, enemy.position) < PROJECTILE_SIZE + ENEMY_SIZE) {
          const position = toRelativeVector(enemy.position);
          particles.push(...createBoom(position));
          addPoints(getValue(enemy.type));

          projectiles.splice(pIdx, 1);
          enemies.splice(eIdx, 1);
          break; // Sort de la boucle ennemis pour ce projectile
        }
      }
    }
  }

  return {
    playerPosition: mulFactor(currentPosition, PLAYER_OFFSET),
    projectiles,
    enemies,
    particles,
    gameOver
  };
}
