import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";


export default function Ocean({
    position = [0, -2, 0],
    rotation = [-Math.PI / 2, 0, 0],
    args = [100, 100, 64, 64],
    color1 = "#0080cc", // Default blue
    color2 = "#003380", // Default darker blue
    ...props
}) {
    const ref = useRef();

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.material.uniforms.uTime.value += delta;
        }
    });

    const vertexShader = `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 2.0 + uTime) * 0.5;
      pos.z += cos(pos.y * 2.0 + uTime) * 0.5;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

    // Convert hex colors to vec3 for shader
    // We can pass them as uniforms
    const fragmentShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    
    void main() {
      float mixValue = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
      gl_FragColor = vec4(mix(uColor1, uColor2, mixValue), 0.8);
    }
  `;

    // Helper to convert hex to THREE.Color
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);

    return (
        <mesh ref={ref} rotation={rotation} position={position} {...props}>
            <planeGeometry args={args} />
            <shaderMaterial
                uniforms={{
                    uTime: { value: 0 },
                    uColor1: { value: c1 },
                    uColor2: { value: c2 }
                }}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                wireframe={false}
            />
        </mesh>
    );
}

