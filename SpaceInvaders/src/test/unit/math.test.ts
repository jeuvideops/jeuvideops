import { expect, test, describe } from 'vitest'
import { clamp, lerp } from '../../ts/math/math';
import { normalize, dot, add, subtract } from '../../ts/math/vector';
import { distance } from '../../ts/math/polar-vector';
import { createEnemy, Type } from '../../ts/enemy';

describe('Tests unitaires imposés (Annexe PDF)', () => {

    test('clamp (1,10,2) returns 2', () => {
        expect(clamp(1, 10, 2)).toBe(2)
    })

    test('clamp (1,10,-12) returns 1', () => {
        expect(clamp(1, 10, -12)).toBe(1)
    })

    test('lerp(1,10,2) returns 19', () => {
        expect(lerp(1, 10, 2)).toBe(19)
    })

    test('lerp(1,10,-12) returns -107', () => {
        expect(lerp(1, 10, -12)).toBe(-107)
    })

    test('distance entre deux points polaires', () => {
        const p1 = { angle: 5, radius: 50 };
        const p2 = { angle: 10, radius: 100 };
        expect(distance(p1, p2)).toBeCloseTo(98.30248290540649, 5)
    })

    test('normalize({x: 5, y: 50})', () => {
        const v = { x: 5, y: 50 };
        const result = normalize(v);
        expect(result.x).toBeCloseTo(0.09950371902099892, 5)
        expect(result.y).toBeCloseTo(0.9950371902099892, 5)
    })

    test('dot({x: 5, y: 50}, {x: 10, y: 100}) returns 5050', () => {
        expect(dot({ x: 5, y: 50 }, { x: 10, y: 100 })).toBe(5050)
    })

    test('add({x: 5, y: 50}, {x: 10, y: 100})', () => {
        expect(add({ x: 5, y: 50 }, { x: 10, y: 100 })).toEqual({ x: 15, y: 150 })
    })

    test('subtract({x: 5, y: 50}, {x: 10, y: 100})', () => {
        expect(subtract({ x: 5, y: 50 }, { x: 10, y: 100 })).toEqual({ x: -5, y: -50 })
    })
})

describe('Mes 5 tests unitaires supplémentaires (Exigence PDF)', () => {

    test('createEnemy initialise l’âge à 0', () => {
        const enemy = createEnemy(Type.Basic);
        expect(enemy.age).toBe(0);
    })

    test('createEnemy assigne le bon type', () => {
        const enemy = createEnemy(Type.Spinner);
        expect(enemy.type).toBe(Type.Spinner);
    })

    test('createEnemy génère une direction valide', () => {
        const enemy = createEnemy(Type.Basic);
        expect([1, -1]).toContain(enemy.direction);
    })

    test('createEnemy initialise une position', () => {
        const enemy = createEnemy(Type.Basic);
        expect(enemy.position.radius).toBeGreaterThan(0);
    })

    test('subtract fonctionne avec des zéros', () => {
        expect(subtract({ x: 0, y: 0 }, { x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
    })
})
