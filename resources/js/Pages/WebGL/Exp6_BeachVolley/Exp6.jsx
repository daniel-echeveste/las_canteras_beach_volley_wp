import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import Ocean from "../BeachComponents/ocean";
import Sand from "../BeachComponents/Sand";
import Courts from "../BeachComponents/Courts";
import SkyEnvironment from "../BeachComponents/SkyEnvironment";
import Avenue from "../BeachComponents/Avenue";

export default function Exp6() {
    return (
        <>
            <Head title="Exp 6: Torneo Playa" />
            <div className="h-screen w-full bg-blue-200">
                <Navbar />
                {/* jugar con el fov , efectos chullos, probar 100 desde cerca a las redes */}
                <Canvas shadows camera={{ position: [0, 15, 50], fov: 75 }}>
                    <SkyEnvironment preset="real-time" />

                    {/* Main Sand Beach */}
                    <Sand />

                    {/* Ocean - Placed at Z = -60 (North of courts) */}
                    <Ocean
                        position={[0, 0, -100]}
                        args={[200, 100, 64, 64]}
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

                    <Avenue position={[0, 0.1, 58]} />

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

