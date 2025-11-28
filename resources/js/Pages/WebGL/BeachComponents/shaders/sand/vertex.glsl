varying vec2 vUv;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Subtle wave effect
  // float wave = sin(pos.x * 0.1 + uTime * 0.5) * 0.2 + cos(pos.y * 0.1 + uTime * 0.3) * 0.2;
  // pos.z += wave;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
