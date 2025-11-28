varying vec2 vUv;

void main() {
    // Brick pattern parameters
    vec2 brickSize = vec2(0.1, 0.05); // Size of each brick
    vec2 jointSize = vec2(0.01, 0.01); // Size of the mortar/joint
    
    // Adjust UVs for tiling
    vec2 uv = vUv * vec2(50.0, 10.0); // Scale UVs to repeat pattern
    
    // Offset every other row
    if (fract(uv.y * 0.5) > 0.5) {
        uv.x += 0.5;
    }
    
    // Calculate brick vs joint
    vec2 st = fract(uv);
    vec2 brick = step(jointSize, st);
    float isBrick = brick.x * brick.y;
    
    // Colors
    vec3 brickColor = vec3(0.8, 0.3, 0.2); // Terracotta/Reddish
    vec3 jointColor = vec3(0.9, 0.9, 0.9); // Light gray mortar
    
    // Mix colors
    vec3 color = mix(jointColor, brickColor, isBrick);
    
    gl_FragColor = vec4(color, 1.0);
}
