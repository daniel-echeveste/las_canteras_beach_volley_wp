import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Plane } from "@react-three/drei";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import Ocean from "../BeachComponents/ocean";
import Sand from "../BeachComponents/Sand";
import Courts from "../BeachComponents/Courts";

export default function Exp6() {
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
                    <Sand />

                    {/* Ocean - Placed at Z = -60 (North of courts) */}
                    <Ocean
                        position={[0, 0, -100]}
                        color1="#006994"
                        color2="#003380"
                    />

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

                    <Courts />

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

