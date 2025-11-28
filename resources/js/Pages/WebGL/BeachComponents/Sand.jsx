import React, { useRef } from "react";
import { Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "./shaders/sand/vertex.glsl";
import fragmentShader from "./shaders/sand/fragment.glsl";

export default function Sand(props) {
    const ref = useRef();

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.material.uniforms.uTime.value += delta;
        }
    });

    return (
        <Plane
            ref={ref}
            args={[200, 100, 64, 64]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
            {...props}
        >
            <shaderMaterial
                uniforms={{
                    uTime: { value: 0 },
                    uColor: { value: new THREE.Color("#f2d2a9") }
                }}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </Plane>
    );
}
