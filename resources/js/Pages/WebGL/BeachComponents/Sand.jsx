import React from "react";
import { Plane } from "@react-three/drei";

export default function Sand(props) {
    return (
        <Plane
            args={[200, 100]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
            {...props}
        >
            <meshStandardMaterial color="#f2d2a9" />
        </Plane>
    );
}
