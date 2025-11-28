import React, { useMemo } from "react";
import { Sky, Stars } from "@react-three/drei";
import SunCalc from "suncalc";

export default function SkyEnvironment({ preset = "noon" }) {
    const realTimeConfig = useMemo(() => {
        if (preset !== "real-time") return null;

        const date = new Date();
        const lat = 28.45; // Las Canteras, approx
        const lng = -16.25;

        const sunPos = SunCalc.getPosition(date, lat, lng);
        const azimuth = sunPos.azimuth;
        const altitude = sunPos.altitude;

        // Convert to Cartesian (Y is up)
        // altitude: 0 at horizon, PI/2 at zenith
        // azimuth: 0 is South, increasing westward
        const r = 100; // Distance
        const y = r * Math.sin(altitude);
        const rPlane = r * Math.cos(altitude);
        const x = rPlane * Math.sin(azimuth);
        const z = rPlane * Math.cos(azimuth);

        const isNight = altitude < -0.05; // Slightly below horizon

        return {
            sunPosition: [x, y, z],
            turbidity: 0.1,
            rayleigh: isNight ? 0.1 : 0.5,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.8,
            stars: isNight,
            ambientIntensity: Math.max(0.1, Math.sin(Math.max(0, altitude)) * 0.8),
        };
    }, [preset]);

    const presets = {
        sunrise: {
            sunPosition: [100, 10, 100],
            turbidity: 0.1,
            rayleigh: 0.5,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.8,
            stars: false,
            ambientIntensity: 0.4,
        },
        noon: {
            sunPosition: [50, 100, 50],
            turbidity: 0.1,
            rayleigh: 0.1,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.8,
            stars: false,
            ambientIntensity: 0.8,
        },
        sunset: {
            sunPosition: [-100, 10, -100],
            turbidity: 0.2,
            rayleigh: 1.0,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.8,
            stars: false,
            ambientIntensity: 0.3,
        },
        midnight: {
            sunPosition: [0, -10, 0], // Sun below horizon
            turbidity: 0.1,
            rayleigh: 0.5,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.8,
            stars: true,
            ambientIntensity: 0.2,
        },
    };

    const config = preset === "real-time" ? realTimeConfig : (presets[preset] || presets.noon);

    return (
        <>
            <Sky
                sunPosition={config.sunPosition}
                turbidity={config.turbidity}
                rayleigh={config.rayleigh}
                mieCoefficient={config.mieCoefficient}
                mieDirectionalG={config.mieDirectionalG}
            />
            {config.stars && (
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
            )}
            <ambientLight intensity={config.ambientIntensity} />
            <directionalLight
                position={config.sunPosition}
                intensity={config.stars ? 0.2 : 1.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
            />
        </>
    );
}
