import{r as i,j as o,S as C}from"./app-CS6aqrjn.js";import{V as l,S as E,X as _,Y as T,M as R,Z as z,$ as A,_ as j,G as F,x as b,a0 as B,a1 as D,J as I,K as N}from"./OrbitControls-6ah9jigJ.js";import{N as L}from"./Navbar-C5kg0ew6.js";import{v as O}from"./constants-BRcwTbUT.js";var V=Object.defineProperty,k=(t,a,e)=>a in t?V(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e,S=(t,a,e)=>(k(t,typeof a!="symbol"?a+"":a,e),e);const G=(()=>{const t={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new l},up:{value:new l(0,1,0)}},vertexShader:`
      uniform vec3 sunPosition;
      uniform float rayleigh;
      uniform float turbidity;
      uniform float mieCoefficient;
      uniform vec3 up;

      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      // constants for atmospheric scattering
      const float e = 2.71828182845904523536028747135266249775724709369995957;
      const float pi = 3.141592653589793238462643383279502884197169;

      // wavelength of used primaries, according to preetham
      const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
      // this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
      // (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
      const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

      // mie stuff
      // K coefficient for the primaries
      const float v = 4.0;
      const vec3 K = vec3( 0.686, 0.678, 0.666 );
      // MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
      const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

      // earth shadow hack
      // cutoffAngle = pi / 1.95;
      const float cutoffAngle = 1.6110731556870734;
      const float steepness = 1.5;
      const float EE = 1000.0;

      float sunIntensity( float zenithAngleCos ) {
        zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
        return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
      }

      vec3 totalMie( float T ) {
        float c = ( 0.2 * T ) * 10E-18;
        return 0.434 * c * MieConst;
      }

      void main() {

        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position.z = gl_Position.w; // set z to camera.far

        vSunDirection = normalize( sunPosition );

        vSunE = sunIntensity( dot( vSunDirection, up ) );

        vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

        float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

      // extinction (absorbtion + out scattering)
      // rayleigh coefficients
        vBetaR = totalRayleigh * rayleighCoefficient;

      // mie coefficients
        vBetaM = totalMie( turbidity ) * mieCoefficient;

      }
    `,fragmentShader:`
      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      uniform float mieDirectionalG;
      uniform vec3 up;

      const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );

      // constants for atmospheric scattering
      const float pi = 3.141592653589793238462643383279502884197169;

      const float n = 1.0003; // refractive index of air
      const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

      // optical length at zenith for molecules
      const float rayleighZenithLength = 8.4E3;
      const float mieZenithLength = 1.25E3;
      // 66 arc seconds -> degrees, and the cosine of that
      const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

      // 3.0 / ( 16.0 * pi )
      const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
      // 1.0 / ( 4.0 * pi )
      const float ONE_OVER_FOURPI = 0.07957747154594767;

      float rayleighPhase( float cosTheta ) {
        return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
      }

      float hgPhase( float cosTheta, float g ) {
        float g2 = pow( g, 2.0 );
        float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
        return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
      }

      void main() {

        vec3 direction = normalize( vWorldPosition - cameraPos );

      // optical length
      // cutoff angle at 90 to avoid singularity in next formula.
        float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
        float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
        float sR = rayleighZenithLength * inverse;
        float sM = mieZenithLength * inverse;

      // combined extinction factor
        vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

      // in scattering
        float cosTheta = dot( direction, vSunDirection );

        float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
        vec3 betaRTheta = vBetaR * rPhase;

        float mPhase = hgPhase( cosTheta, mieDirectionalG );
        vec3 betaMTheta = vBetaM * mPhase;

        vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
        Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

      // nightsky
        float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
        float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
        vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
        vec3 L0 = vec3( 0.1 ) * Fex;

      // composition + solar disc
        float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
        L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

        vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

        vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

        gl_FragColor = vec4( retColor, 1.0 );

      #include <tonemapping_fragment>
      #include <${O>=154?"colorspace_fragment":"encodings_fragment"}>

      }
    `},a=new E({name:"SkyShader",fragmentShader:t.fragmentShader,vertexShader:t.vertexShader,uniforms:T.clone(t.uniforms),side:_,depthWrite:!1});class e extends R{constructor(){super(new z(1,1,1),a)}}return S(e,"SkyShader",t),S(e,"material",a),e})(),U=()=>parseInt(A.replace(/\D+/g,"")),W=U();function K(t,a,e=new l){const r=Math.PI*(t-.5),n=2*Math.PI*(a-.5);return e.x=Math.cos(n),e.y=Math.sin(r),e.z=Math.sin(n),e}const Z=i.forwardRef(({inclination:t=.6,azimuth:a=.1,distance:e=1e3,mieCoefficient:r=.005,mieDirectionalG:n=.8,rayleigh:v=.5,turbidity:m=10,sunPosition:u=K(t,a),...s},h)=>{const d=i.useMemo(()=>new l().setScalar(e),[e]),[p]=i.useState(()=>new G);return i.createElement("primitive",j({object:p,ref:h,"material-uniforms-mieCoefficient-value":r,"material-uniforms-mieDirectionalG-value":n,"material-uniforms-rayleigh-value":v,"material-uniforms-sunPosition-value":u,"material-uniforms-turbidity-value":m,scale:d},s))});class $ extends E{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${W>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const H=t=>new l().setFromSpherical(new D(t,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),X=i.forwardRef(({radius:t=100,depth:a=50,count:e=5e3,saturation:r=0,factor:n=4,fade:v=!1,speed:m=1},u)=>{const s=i.useRef(),[h,d,p]=i.useMemo(()=>{const c=[],x=[],P=Array.from({length:e},()=>(.5+.5*Math.random())*n),f=new F;let y=t+a;const w=a/e;for(let g=0;g<e;g++)y-=w*Math.random(),c.push(...H(y).toArray()),f.setHSL(g/e,r,.9),x.push(f.r,f.g,f.b);return[new Float32Array(c),new Float32Array(x),new Float32Array(P)]},[e,a,n,t,r]);b(c=>s.current&&(s.current.uniforms.time.value=c.clock.elapsedTime*m));const[M]=i.useState(()=>new $);return i.createElement("points",{ref:u},i.createElement("bufferGeometry",null,i.createElement("bufferAttribute",{attach:"attributes-position",args:[h,3]}),i.createElement("bufferAttribute",{attach:"attributes-color",args:[d,3]}),i.createElement("bufferAttribute",{attach:"attributes-size",args:[p,1]})),i.createElement("primitive",{ref:s,object:M,attach:"material",blending:B,"uniforms-fade-value":v,depthWrite:!1,transparent:!0,vertexColors:!0}))});function J(){const t=i.useRef();return b((r,n)=>{t.current.material.uniforms.uTime.value+=n}),o.jsxs("mesh",{ref:t,rotation:[-Math.PI/2,0,0],position:[0,-2,0],children:[o.jsx("planeGeometry",{args:[100,100,64,64]}),o.jsx("shaderMaterial",{uniforms:{uTime:{value:0}},vertexShader:`
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 2.0 + uTime) * 0.5;
      pos.z += cos(pos.y * 2.0 + uTime) * 0.5;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,fragmentShader:`
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vec3 color1 = vec3(0.0, 0.5, 0.8);
      vec3 color2 = vec3(0.0, 0.2, 0.5);
      float mixValue = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
      gl_FragColor = vec4(mix(color1, color2, mixValue), 0.8);
    }
  `,transparent:!0,wireframe:!1})]})}function te(){return o.jsxs(o.Fragment,{children:[o.jsx(C,{title:"Exp 3: Ocean Sunset"}),o.jsxs("div",{className:"h-screen w-full bg-black",children:[o.jsx(L,{}),o.jsxs(I,{camera:{position:[0,5,10],fov:45},children:[o.jsx("ambientLight",{intensity:.2}),o.jsx(J,{}),o.jsx(Z,{sunPosition:[100,10,100],turbidity:.1,rayleigh:.5,mieCoefficient:.005,mieDirectionalG:.8}),o.jsx(X,{radius:100,depth:50,count:5e3,factor:4,saturation:0,fade:!0,speed:1}),o.jsx(N,{maxPolarAngle:Math.PI/2-.1})]}),o.jsxs("div",{className:"absolute bottom-10 left-0 w-full text-center pointer-events-none",children:[o.jsx("h1",{className:"text-4xl font-extrabold text-white drop-shadow-lg",children:"Experiencia 3: Atardecer en el Mar"}),o.jsx("p",{className:"text-white/80 text-lg mt-2",children:"La calma después del partido."})]})]})]})}export{te as default};
