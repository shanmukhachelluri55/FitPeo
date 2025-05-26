import React, { useState, Suspense, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { healthStatus } from '../../data/healthStatus';

// 3D & Three.js imports
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import * as THREE from 'three';

// Component to load and display the 3D OBJ model
function HumanBodyModel({ objPath, mtlPath }) {
    const groupRef = useRef();

    const materials = mtlPath ? useLoader(MTLLoader, mtlPath) : null;
    const object = useLoader(OBJLoader, objPath, (loader) => {
        if (materials) loader.setMaterials(materials);
    });

    useEffect(() => {
        if (object) {
            const box = new THREE.Box3().setFromObject(object);
            const center = new THREE.Vector3();
            box.getCenter(center);
            object.position.sub(center); // Center the model
        }
    }, [object]);

    return (
        <group ref={groupRef} scale={[0.05, 0.0650, 0.05]}> {/* Height increased by 5% */}
            <primitive object={object} />
        </group>
    );
}

const AnatomySection = () => {
    return (
        <Card>
            <Card.Header>
                <h2 className="text-xl font-semibold text-gray-800">Health Overview</h2>
            </Card.Header>

            <Card.Content>
                <div className="relative flex items-center justify-center pt-6">
                    <div className="relative w-full h-[32rem]">
                        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <Suspense fallback={null}>
                                <HumanBodyModel
                                    objPath="/models/human_body.obj"
                                    // mtlPath="/models/human_body.mtl"
                                />
                            </Suspense>
                            <OrbitControls enableZoom enablePan />
                            <Environment preset="city" />
                        </Canvas>

                        {/* Overlay health indicators */}
                        {healthStatus.map((status) => (
                            <HealthIndicator key={status.id} status={status} />
                        ))}
                    </div>
                </div>

                <Legend />
            </Card.Content>
        </Card>
    );
};

const HealthIndicator = ({ status }) => {
    const [showLabel, setShowLabel] = useState(false);

    const toggleLabel = () => setShowLabel((prev) => !prev);

    return (
        <motion.div
            className={`absolute ${getPositionClasses(status.position)}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
                scale: [1, 1.15, 1],
                opacity: 1,
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
            }}
            onClick={toggleLabel}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleLabel();
                }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={showLabel}
            aria-label={`${status.label} status indicator`}
        >
            <div className="relative group">
                <div
                    className={`
                        w-5 h-5 rounded-full cursor-pointer
                        ${getStatusColorClass(status.status)}
                        before:absolute before:inset-0 before:rounded-full
                        before:animate-ping before:bg-current before:opacity-30
                        shadow-lg
                    `}
                    onMouseEnter={() => setShowLabel(true)}
                    onMouseLeave={() => setShowLabel(false)}
                />
                {showLabel && (
                    <div className="absolute left-7 top-1/2 -translate-y-1/2 z-10">
                        <Badge
                            variant={getStatusVariant(status.status)}
                            className="whitespace-nowrap shadow-lg"
                        >
                            {status.label}
                        </Badge>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const Legend = () => (
    <div className="mt-8 grid grid-cols-2 gap-6 px-4">
        {['healthy', 'warning', 'critical', 'treatment'].map((status) => (
            <div
                key={status}
                className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
                <span className={`w-4 h-4 rounded-full ${getStatusColorClass(status)}`} />
                <span className="ml-3 text-sm text-gray-700 font-medium capitalize">
                    {getStatusText(status)}
                </span>
            </div>
        ))}
    </div>
);

// Position helpers: tweak these values for pixel-perfect alignment
const getPositionClasses = (position) => {
    switch (position) {
        case 'heart':
            return 'top-[31%] left-[46%]';
        case 'lungs':
            return 'top-[34%] right-[45%]';
        case 'teeth':
            return 'top-[18%] left-1/2 -translate-x-1/2';
        case 'bone':
            return 'bottom-[35%] right-[43%]';
        case 'stomach': // Digestive System
            return 'top-[48%] left-[47%]';
        case 'brain': // Neurological System
            return 'top-[10%] left-[48%]';
        case 'liver': // Liver Function (right upper abdomen)
            return 'top-[45%] right-[45%]';
        case 'kidneys': // Renal System (lower back sides)
            return 'top-[45%] left-[40%]';
        case 'eyes': // Ophthalmological Health (just above teeth)
            return 'top-[14%] left-1/2 -translate-x-1/2';
        case 'skin': // Dermatological (edge of torso/outer body)
            return 'top-[38%] left-[18%]';
        default:
            return '';
    }
};


const getStatusColorClass = (status) => {
    switch (status) {
        case 'healthy':
            return 'bg-green-400 shadow-green-400/50';
        case 'warning':
            return 'bg-yellow-400 shadow-yellow-400/50';
        case 'critical':
            return 'bg-red-500 shadow-red-500/50';
        case 'treatment':
            return 'bg-blue-500 shadow-blue-500/50';
        default:
            return 'bg-gray-400';
    }
};

const getStatusVariant = (status) => {
    switch (status) {
        case 'healthy':
            return 'success';
        case 'warning':
            return 'warning';
        case 'critical':
            return 'danger';
        case 'treatment':
            return 'default';
        default:
            return 'default';
    }
};

const getStatusText = (status) => {
    switch (status) {
        case 'healthy':
            return 'Optimal Health';
        case 'warning':
            return 'Preventive Care Needed';
        case 'critical':
            return 'Immediate Attention Required';
        case 'treatment':
            return 'Under Medical Care';
        default:
            return 'Status Unknown';
    }
};

export default AnatomySection;
