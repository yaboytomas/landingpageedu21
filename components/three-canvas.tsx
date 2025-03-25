"use client"

import React, { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  Float,
  Environment,
  Text,
  PerspectiveCamera,
  MeshDistortMaterial,
  RoundedBox,
  MeshWobbleMaterial,
  MeshReflectorMaterial,
} from "@react-three/drei"
import * as THREE from "three"
import { Fallback3D } from "./fallback-3d"

// 3D Models
function FloatingLaptop(props: any) {
  const { viewport } = useThree()
  const group = useRef<THREE.Group>(null)

  // Animate laptop based on mouse position
  useFrame(({ mouse, clock }) => {
    if (!group.current) return

    const x = (mouse.x * viewport.width) / 50
    const y = (mouse.y * viewport.height) / 50

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y * 0.1, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.1, 0.1)

    // Add subtle floating animation
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
  })

  return (
    <group ref={group} {...props}>
      <RoundedBox args={[2, 0.1, 1.5]} radius={0.05} smoothness={4} position={[0, -0.1, 0]}>
        <MeshReflectorMaterial color="#222" metalness={0.9} roughness={0.1} mirror={0.75} resolution={1024} />
      </RoundedBox>
      <RoundedBox args={[2, 1.2, 0.1]} radius={0.05} smoothness={4} position={[0, 0.6, -0.65]} rotation={[0, 0, 0]}>
        <MeshReflectorMaterial color="#333" metalness={0.8} roughness={0.2} mirror={0.5} resolution={1024} />
      </RoundedBox>
      <RoundedBox args={[1.8, 1.1, 0.01]} radius={0.02} smoothness={4} position={[0, 0.6, -0.6]}>
        <MeshWobbleMaterial
          color="#7C3AED"
          factor={0.05}
          speed={2}
          metalness={0.8}
          roughness={0.2}
          emissive="#7C3AED"
          emissiveIntensity={0.5}
        />
      </RoundedBox>
      <Text position={[0, 0.6, -0.59]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        EDU21
      </Text>
      <Text position={[0, 0.3, -0.59]} fontSize={0.06} color="white" anchorX="center" anchorY="middle">
        Software Educativo
      </Text>
    </group>
  )
}

// 3D Floating Sphere
interface FloatingSphereProps {
  position: [number, number, number]
  color: string
  speed?: number
  wobble?: number
  size?: number
}

function FloatingSphere({ position, color, speed = 1, wobble = 0.5, size = 1 }: FloatingSphereProps) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return

    ref.current.position.y = Math.sin(clock.getElapsedTime() * speed) * 0.1
    ref.current.rotation.z = clock.getElapsedTime() * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial color={color} speed={wobble} distort={0.3} radius={1} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

// 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <FloatingLaptop position={[0, 0, 0]} />
      <FloatingSphere position={[-2, 1, -1]} color="#8B5CF6" speed={1.5} size={0.3} />
      <FloatingSphere position={[2, -0.5, -1]} color="#EC4899" speed={1} size={0.2} />
      <FloatingSphere position={[1.5, 1.5, -2]} color="#3B82F6" speed={2} size={0.25} />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} autoRotate={false} enablePan={false} />
    </>
  )
}

// Simple error boundary as a functional component
interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Main ThreeCanvas component that wraps the 3D elements
const ThreeCanvas = () => {
  return (
    <React.Suspense fallback={<Fallback3D />}>
      <ErrorBoundaryClass fallback={<Fallback3D />}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Scene />
        </Canvas>
      </ErrorBoundaryClass>
    </React.Suspense>
  );
};

export default ThreeCanvas; 