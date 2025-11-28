import React from "react";
import { Plane } from "@react-three/drei";
import vertexShader from "./shaders/avenue/vertex.glsl";
import fragmentShader from "./shaders/avenue/fragment.glsl";

export default function Avenue(props) {
    return (
        <Plane
            args={[500, 20]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
            {...props}
        >
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </Plane>
    );
}
