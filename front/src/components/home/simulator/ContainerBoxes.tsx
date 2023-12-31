import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { ContainerBoxesProps } from "types/simulator";

const ContainerBoxes = ({ count, containers }: ContainerBoxesProps) => {
	const tempBoxes = new THREE.Object3D();
	const meshRef = useRef<THREE.InstancedMesh | null>(null);
	const outline = useLoader(
		THREE.TextureLoader,
		process.env.PUBLIC_URL + "/outline-box.png"
	);

	useFrame(() => {
		if (meshRef.current) {
			containers.current.forEach((container, i) => {
				tempBoxes.position.copy(container.position);
				tempBoxes.updateMatrix();
				meshRef.current?.setMatrixAt(i, tempBoxes.matrix);
			});
			meshRef.current.instanceMatrix.needsUpdate = true;
		}
	});

	return (
		<instancedMesh
			ref={meshRef}
			args={[undefined, undefined, count]}
			castShadow
			receiveShadow
		>
			<boxGeometry attach="geometry" args={[2, 1, 1]} />
			<meshStandardMaterial attach="material" color="#f2f2f2" map={outline} />
		</instancedMesh>
	);
};

export default ContainerBoxes;
