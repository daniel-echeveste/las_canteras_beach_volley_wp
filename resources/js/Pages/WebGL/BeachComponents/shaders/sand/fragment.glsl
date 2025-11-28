varying vec2 vUv;
uniform float uTime;
uniform vec3 uColor;

// Simple pseudo-random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
    // Base color
    vec3 color = uColor;
    
    // Add noise for sand texture
    float n = noise(vUv * 50.0); // High frequency noise for grain
    
    // Mix noise with base color
    color = mix(color, color * 0.8, n * 0.3);
    
    gl_FragColor = vec4(color, 1.0);
}
