import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Cylinder, Sphere } from "@react-three/drei";

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
            <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
                <boxGeometry args={[8.5, 1.4, 0.1]} />
                <meshStandardMaterial color="black" opacity={0.3} transparent />
            </mesh>
            <mesh position={[0, 2.4, 0]} >
                <boxGeometry args={[8.5, 0.1, 0.1]} />
                <meshStandardMaterial color="yellow" />
            </mesh>
            <mesh position={[4.25, 1.2, 0]} >
                <cylinderGeometry args={[0.05, 0.05, 2.4]} />
                <meshStandardMaterial color="yellow" />
            </mesh>
            <mesh position={[-4.25, 1.2, 0]} >
                <cylinderGeometry args={[0.05, 0.05, 2.4]} />
                <meshStandardMaterial color="yellow" />
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

export default function Courts() {
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

    return <>{courts}</>;
}
