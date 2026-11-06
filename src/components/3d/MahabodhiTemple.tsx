/**
 * 3D Architectural Reconstruction: Mahabodhi Temple Complex, Bodh Gaya
 * Built with composite procedural meshes (THREE.Group) adhering to authentic
 * architectural proportions, historical elements, and PBR material directives.
 */
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getMaterials } from './ProceduralMaterials';

interface MahabodhiTempleProps {
  litLamps: string[];
}

export const MahabodhiTemple: React.FC<MahabodhiTempleProps> = ({ litLamps }) => {
  const materials = getMaterials();
  const prayerWheelRef = useRef<THREE.Group>(null);
  const flameRefs = useRef<(THREE.PointLight | null)[]>([]);

  // Animate prayer wheel and flickering butter lamp flames
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (prayerWheelRef.current) {
      prayerWheelRef.current.rotation.y = t * 0.8;
    }
    // Subtle flame flicker
    flameRefs.current.forEach((light, i) => {
      if (light) {
        light.intensity = 1.2 + Math.sin(t * 8 + i * 2) * 0.3 + (Math.random() - 0.5) * 0.15;
      }
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. MAIN TEMPLE PLINTH & FOUNDATION TERRACE */}
      <mesh position={[0, 1.2, 0]} receiveShadow castShadow material={materials.redBrick}>
        <boxGeometry args={[20, 2.4, 20]} />
      </mesh>
      {/* Upper terrace plinth molding */}
      <mesh position={[0, 2.5, 0]} receiveShadow castShadow material={materials.sandstone}>
        <boxGeometry args={[18.4, 0.4, 18.4]} />
      </mesh>

      {/* Eastern Entrance Stairs */}
      <group position={[0, 0.6, 10.8]}>
        {[0, 1, 2, 3].map((step) => (
          <mesh
            key={`step-${step}`}
            position={[0, step * 0.3, -step * 0.4]}
            receiveShadow
            material={materials.sandstone}
          >
            <boxGeometry args={[6, 0.32, 0.8]} />
          </mesh>
        ))}
      </group>

      {/* 2. GRAND SHIKHARA TOWER (Central Stepped Pyramidal Spire - 55m representation) */}
      <group position={[0, 2.7, 0]}>
        {/* Lower cube sanctuary (Garbhagriha walls) */}
        <mesh position={[0, 3, 0]} castShadow receiveShadow material={materials.redBrick}>
          <boxGeometry args={[12, 6, 12]} />
        </mesh>

        {/* Eastern Portico / Vaulted Archway */}
        <group position={[0, 2.5, 6]}>
          <mesh castShadow receiveShadow material={materials.sandstone}>
            <boxGeometry args={[5, 5, 2.5]} />
          </mesh>
          {/* Arched entrance doorway */}
          <mesh position={[0, -0.6, 1.26]} material={materials.redBrick}>
            <boxGeometry args={[2.4, 3.8, 0.2]} />
          </mesh>
          {/* Golden Buddha Statue inside the sanctum portal */}
          <group position={[0, -0.8, 1.0]}>
            {/* Lotus Throne */}
            <mesh position={[0, 0.2, 0]} material={materials.carvedSandstone}>
              <cylinderGeometry args={[0.9, 1.0, 0.4, 16]} />
            </mesh>
            {/* Meditating Buddha Body */}
            <mesh position={[0, 0.9, 0]} material={materials.gold}>
              <cylinderGeometry args={[0.45, 0.75, 1.1, 12]} />
            </mesh>
            {/* Buddha Head & Usnisa */}
            <mesh position={[0, 1.7, 0]} material={materials.gold}>
              <sphereGeometry args={[0.3, 16, 16]} />
            </mesh>
            <mesh position={[0, 2.05, 0]} material={materials.gold}>
              <coneGeometry args={[0.12, 0.25, 12]} />
            </mesh>
            {/* Soft inner sanctum golden glow */}
            <pointLight position={[0, 1.5, 0.5]} color="#ffd700" intensity={1.5} distance={6} />
          </group>
        </group>

        {/* Stepped Pyramidal Shikhara Tiers (7 diminishing horizontal storeys) */}
        {[0, 1, 2, 3, 4, 5, 6].map((tier) => {
          const w = 10 - tier * 1.15;
          const h = 2.4;
          const y = 6 + tier * 2.3;
          return (
            <group key={`shikhara-tier-${tier}`} position={[0, y, 0]}>
              <mesh castShadow receiveShadow material={materials.sandstone}>
                <boxGeometry args={[w, h, w]} />
              </mesh>
              {/* Decorative cornice ridge band */}
              <mesh position={[0, h / 2, 0]} material={materials.carvedSandstone}>
                <boxGeometry args={[w + 0.35, 0.3, w + 0.35]} />
              </mesh>
              {/* Arched kudu decorative niches on four sides */}
              {[-1, 1].map((dir) => (
                <group key={`niche-${dir}`}>
                  <mesh position={[0, 0, (w / 2 + 0.08) * dir]} rotation={[0, 0, Math.PI / 2]} material={materials.carvedSandstone}>
                    <cylinderGeometry args={[0.35, 0.35, 0.8, 8, 1, false, 0, Math.PI]} />
                  </mesh>
                  <mesh position={[(w / 2 + 0.08) * dir, 0, 0]} rotation={[0, Math.PI / 2, Math.PI / 2]} material={materials.carvedSandstone}>
                    <cylinderGeometry args={[0.35, 0.35, 0.8, 8, 1, false, 0, Math.PI]} />
                  </mesh>
                </group>
              ))}
            </group>
          );
        })}

        {/* Shikhara Crown: Griva (Neck), Amalaka (Ribbed Stone Disc), Kalasha (Pot), Golden Stupa Spire */}
        <group position={[0, 22.8, 0]}>
          {/* Neck / Griva */}
          <mesh material={materials.sandstone}>
            <cylinderGeometry args={[1.5, 1.7, 0.9, 16]} />
          </mesh>
          {/* Amalaka (Ribbed disc) */}
          <mesh position={[0, 0.9, 0]} castShadow material={materials.sandstone}>
            <cylinderGeometry args={[2.2, 2.2, 0.9, 24]} />
          </mesh>
          {/* Kalasha (Sacred Golden Vase) */}
          <mesh position={[0, 1.8, 0]} castShadow material={materials.gold}>
            <sphereGeometry args={[1.1, 16, 16]} />
          </mesh>
          {/* Golden Stupa Pinnacle Needle */}
          <mesh position={[0, 3.4, 0]} castShadow material={materials.gold}>
            <coneGeometry args={[0.5, 2.4, 16]} />
          </mesh>
          {/* Crowning sacred chattras disc */}
          <mesh position={[0, 4.4, 0]} material={materials.gold}>
            <cylinderGeometry args={[0.2, 0.02, 0.8, 8]} />
          </mesh>
        </group>

        {/* Four Corner Miniature Spire Towers (Pancharatha Layout) */}
        {[
          [-5.2, -5.2],
          [5.2, -5.2],
          [-5.2, 5.2],
          [5.2, 5.2]
        ].map(([cx, cz], idx) => (
          <group key={`corner-tower-${idx}`} position={[cx, 6, cz]}>
            <mesh castShadow receiveShadow material={materials.sandstone}>
              <boxGeometry args={[2.2, 5, 2.2]} />
            </mesh>
            <mesh position={[0, 3.2, 0]} rotation={[0, Math.PI / 4, 0]} castShadow material={materials.sandstone}>
              <coneGeometry args={[1.4, 2.8, 4]} />
            </mesh>
            <mesh position={[0, 4.8, 0]} material={materials.gold}>
              <sphereGeometry args={[0.4, 12, 12]} />
            </mesh>
            <mesh position={[0, 5.5, 0]} material={materials.gold}>
              <coneGeometry args={[0.15, 0.9, 8]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 3. THE SACRED BODHI TREE (West side behind temple) */}
      <group position={[0, 0, -18]}>
        {/* Elevated Stone Enclosure Platform */}
        <mesh position={[0, 0.5, 0]} receiveShadow material={materials.sandstone}>
          <cylinderGeometry args={[5.2, 5.5, 1.0, 24]} />
        </mesh>
        <mesh position={[0, 1.05, 0]} material={materials.carvedSandstone}>
          <cylinderGeometry args={[5.3, 5.3, 0.15, 24]} />
        </mesh>

        {/* Ancient Gnarled Tree Trunk (Ficus religiosa) */}
        <mesh position={[0, 3.2, 0]} castShadow receiveShadow material={materials.bodhiBark}>
          <cylinderGeometry args={[1.4, 2.2, 4.5, 12]} />
        </mesh>
        {/* Spreading Major Branches */}
        {[
          [0, 4.5, 0, 0.4, 0, 0.3],
          [-1.2, 4.8, 0.8, -0.3, 0.4, -0.2],
          [1.1, 4.7, -0.9, 0.2, -0.5, 0.3],
          [0.8, 5.2, 1.0, 0.4, 0.2, -0.1],
          [-0.7, 5.0, -1.2, -0.4, -0.3, -0.2]
        ].map(([bx, by, bz, rx, ry, rz], bIdx) => (
          <group key={`branch-${bIdx}`} position={[bx, by, bz]} rotation={[rx, ry, rz]}>
            <mesh castShadow material={materials.bodhiBark}>
              <cylinderGeometry args={[0.6, 0.9, 3.2, 8]} />
            </mesh>
          </group>
        ))}

        {/* Rich Leafy Canopies (Layered domes representing the sacred foliage) */}
        {[
          [0, 8.5, 0, 4.5],
          [-2.5, 7.5, 1.5, 3.2],
          [2.8, 7.8, -1.8, 3.4],
          [1.8, 8.2, 2.4, 3.0],
          [-2.2, 7.9, -2.5, 3.2],
          [0, 10.5, 0, 3.2]
        ].map(([lx, ly, lz, radius], lIdx) => (
          <mesh key={`canopy-${lIdx}`} position={[lx, ly, lz]} castShadow material={materials.bodhiLeaves}>
            <dodecahedronGeometry args={[radius, 1]} />
          </mesh>
        ))}

        {/* Prayer Flag Garlands strung from branches */}
        {[0, 1.25, 2.5, 3.75, 5].map((angle, fIdx) => {
          const x1 = Math.cos(angle) * 4.2;
          const z1 = Math.sin(angle) * 4.2;
          return (
            <mesh
              key={`flag-garland-${fIdx}`}
              position={[x1 * 0.5, 3.8, z1 * 0.5]}
              rotation={[0.1, angle, 0]}
              material={materials.prayerFlags}
            >
              <planeGeometry args={[3.2, 0.45]} />
            </mesh>
          );
        })}

        {/* 4. THE VAJRASANA (Diamond Throne) beneath the tree */}
        <group position={[0, 1.15, 3.2]}>
          {/* Carved stone plinth */}
          <mesh castShadow receiveShadow material={materials.stoneGrey}>
            <boxGeometry args={[3.2, 0.4, 1.8]} />
          </mesh>
          {/* The polished Diamond Seat Slab */}
          <mesh position={[0, 0.25, 0]} castShadow material={materials.carvedSandstone}>
            <boxGeometry args={[3.0, 0.15, 1.6]} />
          </mesh>
          {/* Golden offering cushion / silk cloth */}
          <mesh position={[0, 0.35, 0]} material={materials.gold}>
            <boxGeometry args={[2.5, 0.06, 1.2]} />
          </mesh>
        </group>
      </group>

      {/* 5. ASHOKA PILLAR & LION CAPITAL (South of main temple) */}
      <group position={[14, 0, 0]}>
        {/* Stepped stone circular foundation */}
        <mesh position={[0, 0.3, 0]} receiveShadow material={materials.sandstone}>
          <cylinderGeometry args={[2.2, 2.5, 0.6, 20]} />
        </mesh>
        {/* Monolithic Polished Sandstone Shaft (Chunar stone) */}
        <mesh position={[0, 4.5, 0]} castShadow material={materials.carvedSandstone}>
          <cylinderGeometry args={[0.55, 0.75, 8.0, 20]} />
        </mesh>
        {/* Inverted Bell Lotus Capital */}
        <mesh position={[0, 8.8, 0]} castShadow material={materials.sandstone}>
          <cylinderGeometry args={[0.9, 0.55, 0.9, 16]} />
        </mesh>
        {/* Circular Abacus carved with Dharma wheels */}
        <mesh position={[0, 9.4, 0]} material={materials.carvedSandstone}>
          <cylinderGeometry args={[1.05, 1.05, 0.4, 16]} />
        </mesh>
        {/* Crowning Lion Sculptures */}
        <group position={[0, 10.1, 0]}>
          <mesh castShadow material={materials.sandstone}>
            <boxGeometry args={[1.1, 1.1, 1.1]} />
          </mesh>
          {/* Lion head accents facing 4 directions */}
          {[-0.5, 0.5].map((off) => (
            <React.Fragment key={`lion-head-${off}`}>
              <mesh position={[off, 0.4, 0]} material={materials.sandstone}>
                <sphereGeometry args={[0.26, 10, 10]} />
              </mesh>
              <mesh position={[0, 0.4, off]} material={materials.sandstone}>
                <sphereGeometry args={[0.26, 10, 10]} />
              </mesh>
            </React.Fragment>
          ))}
        </group>
      </group>

      {/* 6. TIBETAN MANI PRAYER WHEEL (West of main temple) */}
      <group position={[-14, 0, 0]}>
        {/* Pavilion Stone Base */}
        <mesh position={[0, 0.25, 0]} receiveShadow material={materials.sandstone}>
          <cylinderGeometry args={[2.0, 2.2, 0.5, 16]} />
        </mesh>
        {/* Wooden Corner Pillars */}
        {[
          [-1.2, -1.2],
          [1.2, -1.2],
          [-1.2, 1.2],
          [1.2, 1.2]
        ].map(([px, pz], pIdx) => (
          <mesh key={`paw-pillar-${pIdx}`} position={[px, 1.8, pz]} material={materials.bodhiBark}>
            <cylinderGeometry args={[0.08, 0.08, 2.8, 8]} />
          </mesh>
        ))}
        {/* Pavilion Pagoda Roof */}
        <mesh position={[0, 3.4, 0]} rotation={[0, Math.PI / 4, 0]} material={materials.redBrick}>
          <coneGeometry args={[2.2, 0.9, 4]} />
        </mesh>

        {/* Animated Revolving Prayer Wheel Cylinder */}
        <group ref={prayerWheelRef} position={[0, 1.6, 0]}>
          <mesh castShadow material={materials.brass}>
            <cylinderGeometry args={[0.75, 0.75, 1.6, 20]} />
          </mesh>
          {/* Upper & lower brass rims */}
          <mesh position={[0, 0.82, 0]} material={materials.gold}>
            <cylinderGeometry args={[0.82, 0.82, 0.1, 20]} />
          </mesh>
          <mesh position={[0, -0.82, 0]} material={materials.gold}>
            <cylinderGeometry args={[0.82, 0.82, 0.1, 20]} />
          </mesh>
          {/* Sacred syllable band */}
          <mesh material={materials.prayerFlags}>
            <cylinderGeometry args={[0.76, 0.76, 0.5, 20]} />
          </mesh>
        </group>
      </group>

      {/* 7. MUCHALINDA LOTUS POND (Southeast corner) */}
      <group position={[16, 0, 16]}>
        {/* Sunken Stone Basin Rim */}
        <mesh position={[0, 0.2, 0]} receiveShadow material={materials.sandstone}>
          <boxGeometry args={[11, 0.45, 11]} />
        </mesh>
        {/* Shimmering Water Surface */}
        <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.water}>
          <planeGeometry args={[9.8, 9.8]} />
        </mesh>
        {/* Floating Lotus Lily Pads & Flowers */}
        {[
          [-2.2, -1.8],
          [1.8, 2.2],
          [-1.5, 2.4],
          [2.6, -1.5],
          [0.8, -2.8]
        ].map(([lx, lz], padIdx) => (
          <group key={`lotus-pad-${padIdx}`} position={[lx, 0.18, lz]}>
            <mesh rotation={[-Math.PI / 2, 0, padIdx]} material={materials.bodhiLeaves}>
              <circleGeometry args={[0.45, 12]} />
            </mesh>
            {/* Blooming pink/white lotus blossom */}
            <mesh position={[0, 0.1, 0]} material={materials.whiteMarble}>
              <coneGeometry args={[0.18, 0.22, 8]} />
            </mesh>
          </group>
        ))}

        {/* Stone Muchalinda Serpent Guardian in center */}
        <group position={[0, 0.3, 0]}>
          <mesh material={materials.stoneGrey}>
            <cylinderGeometry args={[0.6, 0.8, 1.2, 12]} />
          </mesh>
          {/* 7-hooded naga serpent canopy */}
          <mesh position={[0, 1.2, -0.2]} rotation={[0.4, 0, 0]} material={materials.carvedSandstone}>
            <boxGeometry args={[1.4, 0.9, 0.3]} />
          </mesh>
        </group>
      </group>

      {/* 8. SACRED VEDIKA (Ancient Carved Railing surrounding inner court) */}
      <group>
        {/* South railing segments */}
        {[-9, -6, -3, 3, 6, 9].map((rx) => (
          <group key={`vedika-s-${rx}`} position={[rx, 0.8, 11]}>
            <mesh castShadow material={materials.carvedSandstone}>
              <cylinderGeometry args={[0.2, 0.2, 1.6, 8]} />
            </mesh>
            {/* Crossbars with lotus medallions */}
            <mesh position={[1.5, 0.3, 0]} material={materials.sandstone}>
              <boxGeometry args={[3, 0.25, 0.15]} />
            </mesh>
            <mesh position={[1.5, -0.3, 0]} material={materials.sandstone}>
              <boxGeometry args={[3, 0.25, 0.15]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 9. VOTIVE STUPAS (Scattered in courtyard as in historical Bodh Gaya) */}
      {[
        [-10, 0, -6, 1.6],
        [-11, 0, -2, 1.2],
        [10, 0, -8, 1.5],
        [11, 0, -12, 1.8],
        [-9, 0, 15, 1.4],
        [-15, 0, 14, 1.3]
      ].map(([sx, sy, sz, scale], sIdx) => (
        <group key={`stupa-${sIdx}`} position={[sx, sy, sz]}>
          {/* Square plinth */}
          <mesh position={[0, 0.3 * scale, 0]} castShadow receiveShadow material={materials.sandstone}>
            <boxGeometry args={[1.8 * scale, 0.6 * scale, 1.8 * scale]} />
          </mesh>
          {/* Circular drum */}
          <mesh position={[0, 0.8 * scale, 0]} castShadow material={materials.carvedSandstone}>
            <cylinderGeometry args={[0.8 * scale, 0.85 * scale, 0.5 * scale, 16]} />
          </mesh>
          {/* Dome (Anda) */}
          <mesh position={[0, 1.4 * scale, 0]} castShadow material={materials.redBrick}>
            <sphereGeometry args={[0.8 * scale, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          {/* Harmika & Tiered Umbrellas (Chattras) */}
          <mesh position={[0, 1.9 * scale, 0]} material={materials.sandstone}>
            <boxGeometry args={[0.4 * scale, 0.3 * scale, 0.4 * scale]} />
          </mesh>
          <mesh position={[0, 2.3 * scale, 0]} material={materials.gold}>
            <coneGeometry args={[0.35 * scale, 0.6 * scale, 12]} />
          </mesh>
        </group>
      ))}

      {/* 10. FOUR GOLDEN BUTTER LAMP STANDS */}
      {[
        { id: 'obj_lamp_1', pos: [7, 0, 9] },
        { id: 'obj_lamp_2', pos: [-7, 0, 9] },
        { id: 'obj_lamp_3', pos: [5, 0, -16] },
        { id: 'obj_lamp_4', pos: [-5, 0, -16] }
      ].map((lamp, lIdx) => {
        const isLit = litLamps.includes(lamp.id);
        const [lx, ly, lz] = lamp.pos;

        return (
          <group key={lamp.id} position={[lx, ly, lz]}>
            {/* Stand base & turned brass stem */}
            <mesh position={[0, 0.15, 0]} receiveShadow material={materials.brass}>
              <cylinderGeometry args={[0.45, 0.55, 0.3, 16]} />
            </mesh>
            <mesh position={[0, 0.6, 0]} castShadow material={materials.brass}>
              <cylinderGeometry args={[0.08, 0.12, 0.8, 12]} />
            </mesh>
            {/* Oil bowl vessel */}
            <mesh position={[0, 1.05, 0]} castShadow material={materials.brass}>
              <cylinderGeometry args={[0.45, 0.2, 0.25, 16]} />
            </mesh>

            {/* Lit flame and warm point light if ignited */}
            {isLit && (
              <group position={[0, 1.25, 0]}>
                <mesh material={materials.flame}>
                  <coneGeometry args={[0.1, 0.28, 8]} />
                </mesh>
                <pointLight
                  ref={(el) => {
                    flameRefs.current[lIdx] = el;
                  }}
                  color="#ff8800"
                  intensity={1.6}
                  distance={7}
                  castShadow
                />
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
};
