/**
 * Procedural Materials Library
 * Shared PBR materials and textures for architectural and environmental fidelity.
 */
import * as THREE from 'three';
import {
  createSandstoneTexture,
  createCarvedLotusTexture,
  createRedBrickTexture,
  createGoldTexture,
  createPrayerFlagsTexture,
  createWaterTexture
} from '../../utils/textures';

export interface MaterialLibrary {
  sandstone: THREE.MeshStandardMaterial;
  carvedSandstone: THREE.MeshStandardMaterial;
  redBrick: THREE.MeshStandardMaterial;
  gold: THREE.MeshStandardMaterial;
  brass: THREE.MeshStandardMaterial;
  prayerFlags: THREE.MeshStandardMaterial;
  bodhiBark: THREE.MeshStandardMaterial;
  bodhiLeaves: THREE.MeshStandardMaterial;
  water: THREE.MeshStandardMaterial;
  stoneGrey: THREE.MeshStandardMaterial;
  whiteMarble: THREE.MeshStandardMaterial;
  pavement: THREE.MeshStandardMaterial;
  grass: THREE.MeshStandardMaterial;
  flame: THREE.MeshBasicMaterial;
}

let materialsInstance: MaterialLibrary | null = null;

export function getMaterials(): MaterialLibrary {
  if (materialsInstance) return materialsInstance;

  const sandstoneTex = createSandstoneTexture();
  const carvedLotusTex = createCarvedLotusTexture();
  const redBrickTex = createRedBrickTexture();
  const goldTex = createGoldTexture();
  const prayerFlagsTex = createPrayerFlagsTexture();
  const waterTex = createWaterTexture();

  // Pavement texture
  const pavementTex = sandstoneTex.clone();
  pavementTex.repeat.set(8, 8);

  const materials: MaterialLibrary = {
    sandstone: new THREE.MeshStandardMaterial({
      map: sandstoneTex,
      roughness: 0.85,
      metalness: 0.05,
      color: new THREE.Color('#d4b886'),
    }),
    carvedSandstone: new THREE.MeshStandardMaterial({
      map: carvedLotusTex,
      roughness: 0.8,
      metalness: 0.1,
      color: new THREE.Color('#deb887'),
    }),
    redBrick: new THREE.MeshStandardMaterial({
      map: redBrickTex,
      roughness: 0.9,
      metalness: 0.02,
      color: new THREE.Color('#944230'),
    }),
    gold: new THREE.MeshStandardMaterial({
      map: goldTex,
      roughness: 0.25,
      metalness: 0.88,
      color: new THREE.Color('#ffdf6d'),
    }),
    brass: new THREE.MeshStandardMaterial({
      roughness: 0.35,
      metalness: 0.75,
      color: new THREE.Color('#d4a047'),
    }),
    prayerFlags: new THREE.MeshStandardMaterial({
      map: prayerFlagsTex,
      roughness: 0.7,
      metalness: 0.0,
      side: THREE.DoubleSide,
    }),
    bodhiBark: new THREE.MeshStandardMaterial({
      roughness: 0.95,
      metalness: 0.0,
      color: new THREE.Color('#4a3525'),
    }),
    bodhiLeaves: new THREE.MeshStandardMaterial({
      roughness: 0.6,
      metalness: 0.05,
      color: new THREE.Color('#4f7942'),
      side: THREE.DoubleSide,
    }),
    water: new THREE.MeshStandardMaterial({
      map: waterTex,
      roughness: 0.15,
      metalness: 0.3,
      color: new THREE.Color('#226b80'),
      transparent: true,
      opacity: 0.88,
    }),
    stoneGrey: new THREE.MeshStandardMaterial({
      roughness: 0.9,
      metalness: 0.05,
      color: new THREE.Color('#7a7672'),
    }),
    whiteMarble: new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.1,
      color: new THREE.Color('#f0ece1'),
    }),
    pavement: new THREE.MeshStandardMaterial({
      map: pavementTex,
      roughness: 0.88,
      metalness: 0.05,
      color: new THREE.Color('#baa076'),
    }),
    grass: new THREE.MeshStandardMaterial({
      roughness: 0.92,
      metalness: 0.0,
      color: new THREE.Color('#557a46'),
    }),
    flame: new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ff9900'),
    }),
  };

  materialsInstance = materials;
  return materials;
}
