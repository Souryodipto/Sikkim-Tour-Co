import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { WeatherConditionType, TimeOfDay } from '../../data/weatherData';

interface Mountain3DSceneProps {
  condition: WeatherConditionType;
  timeOfDay: TimeOfDay;
  elevationMeters: number;
  windSpeedKph: number;
  interactive?: boolean;
  className?: string;
}

// Module-scope reusable math helpers to prevent GC in the render loop
const _vec3 = new THREE.Vector3();
const _color = new THREE.Color();
const _mat4 = new THREE.Matrix4();
const _pos = new THREE.Vector3();
const _scale = new THREE.Vector3();
const _quat = new THREE.Quaternion();

export const Mountain3DScene: React.FC<Mountain3DSceneProps> = ({
  condition,
  timeOfDay,
  elevationMeters,
  windSpeedKph,
  interactive = true,
  className = 'w-full h-full',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const conditionRef = useRef(condition);
  const timeOfDayRef = useRef(timeOfDay);
  const elevationRef = useRef(elevationMeters);
  const windSpeedRef = useRef(windSpeedKph);

  // Sync refs for uninterrupted rendering loop
  useEffect(() => {
    conditionRef.current = condition;
    timeOfDayRef.current = timeOfDay;
    elevationRef.current = elevationMeters;
    windSpeedRef.current = windSpeedKph;
  }, [condition, timeOfDay, elevationMeters, windSpeedKph]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to adapt pixel ratio and multi-pass costs
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xd6e5e3, 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
    camera.position.set(22, 14, 28);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent dipping below ground
    controls.minDistance = 10;
    controls.maxDistance = 55;
    controls.target.set(0, 4, 0);
    controls.autoRotate = interactive && !isSoftwareGl;
    controls.autoRotateSpeed = 0.4;
    controls.update();

    // 6. Lighting Rig (Key, Fill, Rim, Hemisphere)
    const hemisphereLight = new THREE.HemisphereLight(0xfff8e7, 0x3d4a41, 0.9);
    scene.add(hemisphereLight);

    const dirLight = new THREE.DirectionalLight(0xfff5dd, 2.4);
    dirLight.position.set(25, 30, 20);
    dirLight.castShadow = !isSoftwareGl;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 100;
    dirLight.shadow.camera.left = -25;
    dirLight.shadow.camera.right = 25;
    dirLight.shadow.camera.top = 25;
    dirLight.shadow.camera.bottom = -25;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x9fc5e8, 0.8);
    rimLight.position.set(-20, 15, -20);
    scene.add(rimLight);

    // 7. Mountain Terrain Construction (Procedural Heightfield)
    const terrainGroup = new THREE.Group();
    scene.add(terrainGroup);

    // Main Kanchenjunga / Gurudongmar Massif (BufferGeometry with custom mountain contours)
    const terrainResolution = 64;
    const terrainSize = 50;
    const terrainGeo = new THREE.PlaneGeometry(terrainSize, terrainSize, terrainResolution, terrainResolution);
    terrainGeo.rotateX(-Math.PI / 2);

    const posAttr = terrainGeo.attributes.position;
    const count = posAttr.count;
    const vertexColors = new Float32Array(count * 3);

    // Color definitions for terrain elevation zones
    const snowColor = new THREE.Color(0xfcfcfc);
    const rockColor = new THREE.Color(0x38413b);
    const slateColor = new THREE.Color(0x5a635c);
    const alpineMeadowColor = new THREE.Color(0x6e7b5b);
    const glacialIceColor = new THREE.Color(0x8bc0d6);

    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);

      // Radial distance from center peak
      const distFromCenter = Math.sqrt(x * x + z * z);
      const angle = Math.atan2(z, x);

      // Procedural mountain formula with multiple ridge harmonics
      let y = 0;
      // Primary peak (Kanchenjunga massif)
      const primarySpire = Math.exp(-distFromCenter * 0.12) * 13;
      // Subsidiary high ridges (Five Treasures of Snow)
      const ridgeHarmonics =
        Math.cos(angle * 3 + distFromCenter * 0.25) * 2.2 * Math.exp(-distFromCenter * 0.1) +
        Math.sin(angle * 5) * 1.2 * Math.exp(-distFromCenter * 0.15) +
        Math.sin(x * 0.4) * Math.cos(z * 0.4) * 0.8 +
        Math.cos(x * 0.8 + z * 0.5) * 0.4;

      y = primarySpire + ridgeHarmonics;

      // Lake basin depression at southwest quadrant (Gurudongmar / Tsomgo Lake feature)
      const lakeDist = Math.sqrt((x - 8) * (x - 8) + (z - 8) * (z - 8));
      if (lakeDist < 6) {
        const lakeDip = (1 - lakeDist / 6) * 2.2;
        y = Math.max(0.2, y - lakeDip);
      }

      // Base terrace fade off towards edges
      const edgeFade = Math.max(0, 1 - distFromCenter / (terrainSize * 0.48));
      y *= edgeFade;

      posAttr.setY(i, y);

      // Vertex color blending based on elevation
      if (y > 7.5) {
        // Pure Snowcap Summit
        _color.copy(snowColor);
      } else if (y > 5.5) {
        // Snow and Craggy Rock interface
        const t = (y - 5.5) / 2.0;
        _color.copy(rockColor).lerp(snowColor, t);
      } else if (y > 3.0) {
        // Alpine Scree & Slate Ridge
        const t = (y - 3.0) / 2.5;
        _color.copy(slateColor).lerp(rockColor, t);
      } else if (y > 1.0) {
        // Subalpine Rhododendron & Pine Zone
        const t = (y - 1.0) / 2.0;
        _color.copy(alpineMeadowColor).lerp(slateColor, t);
      } else {
        // Glacial Moraine & Valley Floor
        _color.copy(alpineMeadowColor).lerp(glacialIceColor, 0.3);
      }

      vertexColors[i * 3] = _color.r;
      vertexColors[i * 3 + 1] = _color.g;
      vertexColors[i * 3 + 2] = _color.b;
    }

    terrainGeo.setAttribute('color', new THREE.BufferAttribute(vertexColors, 3));
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.82,
      metalness: 0.08,
      flatShading: true,
    });

    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = !isSoftwareGl;
    terrainMesh.castShadow = !isSoftwareGl;
    terrainGroup.add(terrainMesh);

    // 8. Sacred Glacial Lake (Gurudongmar / Tsomgo Lake disc)
    const lakeGeo = new THREE.CylinderGeometry(4.8, 4.8, 0.2, 32);
    const lakeMat = new THREE.MeshStandardMaterial({
      color: 0x489fb5,
      roughness: 0.15,
      metalness: 0.65,
    });
    const lakeMesh = new THREE.Mesh(lakeGeo, lakeMat);
    lakeMesh.position.set(8, 0.6, 8);
    terrainGroup.add(lakeMesh);

    // 9. Procedural Tibetan Chorten (6-part THREE.Group model)
    const stupaGroup = new THREE.Group();
    // Part 1: Stepped Plinth
    const plinth1 = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.35, 2.0),
      new THREE.MeshStandardMaterial({ color: 0xefede8, roughness: 0.7 })
    );
    plinth1.position.y = 0.175;
    stupaGroup.add(plinth1);

    // Part 2: Middle Tier
    const plinth2 = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.3, 1.6),
      new THREE.MeshStandardMaterial({ color: 0xe2ded4, roughness: 0.7 })
    );
    plinth2.position.y = 0.45;
    stupaGroup.add(plinth2);

    // Part 3: Kumbha (Main Dome)
    const kumbha = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.8, 1.1, 16),
      new THREE.MeshStandardMaterial({ color: 0xfaf8f5, roughness: 0.6 })
    );
    kumbha.position.y = 1.1;
    stupaGroup.add(kumbha);

    // Part 4: Harmika (Square shrine box with gold trim)
    const harmika = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.45, 0.7),
      new THREE.MeshStandardMaterial({ color: 0xc4a36a, roughness: 0.3, metalness: 0.75 })
    );
    harmika.position.y = 1.85;
    stupaGroup.add(harmika);

    // Part 5: 13-ring Spire
    const spire = new THREE.Mesh(
      new THREE.ConeGeometry(0.35, 1.2, 16),
      new THREE.MeshStandardMaterial({ color: 0xdfc89e, roughness: 0.25, metalness: 0.85 })
    );
    spire.position.y = 2.65;
    stupaGroup.add(spire);

    // Part 6: Crescent Sun Jewel finial
    const jewel = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.9 })
    );
    jewel.position.y = 3.3;
    stupaGroup.add(jewel);

    stupaGroup.position.set(-6, 2.2, 7);
    stupaGroup.scale.set(0.85, 0.85, 0.85);
    terrainGroup.add(stupaGroup);

    // 10. Himalayan Pine Forest (InstancedMesh with scale & tint variation)
    const treeCount = isSoftwareGl ? 80 : 220;
    const treeTrunkGeo = new THREE.CylinderGeometry(0.08, 0.14, 0.6, 6);
    const treeFoliageGeo = new THREE.ConeGeometry(0.55, 1.6, 6);
    treeFoliageGeo.translate(0, 1.0, 0);

    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x274334,
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
    });

    const treeInstances = new THREE.InstancedMesh(treeFoliageGeo, foliageMat, treeCount);
    treeInstances.castShadow = !isSoftwareGl;
    treeInstances.receiveShadow = !isSoftwareGl;

    let planted = 0;
    const foliageTints = [0x1c382b, 0x234335, 0x2e5241, 0x3d6652, 0x173124];

    for (let i = 0; i < treeCount * 3 && planted < treeCount; i++) {
      const rx = (Math.random() - 0.5) * 36;
      const rz = (Math.random() - 0.5) * 36;
      const d = Math.sqrt(rx * rx + rz * rz);

      // Trees grow between elevations 1.2m and 4.2m, outside the lake
      if (d > 7 && d < 22) {
        // Approximate height
        const lakeDist = Math.sqrt((rx - 8) * (rx - 8) + (rz - 8) * (rz - 8));
        if (lakeDist > 5.5) {
          const s = 0.6 + Math.random() * 0.5;
          _pos.set(rx, 1.2 + Math.random() * 2.2, rz);
          _scale.set(s, s * (0.85 + Math.random() * 0.3), s);
          _quat.setFromAxisAngle(THREE.Object3D.DEFAULT_UP, Math.random() * Math.PI * 2);
          _mat4.compose(_pos, _quat, _scale);
          treeInstances.setMatrixAt(planted, _mat4);

          _color.setHex(foliageTints[planted % foliageTints.length]);
          treeInstances.setColorAt(planted, _color);
          planted++;
        }
      }
    }
    treeInstances.computeBoundingSphere();
    terrainGroup.add(treeInstances);

    // 11. Fluttering Himalayan Prayer Flag Lines (Blue, White, Red, Green, Yellow)
    const prayerFlagColors = [0x1e88e5, 0xffffff, 0xe53935, 0x43a047, 0xfdd835];
    const flagGroup = new THREE.Group();
    const flagCount = 20;
    const flagGeo = new THREE.PlaneGeometry(0.3, 0.45);
    flagGeo.translate(0, -0.22, 0);

    const flagMeshes: THREE.Mesh[] = [];
    for (let f = 0; f < flagCount; f++) {
      const t = f / (flagCount - 1);
      const c = prayerFlagColors[f % prayerFlagColors.length];
      const mat = new THREE.MeshStandardMaterial({
        color: c,
        roughness: 0.8,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(flagGeo, mat);
      // String between chorten and mountain pole
      const startX = -6, startY = 4.6, startZ = 7;
      const endX = -12, endY = 6.2, endZ = 12;
      const fx = startX + (endX - startX) * t;
      const fz = startZ + (endZ - startZ) * t;
      const catenarySag = Math.sin(t * Math.PI) * 0.6;
      const fy = startY + (endY - startY) * t - catenarySag;

      mesh.position.set(fx, fy, fz);
      flagGroup.add(mesh);
      flagMeshes.push(mesh);
    }
    terrainGroup.add(flagGroup);

    // 12. Dynamic 3D Snow Particle System (1,000 instances)
    const snowCount = isSoftwareGl ? 350 : 1000;
    const snowGeo = new THREE.BufferGeometry();
    const snowPositions = new Float32Array(snowCount * 3);
    const snowVelocities = new Float32Array(snowCount * 3);

    for (let i = 0; i < snowCount; i++) {
      snowPositions[i * 3] = (Math.random() - 0.5) * 45;
      snowPositions[i * 3 + 1] = Math.random() * 26;
      snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 45;

      snowVelocities[i * 3] = (Math.random() - 0.5) * 0.05;
      snowVelocities[i * 3 + 1] = 0.04 + Math.random() * 0.08;
      snowVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
    const snowMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.28,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const snowPoints = new THREE.Points(snowGeo, snowMat);
    scene.add(snowPoints);

    // 13. Dynamic Volumetric Mountain Fog / Cloud Planes
    const cloudGroup = new THREE.Group();
    const cloudCount = 6;
    const cloudGeo = new THREE.PlaneGeometry(28, 14);
    cloudGeo.rotateX(-Math.PI / 2.3);

    const cloudPlanes: THREE.Mesh[] = [];
    for (let c = 0; c < cloudCount; c++) {
      const cloudMat = new THREE.MeshBasicMaterial({
        color: 0xecf3f0,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      });
      const cloud = new THREE.Mesh(cloudGeo, cloudMat);
      cloud.position.set(
        (Math.random() - 0.5) * 20,
        2.5 + c * 1.4,
        (Math.random() - 0.5) * 20
      );
      cloud.rotation.z = Math.random() * 0.3;
      cloudGroup.add(cloud);
      cloudPlanes.push(cloud);
    }
    scene.add(cloudGroup);

    // 14. Starry Cosmos Night Sky (twinkling starfield)
    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount; s++) {
      _vec3.set(
        (Math.random() - 0.5) * 200,
        30 + Math.random() * 80,
        (Math.random() - 0.5) * 200
      ).normalize().multiplyScalar(120);
      starPositions[s * 3] = _vec3.x;
      starPositions[s * 3 + 1] = Math.abs(_vec3.y);
      starPositions[s * 3 + 2] = _vec3.z;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.45,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 15. Render Loop with software WebGL guard
    let frameId = 0;
    const startTime = performance.now();
    let lastTime = startTime;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const now = performance.now();
      const delta = Math.min(0.1, (now - lastTime) / 1000);
      const elapsedTime = (now - startTime) / 1000;
      lastTime = now;

      // Read current state from refs
      const curCondition = conditionRef.current;
      const curTime = timeOfDayRef.current;
      const curWind = windSpeedRef.current;
      const curElevation = elevationRef.current;

      // Dynamic Sky & Atmospheric Lighting by Time of Day
      if (curTime === 'dawn') {
        if (scene.fog) scene.fog.color.setHex(0xe8d0bd);
        renderer.setClearColor(0xe8d0bd, 1);
        dirLight.color.setHex(0xffaa66);
        dirLight.intensity = 2.8;
        dirLight.position.set(30, 8, 15);
        hemisphereLight.color.setHex(0xffcb9a);
        hemisphereLight.groundColor.setHex(0x38413b);
        starMat.opacity = 0;
      } else if (curTime === 'sunset') {
        if (scene.fog) scene.fog.color.setHex(0xdfa588);
        renderer.setClearColor(0xdfa588, 1);
        dirLight.color.setHex(0xff7744);
        dirLight.intensity = 2.6;
        dirLight.position.set(-30, 9, -15);
        hemisphereLight.color.setHex(0xe28f68);
        hemisphereLight.groundColor.setHex(0x2d342f);
        starMat.opacity = 0;
      } else if (curTime === 'night') {
        if (scene.fog) scene.fog.color.setHex(0x0e1b24);
        renderer.setClearColor(0x0e1b24, 1);
        dirLight.color.setHex(0xaecde6);
        dirLight.intensity = 0.8;
        dirLight.position.set(-15, 25, 20);
        hemisphereLight.color.setHex(0x192d3b);
        hemisphereLight.groundColor.setHex(0x0a1217);
        starMat.opacity = 0.95;
      } else {
        // Daylight
        if (scene.fog) scene.fog.color.setHex(0xd6e5e3);
        renderer.setClearColor(0xd6e5e3, 1);
        dirLight.color.setHex(0xfff7e6);
        dirLight.intensity = 2.4;
        dirLight.position.set(25, 30, 20);
        hemisphereLight.color.setHex(0xfff8e7);
        hemisphereLight.groundColor.setHex(0x3d4a41);
        starMat.opacity = 0;
      }

      // Wind Factor for particle & flag speed
      const windFactor = Math.max(0.5, curWind / 18);

      // Animate prayer flags flutter
      for (let f = 0; f < flagMeshes.length; f++) {
        const flag = flagMeshes[f];
        const flutter = Math.sin(elapsedTime * (5 * windFactor) + f * 0.8) * (0.2 * windFactor);
        flag.rotation.x = flutter;
        flag.rotation.z = Math.cos(elapsedTime * (4 * windFactor) + f) * 0.15;
      }

      // Animate Snowfall Particles
      const isSnowActive = curCondition === 'snow' || curCondition === 'blizzard' || curElevation > 4500;
      snowPoints.visible = isSnowActive;

      if (isSnowActive) {
        const pAttr = snowGeo.attributes.position as THREE.BufferAttribute;
        const positions = pAttr.array as Float32Array;

        for (let i = 0; i < snowCount; i++) {
          const idx = i * 3;
          // Fall downwards
          positions[idx + 1] -= snowVelocities[idx + 1] * (curCondition === 'blizzard' ? 2.2 : 1.0);
          // Drift with wind
          positions[idx] += windFactor * 0.04 + Math.sin(elapsedTime + i) * 0.01;

          // Recycle when hitting terrain ground
          if (positions[idx + 1] < 0) {
            positions[idx + 1] = 25;
            positions[idx] = (Math.random() - 0.5) * 45;
            positions[idx + 2] = (Math.random() - 0.5) * 45;
          }
        }
        pAttr.needsUpdate = true;
      }

      // Animate Valley Fog / Mist Planes
      const isFogActive = curCondition === 'foggy' || curCondition === 'partly_cloudy';
      cloudGroup.visible = isFogActive;

      for (let c = 0; c < cloudPlanes.length; c++) {
        const cloud = cloudPlanes[c];
        cloud.position.x += Math.cos(c * 1.2) * 0.015 * windFactor;
        cloud.position.z += Math.sin(c * 1.5) * 0.012 * windFactor;

        // Wrap around boundaries
        if (cloud.position.x > 22) cloud.position.x = -22;
        if (cloud.position.x < -22) cloud.position.x = 22;
        if (cloud.position.z > 22) cloud.position.z = -22;
        if (cloud.position.z < -22) cloud.position.z = 22;
      }

      // Update Controls
      controls.update();

      // Render frame
      renderer.render(scene, camera);

      // Loop scheduling: Software WebGL guard
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    // Start loop
    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 800;
      const newH = container.clientHeight || 500;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);

      // Dispose resources
      controls.dispose();
      renderer.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      lakeGeo.dispose();
      lakeMat.dispose();
      plinth1.geometry.dispose();
      plinth2.geometry.dispose();
      kumbha.geometry.dispose();
      harmika.geometry.dispose();
      spire.geometry.dispose();
      jewel.geometry.dispose();
      treeTrunkGeo.dispose();
      treeFoliageGeo.dispose();
      foliageMat.dispose();
      treeInstances.dispose();
      flagGeo.dispose();
      snowGeo.dispose();
      snowMat.dispose();
      cloudGeo.dispose();
      starGeo.dispose();
      starMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};
