import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { type CustomizationState } from "@/app/customize/[id]/page";// Adjust path if needed

type GLTFResult = GLTF & {
  nodes: { [name: string]: THREE.Mesh }
  materials: { [name: string]: THREE.MeshStandardMaterial }
}

export function Model({ customization }: { customization: CustomizationState }) {
  const { nodes, materials } = useGLTF('/nissan_silvia_s15_customgltf/scene-transformed.glb') as GLTFResult

  // --- Create Custom Materials ---
  const paintMaterial = new THREE.MeshStandardMaterial({
    color: customization.color,
    metalness: 0.2,
    roughness: 0.1,
    envMapIntensity: 0.8,
  });

  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: customization.wheelColor,
    metalness: 0.9,
    roughness: 0.2,
  });

  const carbonMaterial = new THREE.MeshStandardMaterial({
    color: '#333333',
    metalness: 0.3,
    roughness: 0.4,
  });

  // --- Define Part Names ---
  const bodyParts = [ 'Object_33', 'Object_34', 'Object_35', 'Object_36', 'Object_37', 'Object_38', 'Object_39', 'Object_40' ];
  const spoilerParts = ['Object_21'];
  const bodyKitParts = [ 'Object_23', 'Object_24', 'Object_25', 'Object_26', 'Object_27', 'Object_28', 'Object_29', 'Object_30', 'Object_31', 'Object_32' ];
  const wheelParts = [ 'Object_53', 'Object_54' ]; 

  return (
    <group dispose={null} scale={1.2}>
      {/* ===== Car Body ===== */}
      {bodyParts.map(name => nodes[name] && <mesh key={name} geometry={nodes[name].geometry} material={paintMaterial} />)}

      {/* ===== Static Parts (Always Visible) - We use their original materials ===== */}
      {nodes.Object_2 && <mesh geometry={nodes.Object_2.geometry} material={materials.Nissan_SilviaS15TNR0_1999BadgeA_Material} />}
      {nodes.Object_5 && <mesh geometry={nodes.Object_5.geometry} material={materials.Nissan_SilviaS15TNR0_1999Base_Material} />}
      {nodes.Object_55 && <mesh geometry={nodes.Object_55.geometry} material={materials.Nissan_SilviaS15TNR0_1999WindowInside_Material} />}
      {nodes.Object_56 && <mesh geometry={nodes.Object_56.geometry} material={materials.Nissan_SilviaS15TNR0_1999Window_Material} />}
      {nodes.Object_42 && <mesh geometry={nodes.Object_42.geometry} material={materials.badge_rims} />}
      {nodes.Object_58 && <mesh geometry={nodes.Object_58.geometry} material={materials.tire} />}
      
      {/* ===== MODIFICATIONS (Conditionally Rendered) ===== */}
      {customization.selectedParts.includes('wheels') && (
        <>
          {wheelParts.map(name => nodes[name] && <mesh key={name} geometry={nodes[name].geometry} material={wheelMaterial} />)}
        </>
      )}

      {customization.selectedParts.includes('spoiler') && (
        <>
          {spoilerParts.map(name => nodes[name] && <mesh key={name} geometry={nodes[name].geometry} material={carbonMaterial} />)}
        </>
      )}

      {customization.selectedParts.includes('bodykit') && (
        <>
          {bodyKitParts.map(name => nodes[name] && <mesh key={name} geometry={nodes[name].geometry} material={carbonMaterial} />)}
        </>
      )}
    </group>
  )
}

useGLTF.preload('/nissan_silvia_s15_customgltf/scene-transformed.glb')