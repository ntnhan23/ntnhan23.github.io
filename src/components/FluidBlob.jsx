import React, { useRef, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, ContactShadows } from '@react-three/drei';

const Blob = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
        meshRef.current.rotation.x += delta * 0.1;
        meshRef.current.rotation.y += delta * 0.15;
        
        const targetX = state.pointer.y * 0.4;
        const targetY = state.pointer.x * 0.4;
        meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
        {/* Khối cầu siêu mịn (Trả lại kích thước Siêu to khổng lồ) */}
        <Sphere ref={meshRef} args={[1.5, 128, 128]}>
            <MeshDistortMaterial 
                // Cấu hình Diffuse hoàn hảo tuyệt đối: Bắt sáng nhưng KHÔNG PHẢN CHIẾU (Matte)
                color="#ffffff" 
                roughness={1.0} // Đám mây nhám mờ, tán xạ ánh sáng cực mượt
                metalness={0.0} 
                clearcoat={0}   
                
                distort={0.4}   
                speed={2.5}      
            />
        </Sphere>
    </Float>
  );
};

// Bí thuật: Dùng 6 đèn PointLight bao quanh múc độ xa để "Nhuộm màu" Khối cầu
// Việc trộn màu bằng Vật lý Ánh sáng 3D đảm bảo tỷ lệ mượt 100%, KHÔNG BAO GIỜ XUẤT HIỆN CẠNH CHÉO (SEAM/EDGE)
const SeamlessLighting = () => {
    const groupRef = useRef();
    
    // Xoay nguyên cụm đèn để các màu hòa quyện, cuộn trào vào nhau liên tục
    useFrame((state, delta) => {
        if(groupRef.current) {
            groupRef.current.rotation.x += delta * 0.3;
            groupRef.current.rotation.y -= delta * 0.2;
            groupRef.current.rotation.z += delta * 0.4;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Tone màu Đa Sắc Rực Rỡ Holographic - Cực kì nổi bật trên nền Trắng */}
            <pointLight position={[ 4,  0,  0]} color="#ff007a" intensity={90} distance={12} /> {/* Vivid Pink */}
            <pointLight position={[-4,  0,  0]} color="#00e5ff" intensity={80} distance={12} /> {/* Cyan ảo */}
            <pointLight position={[ 0,  4,  0]} color="#f59e0b" intensity={90} distance={12} /> {/* Sunset Orange */}
            <pointLight position={[ 0, -4,  0]} color="#3b82f6" intensity={80} distance={12} /> {/* Royal Blue */}
            <pointLight position={[ 0,  0,  4]} color="#8b5cf6" intensity={90} distance={12} /> {/* Neon Violet */}
            <pointLight position={[ 0,  0, -4]} color="#10b981" intensity={80} distance={12} /> {/* Emerald Green */}
        </group>
    );
};

export default memo(function FluidBlob() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
      <div className="w-[800px] h-[800px] opacity-100 drop-shadow-2xl">
        <Canvas 
          camera={{ position: [0, 0, 7], fov: 45 }} 
          style={{ pointerEvents: "none" }}
          eventSource={typeof window !== 'undefined' ? document.body : undefined}
          eventPrefix="client"
        >
          {/* Giảm ánh sáng môi trường xuống 0.6 để Khối cầu tự phát sáng Holographic hiển thị sắc độ đậm và nét, không bị nền trắng "luộc chín" (wash out) */}
          <ambientLight intensity={0.6} color="#ffffff" />
          
          {/* Hệ thống nhuộm màu Ánh sáng vật lý vô tận */}
          <SeamlessLighting />
          
          {/* Khối Thạch Tối Giản */}
          <Blob />
          
          <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={15} blur={4} far={4} color="#8b5cf6" />
        </Canvas>
      </div>
    </div>
  );
});
