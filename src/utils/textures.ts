/**
 * Procedural HTML5 Canvas Textures for Buddhist Sacred Places
 * 100% procedural textures in SRGBColorSpace - Zero 404 dependencies.
 */
import * as THREE from 'three';

// Cache generated textures so we don't recreate them needlessly
const textureCache: Record<string, THREE.CanvasTexture> = {};

export function createSandstoneTexture(): THREE.CanvasTexture {
  if (textureCache['sandstone']) return textureCache['sandstone'];

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Warm sandstone base
  ctx.fillStyle = '#d8b98a';
  ctx.fillRect(0, 0, 512, 512);

  // Stone block grid
  ctx.strokeStyle = '#9c7b55';
  ctx.lineWidth = 4;
  const rows = 8;
  const rowHeight = 512 / rows;

  for (let r = 0; r <= rows; r++) {
    const y = r * rowHeight;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();

    // Offset vertical joints per row
    const cols = 4;
    const colWidth = 512 / cols;
    const offset = (r % 2) * (colWidth / 2);
    for (let c = 0; c <= cols + 1; c++) {
      const x = c * colWidth - offset;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + rowHeight);
      ctx.stroke();
    }
  }

  // Weathering noise & mineral specks
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const alpha = Math.random() * 0.15;
    ctx.fillStyle = Math.random() > 0.5 ? `rgba(90, 60, 30, ${alpha})` : `rgba(255, 240, 210, ${alpha})`;
    ctx.fillRect(x, y, 2 + Math.random() * 3, 2 + Math.random() * 3);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache['sandstone'] = texture;
  return texture;
}

export function createCarvedLotusTexture(): THREE.CanvasTexture {
  if (textureCache['lotus_carving']) return textureCache['lotus_carving'];

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#cfb489';
  ctx.fillRect(0, 0, 512, 512);

  const cx = 256;
  const cy = 256;

  // Concentric medallions (Vedika / Stupa railing motif)
  ctx.strokeStyle = '#85643e';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, 220, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 180, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 70, 0, Math.PI * 2);
  ctx.stroke();

  // 16 Lotus petals radiating from center
  const petals = 16;
  ctx.fillStyle = '#e4cca5';
  ctx.strokeStyle = '#7c5832';
  ctx.lineWidth = 3;

  for (let i = 0; i < petals; i++) {
    const angle = (i * Math.PI * 2) / petals;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 70);
    ctx.bezierCurveTo(35, 120, 25, 170, 0, 180);
    ctx.bezierCurveTo(-25, 170, -35, 120, 0, 70);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  // Central seed pod with 8 dots
  ctx.fillStyle = '#b68f5c';
  ctx.beginPath();
  ctx.arc(cx, cy, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#5c3e1e';
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI * 2) / 8;
    const px = cx + Math.cos(a) * 26;
    const py = cy + Math.sin(a) * 26;
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache['lotus_carving'] = texture;
  return texture;
}

export function createRedBrickTexture(): THREE.CanvasTexture {
  if (textureCache['red_brick']) return textureCache['red_brick'];

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Ancient terracotta / burnt clay red
  ctx.fillStyle = '#9e462e';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = '#5a2216';
  ctx.lineWidth = 3;
  const rows = 16;
  const rowHeight = 512 / rows;

  for (let r = 0; r <= rows; r++) {
    const y = r * rowHeight;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();

    const cols = 6;
    const colWidth = 512 / cols;
    const offset = (r % 2) * (colWidth / 2);
    for (let c = 0; c <= cols + 1; c++) {
      const x = c * colWidth - offset;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + rowHeight);
      ctx.stroke();
    }
  }

  // Weathering
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.fillStyle = Math.random() > 0.6 ? 'rgba(50, 15, 10, 0.12)' : 'rgba(230, 130, 90, 0.12)';
    ctx.fillRect(x, y, 3, 3);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache['red_brick'] = texture;
  return texture;
}

export function createGoldTexture(): THREE.CanvasTexture {
  if (textureCache['gold']) return textureCache['gold'];

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Rich burnished gold gradient
  const grad = ctx.createLinearGradient(0, 0, 256, 256);
  grad.addColorStop(0, '#f6d365');
  grad.addColorStop(0.35, '#fda085');
  grad.addColorStop(0.65, '#eec051');
  grad.addColorStop(1, '#d4af37');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  // Subtle beaten gold leaf hammer marks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    ctx.beginPath();
    ctx.arc(x, y, 6 + Math.random() * 8, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache['gold'] = texture;
  return texture;
}

export function createPrayerFlagsTexture(): THREE.CanvasTexture {
  if (textureCache['prayer_flags']) return textureCache['prayer_flags'];

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // 5 Buddhist Element Colors: Blue (Space), White (Air), Red (Fire), Green (Water), Yellow (Earth)
  const colors = ['#2060b8', '#f5f5f5', '#c82828', '#2d8641', '#e8b820'];
  const flagW = 512 / 5;

  colors.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.fillRect(idx * flagW, 0, flagW, 128);

    // Sacred block print motif
    ctx.fillStyle = col === '#f5f5f5' ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.65)';
    ctx.font = 'bold 20px serif';
    ctx.textAlign = 'center';
    ctx.fillText('☸', idx * flagW + flagW / 2, 45);
    ctx.fillText('OM', idx * flagW + flagW / 2, 85);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache['prayer_flags'] = texture;
  return texture;
}

export function createWaterTexture(): THREE.CanvasTexture {
  if (textureCache['water']) return textureCache['water'];

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  grad.addColorStop(0, '#1a5f7a');
  grad.addColorStop(0.7, '#114052');
  grad.addColorStop(1, '#0b2935');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1.5;
  for (let r = 20; r < 120; r += 20) {
    ctx.beginPath();
    ctx.arc(128, 128, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache['water'] = texture;
  return texture;
}
