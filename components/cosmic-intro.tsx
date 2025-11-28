"use client"

import React, { useRef, useMemo, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing"

// Shader definitions
const starVertexShader = `
  uniform float uTime;
  attribute float aSize;
  attribute float aSpeed;
  varying float vAlpha;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * (300.0 / -mvPosition.z); // Size attenuation
    
    // Twinkle effect
    float twinkle = sin(uTime * aSpeed + position.x * 10.0);
    vAlpha = 0.5 + 0.5 * twinkle; 
  }
`

const starFragmentShader = `
  varying float vAlpha;
  void main() {
    // Circular particle
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha);
  }
`

const vertexShader = `
  uniform float uTime;
  uniform float uPhase; // 0: Galaxy, 1: Explosion, 2: Drift, 3: Collapse
  uniform float uExplosionProgress;
  uniform float uCollapseProgress;
  
  attribute vec3 aRandom;
  attribute float aSize;
  attribute vec3 aColor;
  
  varying vec3 vColor;
  varying float vAlpha;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) { 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec3 pos = position; 
    vColor = aColor;
    vAlpha = 1.0;

    // Phase 0: Galaxy - Rotation is handled via mesh rotation in JS
    // We add some vertical noise for "aliveness"
    if (uPhase < 1.0) {
        float noiseVal = snoise(pos * 2.0 + uTime * 0.5);
        pos.z += noiseVal * 0.1; // Small vertical undulation
    }
    
    // Phase 1: Explosion & Phase 2: Drift
    if (uPhase >= 1.0) {
        // Calculate explosion target
        vec3 explosionDir = normalize(position + aRandom);
        float dist = length(aRandom) * 40.0; // Explosion radius
        vec3 targetPos = explosionDir * dist;
        
        // Add curl/noise to trajectory
        float noiseVal = snoise(pos * 0.3 + uTime * 0.5);
        vec3 noiseOffset = vec3(noiseVal) * 3.0;
        
        // Lerp to exploded position
        pos = mix(pos, targetPos + noiseOffset, uExplosionProgress);
        
        // Add drift in Phase 2
        if (uPhase >= 2.0) {
             pos += aRandom * sin(uTime * 0.3) * 1.5;
        }
    }

    // Phase 3: Collapse to Screen
    if (uPhase >= 3.0) {
        // Target is a grid on the screen
        float screenX = aRandom.x * 16.0; // Width
        float screenY = aRandom.y * 9.0;  // Height
        vec3 screenPos = vec3(screenX, screenY, 0.0);
        
        float collapseFactor = pow(uCollapseProgress, 4.0); 
        
        pos = mix(pos, screenPos, collapseFactor);
        
        // As they collapse, they turn Cyan (Reference: #00fff7)
        if (collapseFactor > 0.5) {
             vColor = mix(vColor, vec3(0.0, 1.0, 0.97), (collapseFactor - 0.5) * 2.0);
        }
        
        // Create a hole in the center for text visibility
        // screenPos.xy is the position on the screen grid
        float distToCenter = length(vec2(screenX, screenY));
        // Fade out particles in the center zone (radius ~3.5)
        if (collapseFactor > 0.8 && distToCenter < 4.0) {
             vAlpha *= smoothstep(4.0, 2.0, distToCenter); // Fade out as it gets closer to center
        }
        
        if (collapseFactor > 0.9) {
             // Keep alpha controlled by hole logic
        } else {
             vAlpha = 1.0;
        }
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (aSize * 50.0) / -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Circular particle
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    // Soft edge
    float glow = 1.0 - (r * 2.0);
    glow = pow(glow, 1.5);
    
    gl_FragColor = vec4(vColor, vAlpha * glow);
  }
`

function ParticleSystem({ phase, explosionProgress, collapseProgress, data, globalStartTime }: { phase: number, explosionProgress: number, collapseProgress: number, data: any, globalStartTime: number }) {
  const mesh = useRef<THREE.Points>(null!)
  const { positions, randoms, sizes, colors } = data
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPhase: { value: 0 },
    uExplosionProgress: { value: 0 },
    uCollapseProgress: { value: 0 }
  }), [])

  useFrame(() => {
    // Use global start time for perfect synchronization between left/right panels
    const now = Date.now()
    const elapsed = (now - globalStartTime) / 1000
    
    const material = mesh.current.material as THREE.ShaderMaterial
    material.uniforms.uTime.value = elapsed
    material.uniforms.uPhase.value = phase
    material.uniforms.uExplosionProgress.value = explosionProgress
    material.uniforms.uCollapseProgress.value = collapseProgress
    
    // Phase 0: Rotate Galaxy
    if (phase === 0) {
        // Rotate around Z axis (since galaxy is in XY plane)
        mesh.current.rotation.z = -elapsed * 0.05 // Slower, majestic rotation
        
        // Tilt to match reference image (tilted view)
        // Original image shows galaxy tilted roughly 45-60 degrees
        mesh.current.rotation.x = -Math.PI / 3 // ~60 degrees tilt
        mesh.current.rotation.y = Math.PI / 6  // Slight angle
    }
    else if (phase >= 1 && phase < 3) {
        // Continue rotation
        mesh.current.rotation.z -= 0.005
    }
    else if (phase === 3) {
        // Reset rotation for screen collapse smoothly
        mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, 0, 0.05)
        mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, 0, 0.05)
        mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, 0, 0.05)
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
      />
    </points>
  )
}

function StarField({ data, globalStartTime }: { data: any, globalStartTime: number }) {
  const mesh = useRef<THREE.Points>(null!)
  const { positions, sizes, speeds } = data
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), [])

  useFrame(() => {
    const now = Date.now()
    const elapsed = (now - globalStartTime) / 1000
    
    if (mesh.current) {
        // Slowly rotate background stars
        mesh.current.rotation.y = elapsed * 0.01
        
        const material = mesh.current.material as THREE.ShaderMaterial
        material.uniforms.uTime.value = elapsed
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

function CameraController({ phase, mouseRef }: { phase: number, mouseRef: React.RefObject<{x: number, y: number}> }) {
  const { camera } = useThree()
  
  useFrame(() => {
    // Parallax Effect based on mouse position
    // We mix the original animation logic with mouse offset
    if (!mouseRef.current) return

    const targetX = mouseRef.current.x * 2 // Increased range for stronger parallax
    const targetY = mouseRef.current.y * 2

    if (phase === 0) {
        // Drift camera slowly + Mouse Parallax
        const baseZ = THREE.MathUtils.lerp(camera.position.z, 12, 0.02)
        camera.position.z = baseZ
        
        // Smoothly interpolate current camera pos to target mouse offset
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05)
        
        // Slight rotation to look at center
        camera.lookAt(0, 0, 0)
    } else if (phase === 1 || phase === 2) {
        // Pull back fast for explosion + Mouse Parallax
        const baseZ = THREE.MathUtils.lerp(camera.position.z, 30, 0.05)
        camera.position.z = baseZ
        
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX * 2, 0.05)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY * 2, 0.05)
        
        camera.lookAt(0, 0, 0)
    } else if (phase === 3) {
        // Zoom in to frame the screen - Reduce parallax for focus
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8, 0.05)
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.05)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.05)
        
        // Ensure perfect centering for boot screen
        camera.lookAt(0, 0, 0)
    }
  })
  
  return null
}

export default function CosmicIntro({ onComplete }: { onComplete: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState(0)
  const [explosionProgress, setExplosionProgress] = useState(0)
  const [collapseProgress, setCollapseProgress] = useState(0)
  const [text, setText] = useState("COSMIC ORIGIN")
  const [isExiting, setIsExiting] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  
  // Stable start time for synchronization
  const [globalStartTime] = useState(() => Date.now())
  
  // Global mouse tracker for synchronized parallax
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
        // Normalize to -1 to 1
        mouseRef.current = {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  // Random hex codes for system log effect
  const [systemLog, setSystemLog] = useState<string[]>([])
  useEffect(() => {
    const interval = setInterval(() => {
        const hex = Math.random().toString(16).substring(2, 10).toUpperCase()
        setSystemLog(prev => [...prev.slice(-4), `0x${hex}`])
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const particleData = useMemo(() => {
    const count = 50000 
    const positions = new Float32Array(count * 3)
    const randoms = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    // Realistic Spiral Galaxy Parameters
    const galaxyRadius = 8.0
    const arms = 2 
    const spinFactor = 5 // How much it winds
    const armWidth = 0.5 // Width of the spiral arms
    
    // Colors based on reference image
    const coreColor = new THREE.Color('#ffebd9')   // Warm White/Yellow Core
    const innerColor = new THREE.Color('#ff00cc')  // Pink/Magenta
    const outerColor = new THREE.Color('#4d0099')  // Deep Purple/Blue
    const dustColor = new THREE.Color('#1a0533')   // Dark Dust

    for (let i = 0; i < count; i++) {
      // 1. Generate Spiral Position
      const r = Math.pow(Math.random(), 2) * galaxyRadius
      
      const armIndex = i % arms
      const armAngle = (armIndex / arms) * Math.PI * 2
      
      const spinAngle = r * spinFactor
      
      const randomOffset = (Math.random() - 0.5) + (Math.random() - 0.5)
      const currentArmAngle = armAngle + spinAngle + randomOffset * armWidth * (2.0 / (r + 0.1)) 

      let x = Math.cos(currentArmAngle) * r
      let y = Math.sin(currentArmAngle) * r
      
      const zSpread = 0.1 + (r / galaxyRadius) * 0.5
      let z = (Math.random() - 0.5) * zSpread

      const isDust = Math.random() > 0.8
      if (isDust) {
        const randomAngle = Math.random() * Math.PI * 2
        x = Math.cos(randomAngle) * r
        y = Math.sin(randomAngle) * r
        z *= 2.0 
      }

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // 2. Generate Random Vectors
      randoms[i * 3] = (Math.random() - 0.5) 
      randoms[i * 3 + 1] = (Math.random() - 0.5)
      randoms[i * 3 + 2] = (Math.random() - 0.5)

      // 3. Size
      sizes[i] = Math.random() * 2.0 + 0.5
      if (r < 0.5) sizes[i] = Math.random() * 3.0 + 1.0; 

      // 4. Color Logic
      const mixedColor = coreColor.clone()
      
      if (isDust) {
        mixedColor.copy(dustColor)
        mixedColor.r += (Math.random() - 0.5) * 0.1
      } else {
        if (r < galaxyRadius * 0.15) {
             mixedColor.lerp(innerColor, r / (galaxyRadius * 0.15))
        } else {
             mixedColor.copy(innerColor).lerp(outerColor, (r - galaxyRadius * 0.15) / (galaxyRadius * 0.85))
        }
        
        mixedColor.r += (Math.random() - 0.5) * 0.1
        mixedColor.g += (Math.random() - 0.5) * 0.1
        mixedColor.b += (Math.random() - 0.5) * 0.1
      }

      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }

    return { positions, randoms, sizes, colors }
  }, [])

  const starData = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      const r = 100 + Math.random() * 100 // Distance 100-200
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      
      sizes[i] = 0.5 + Math.random() * 2.0
      speeds[i] = 0.2 + Math.random() * 0.8
    }
    
    return { positions, sizes, speeds }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let animationFrameId: number
    
    const animate = () => {
        if (isExiting) return // Stop updating animation loop when exiting

        const now = Date.now()
        const elapsed = (now - globalStartTime) / 1000
        
        // Calculate loading progress (0-100) based on 11s duration
        setLoadingProgress(Math.min(100, Math.floor((elapsed / 11.0) * 100)))

        // Timeline:
        // 0-4s: Galaxy Spin
        // 4-6s: Explosion
        // 6-9s: Drift
        // 9-11s: Collapse
        // 11s+: End

        if (elapsed < 4.0) {
            setPhase(0)
            setText("SEQ_01: NUCLEOSYNTHESIS")
        } 
        else if (elapsed < 9.0) {
            if (elapsed < 6.0) {
                 setPhase(1)
                 setText("SEQ_02: EXPANSION_EVENT")
                 setExplosionProgress((elapsed - 4.0) / 2.0) 
            } else {
                 setPhase(2)
                 setText("SEQ_03: MATTER_DRIFT")
                 setExplosionProgress(1)
            }
        }
        else if (elapsed < 11.0) {
            setPhase(3)
            setText("SEQ_04: SYSTEM_INITIALIZATION")
            setCollapseProgress((elapsed - 9.0) / 2.0)
        } 
        else {
            setText("SYSTEM_READY")
            setPhase(4)
        }

        animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    const handleKeyPress = () => {
      if (phase >= 3 && !isExiting) {
        setIsExiting(true)
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [mounted, phase, onComplete, isExiting])

  if (!mounted) {
    return null
  }

  // Styles based on phase
  const isBootPhase = phase >= 3
  
  // Independent Overlay UI - HUD Style
  const overlayUI = (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2147483648, 
        // Exit animation
        opacity: isExiting ? 0 : 1,
        filter: isExiting ? 'blur(20px)' : 'none',
        transform: isExiting ? 'scale(1.1)' : 'scale(1)',
        transition: 'opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease'
    }}>
        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-white/20 rounded-tl-3xl opacity-50" />
        <div className="absolute top-8 right-8 w-32 h-32 border-r-2 border-t-2 border-white/20 rounded-tr-3xl opacity-50" />
        <div className="absolute bottom-8 left-8 w-32 h-32 border-l-2 border-b-2 border-white/20 rounded-bl-3xl opacity-50" />
        <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-white/20 rounded-br-3xl opacity-50" />

        {/* Phase Indicator (Bottom Left) */}
        <div style={{
            position: 'absolute',
            bottom: '4rem',
            left: '4rem',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '0.8rem',
            color: isBootPhase ? '#00fff7' : 'rgba(255, 255, 255, 0.7)',
            textShadow: isBootPhase ? '0 0 10px #00fff7' : 'none'
        }}>
            <div className="text-xs opacity-50 mb-2">CURRENT_PROCESS</div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-current animate-pulse" />
                {text}
            </div>
        </div>

        {/* System Log (Bottom Right) */}
        <div style={{
            position: 'absolute',
            bottom: '4rem',
            right: '4rem',
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'right'
        }}>
            <div className="text-xs opacity-50 mb-2">MEMORY_DUMP</div>
            {systemLog.map((log, i) => (
                <div key={i} style={{ opacity: (i + 1) / 5 }}>
                    {log} :: OK
                </div>
            ))}
        </div>

        {/* Center Loading Bar */}
        <div style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '400px',
            maxWidth: '80vw',
            textAlign: 'center'
        }}>
             {/* Progress Bar Container */}
             <div className="w-full h-1 bg-white/10 mb-2 relative overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"
                    style={{ width: `${loadingProgress}%`, transition: 'width 0.1s linear' }}
                />
             </div>
             
             {/* Text Below Bar */}
             <div 
                className="flex justify-between text-xs font-mono tracking-widest"
                style={{ color: isBootPhase ? '#00fff7' : 'rgba(255, 255, 255, 0.6)' }}
             >
                <span>{loadingProgress.toString().padStart(3, '0')}%</span>
                <span className={isBootPhase ? "animate-pulse" : ""}>
                    {phase < 4 ? "LOADING_ASSETS" : "PRESS_ANY_KEY"}
                </span>
             </div>
        </div>

        {/* Center Prompt (Only when ready) */}
        {phase >= 4 && (
             <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
             }}>
                 <div 
                    className="font-pixel text-sm tracking-widest px-12 py-6 transition-all duration-300"
                    style={{
                        color: '#00fff7',
                        background: 'rgba(5, 10, 20, 0.75)', // Deeper, more opaque background
                        backdropFilter: 'blur(12px)',        // Stronger blur
                        WebkitBackdropFilter: 'blur(12px)',  // Safari support
                        border: '1px solid rgba(0, 255, 247, 0.4)',
                        boxShadow: '0 0 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 255, 247, 0.2), inset 0 0 20px rgba(0, 255, 247, 0.05)', // Multi-layer shadow/glow
                        textShadow: '0 0 8px rgba(0, 255, 247, 0.8)',
                        borderRadius: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        minWidth: '400px', // Ensure it has a good width presence
                        justifyContent: 'center'
                    }}
                 >
                     <span className="animate-pulse text-xs opacity-70">▶</span>
                     <span className="animate-pulse">[ SYSTEM_READY :: AWAITING_INPUT ]</span>
                     <span className="animate-pulse text-xs opacity-70">◀</span>
                 </div>
             </div>
        )}
    </div>
  )
  
  const renderHalf = (side: 'left' | 'right') => (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: side === 'left' ? 0 : '50%',
        width: '50vw',
        height: '100vh',
        zIndex: 2147483647,
        overflow: 'hidden',
        transform: isExiting 
            ? `translateX(${side === 'left' ? '-100%' : '100%'})` 
            : 'translateX(0)',
        transition: 'transform 1s cubic-bezier(0.86, 0, 0.07, 1)'
      }}
    >
        <div style={{
            position: 'absolute',
            top: 0,
            left: side === 'left' ? 0 : '-50vw', // Keep original offset logic
            width: '100vw',
            height: '100vh',
            background: isBootPhase ? '#000000' : 'radial-gradient(circle at center, #0a0014 0%, #000000 100%)',
            transition: 'background 1s ease'
        }}>
            <Canvas
            camera={{ position: [0, 0, 8], fov: 75 }}
            gl={{ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance"
            }}
            >
            <color attach="background" args={['#000000']} />
            <StarField data={starData} globalStartTime={globalStartTime} />
            
            <ParticleSystem 
                phase={phase} 
                explosionProgress={explosionProgress} 
                collapseProgress={collapseProgress}
                data={particleData}
                globalStartTime={globalStartTime}
            />
            <CameraController phase={phase} mouseRef={mouseRef} />
            <EffectComposer>
                <Bloom 
                intensity={phase === 0 ? 2.0 : (phase === 1 ? 3.0 : 1.5)} 
                luminanceThreshold={0.1} 
                luminanceSmoothing={0.9}
                />
                <Noise opacity={0.05} />
                <Vignette offset={0.3} darkness={0.7} />
            </EffectComposer>
            </Canvas>
        </div>
    </div>
  )

  return createPortal(
    <>
        {/* Black background layer to prevent any light leakage through gaps */}
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#000000',
            zIndex: 2147483646 // Just below the split panels
        }} />
        {renderHalf('left')}
        {renderHalf('right')}
        {overlayUI}
    </>,
    document.body
  )
}
