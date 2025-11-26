import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky, Plane, Cylinder, Sphere } from "@react-three/drei";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import * as THREE from "three";

// Player Component (Tube/Cylinder)
function Player({ position, color }) {
    return (
        <Cylinder position={position} args={[0.3, 0.3, 1.8, 16]} castShadow receiveShadow>
            <meshStandardMaterial color={color} />
        </Cylinder>
    );
}

// Ball Component
function Ball({ startZ, endZ }) {
    const mesh = useRef();
    // Randomize start phase to avoid all balls moving in sync
    const [offset] = useState(Math.random() * Math.PI * 2);
    const speed = 3;

    useFrame((state) => {
        if (mesh.current) {
            const time = state.clock.getElapsedTime() * speed + offset;
            // Move back and forth between startZ and endZ
            // Sine wave from -1 to 1 -> map to startZ to endZ
            const alpha = Math.sin(time); // -1 to 1

            // Map alpha to Z position
            // We want to go from startZ to endZ.
            // Center is (startZ + endZ) / 2
            // Range is (endZ - startZ) / 2
            const center = (startZ + endZ) / 2;
            const range = (endZ - startZ) / 2;

            mesh.current.position.z = center + alpha * range;

            // Height (parabola)
            // When alpha is 0 (center), height is max.
            // When alpha is -1 or 1 (ends), height is min (approx player hand height).
            // h = maxH - k * alpha^2
            // Let's say max height is 4m, min height is 2m.
            mesh.current.position.y = 4 - 2 * (alpha * alpha);
        }
    });

    return (
        <Sphere ref={mesh} position={[0, 3, 0]} args={[0.2, 32, 32]} castShadow>
            <meshStandardMaterial color="white" />
        </Sphere>
    );
}

// Court Component
function Court({ position }) {
    // Court size: 8m wide (X), 16m long (Z)
    // Net at Z=0 relative to court center
    return (
        <group position={position} rotation={[0, Math.PI / 2, 0]} scale={1.2}>
            {/* Court Lines / Sand Area */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
                <planeGeometry args={[9, 17]} />
                <meshStandardMaterial color="#e6c288" />
            </mesh>

            {/* Net */}
            <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
                <boxGeometry args={[8.5, 2.4, 0.1]} />
                <meshStandardMaterial color="black" opacity={0.3} transparent />
            </mesh>
            <mesh position={[0, 2.4, 0]} >
                <boxGeometry args={[8.5, 0.1, 0.1]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[4.25, 1.2, 0]} >
                <cylinderGeometry args={[0.05, 0.05, 2.4]} />
                <meshStandardMaterial color="gray" />
            </mesh>
            <mesh position={[-4.25, 1.2, 0]} >
                <cylinderGeometry args={[0.05, 0.05, 2.4]} />
                <meshStandardMaterial color="gray" />
            </mesh>

            {/* Players Side A (Z < 0) - "North" side */}
            <Player position={[-2, 0.9, -4]} color="#ff4d4d" />
            <Player position={[2, 0.9, -4]} color="#ff4d4d" />

            {/* Players Side B (Z > 0) - "South" side */}
            <Player position={[-2, 0.9, 4]} color="#4d79ff" />
            <Player position={[2, 0.9, 4]} color="#4d79ff" />

            {/* Ball - passing between Z=-4 and Z=4 */}
            <Ball startZ={-4} endZ={4} />
        </group>
    );
}

export default function Exp6() {
    // 8 Courts: 2 rows of 4.
    // Sea is at Z < -something (North).
    // Courts oriented along Z.
    // Row 1 (closer to sea): Z = -10
    // Row 2 (further): Z = 10
    // Columns: X spaced.

    const courts = [];
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
            // Spacing: 15m X, 22m Z
            const x = (col - 1.5) * 15;
            const z = (row - 0.5) * 25;
            courts.push(
                <Court key={`${row}-${col}`} position={[z, 0, x]} />
            );
        }
    }

    return (
        <>
            <Head title="Exp 6: Torneo Playa" />
            <div className="h-screen w-full bg-blue-200">
                <Navbar />
                <Canvas shadows camera={{ position: [0, 30, 50], fov: 50 }}>
                    <Sky sunPosition={[100, 20, 100]} turbidity={0.5} rayleigh={0.5} />
                    <ambientLight intensity={0.6} />
                    <directionalLight
                        position={[50, 100, 50]}
                        intensity={1.5}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                        shadow-camera-left={-50}
                        shadow-camera-right={50}
                        shadow-camera-top={50}
                        shadow-camera-bottom={-50}
                    />

                    {/* Main Sand Beach */}
                    <Plane
                        args={[200, 100]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        receiveShadow
                    >
                        <meshStandardMaterial color="#f2d2a9" />
                    </Plane>

                    {/* Ocean - Placed at Z = -60 (North of courts) */}
                    <Plane
                        args={[500, 200]}
                        position={[0, -0.2, -150]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        <meshStandardMaterial color="#006994" roughness={0.1} metalness={0.5} />
                    </Plane>

                    {/* Waves/Foam hint (optional simple strip) */}
                    <Plane
                        args={[500, 5]}
                        position={[0, -0.15, -52]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        <meshStandardMaterial color="#e0f7fa" opacity={0.8} transparent />
                    </Plane>
                    <Plane
                        args={[500, 20]}
                        position={[0, 0.1, 58]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        <meshStandardMaterial color="red" opacity={0.8} transparent />
                    </Plane>
                    {courts}

                    <OrbitControls maxPolarAngle={Math.PI / 2 - 0.05} />
                </Canvas>

                <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg shadow-black">
                        Experiencia 6: Torneo de Playa
                    </h1>
                    <p className="text-white/90 text-lg mt-2 drop-shadow-md">
                        8 canchas, 32 jugadores, pura acción.
                    </p>
                </div>
            </div>
        </>
    );
}
