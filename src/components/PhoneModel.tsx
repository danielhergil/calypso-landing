import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import TextureDebugPanel from './TextureDebugPanel';

interface PhoneModelProps {
  modelPath: string;
  rotation?: number;
  repeatX?: number;
  repeatY?: number;
  offsetX?: number;
  offsetY?: number;
  flipY?: boolean;
  roughness?: number;
  metalness?: number;
  envMapIntensity?: number;
}

const PhoneModel: React.FC<PhoneModelProps> = ({
  modelPath,
  rotation = -Math.PI / 2, // -90 degrees
  repeatX = 5.00,
  repeatY = 4.50,
  offsetX = -0.60,
  offsetY = -0.04,
  flipY = true,
  roughness = 0,
  metalness = 0,
  envMapIntensity = 0.2
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  // Load the screen image as texture
  const screenTexture = useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/calypso_home_screen.jpeg');

    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    return texture;
  }, []);

  // Clone scene and apply texture
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();

    // Calculate bounding box to center the model
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());

    // Center the model by offsetting all meshes
    cloned.position.set(-center.x, -center.y, -center.z);

    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const materialName = (child.material as any)?.name?.toLowerCase() || '';

        // Only apply texture to the main front screen (Object_9)
        if (child.name === 'Object_9' && materialName.includes('screen')) {
          console.log('Applying texture to main screen:', child.name);

          if (screenTexture) {
            // Clone and configure the texture
            const textureClone = screenTexture.clone();
            textureClone.needsUpdate = true;

            // Apply adjustments from state
            textureClone.center.set(0.5, 0.5);
            textureClone.rotation = rotation;
            textureClone.repeat.set(repeatX, repeatY);
            textureClone.offset.set(offsetX, offsetY);
            textureClone.flipY = flipY;

            child.material = new THREE.MeshStandardMaterial({
              map: textureClone,
              emissive: new THREE.Color(0x000000), // No emissive glow
              emissiveIntensity: 0,
              roughness, // Adjustable roughness
              metalness, // Adjustable metalness
              envMapIntensity, // Adjustable environment map intensity
            });
          }
        }
      }
    });

    return cloned;
  }, [scene, screenTexture, rotation, repeatX, repeatY, offsetX, offsetY, flipY, roughness, metalness, envMapIntensity]);

  return (
    <group
      ref={groupRef}
      scale={[1.1, 1.1, 1.1]}
      rotation={[0.1, 0.3, 0]}
      position={[0, 0, 0]}
    >
      <primitive object={clonedScene} />
    </group>
  );
};

export { TextureDebugPanel };

// Preload the model
useGLTF.preload('/src/models/samsung_s24_ultra.glb');

export default PhoneModel;
