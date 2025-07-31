<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import * as CANNON from 'cannon-es';

    import Side1 from '../assets/Side_1_Pip.png';
    import Side2 from '../assets/Side_2_Pips.png';
    import Side3 from '../assets/Side_3_Pips.png';
    import Side4 from '../assets/Side_4_Pips.png';
    import Side5 from '../assets/Side_5_Pips.png';
    import Side6 from '../assets/Side_6_Pips.png';

    let container: HTMLDivElement;
    let diceMesh: THREE.Mesh;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;

    let world: CANNON.World;
    let diceBody: CANNON.Body;
    let lastTime: number | undefined;

    let result = 0;
    let stoppedFrameCount = 0;
    let hasSentResult = false;

    export let gameId: number;

    const texturePaths = [Side3, Side4, Side1, Side6, Side2, Side5];

    const faceNormalToValue: { [key: string]: number } = {
        '0,1,0': 1,
        '0,-1,0': 6,
        '1,0,0': 3,
        '-1,0,0': 4,
        '0,0,1': 2,
        '0,0,-1': 5
    };

    const faceNormals = Object.keys(faceNormalToValue).map(key => {
        const [x, y, z] = key.split(',').map(Number);
        return new CANNON.Vec3(x, y, z);
    });

    function styleObjectToString(styleObj: Record<string, string | number>): string {
        return Object.entries(styleObj)
            .map(([key, value]) => {
                const kebabKey = key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
                return `${kebabKey}: ${value}`;
            })
            .join('; ');
    }

    const containerStyle = {
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        background: '#000',
    };

    const buttonStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#fff',
        color: '#000',
        zIndex: 10,
        cursor: 'pointer',
        boxSizing: 'border-box',
    };

    const resultStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '24px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '10px 16px',
        borderRadius: '8px',
        zIndex: 10,
    };

    function getTopFaceIndex(): number {
        const worldUp = new CANNON.Vec3(0, 1, 0);
        let maxDot = -Infinity;
        let topFace: CANNON.Vec3 | null = null;

        for (const normal of faceNormals) {
            const worldNormal = diceBody.quaternion.vmult(normal);
            const dot = worldNormal.dot(worldUp);
            if (dot > maxDot) {
                maxDot = dot;
                topFace = normal;
            }
        }

        if (!topFace) return -1;
        const key = `${topFace.x},${topFace.y},${topFace.z}`;
        return faceNormalToValue[key] ?? -1;
    }

    function isDiceStopped() {
        return (
            diceBody.velocity.length() < 0.1 &&
            diceBody.angularVelocity.length() < 0.1
        );
    }

    function initThree() {
        scene = new THREE.Scene();
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(3, 4, 5);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        container.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();
        const materials = texturePaths.map(path =>
            new THREE.MeshStandardMaterial({ map: loader.load(path) })
        );

        diceMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);
        scene.add(diceMesh);

        scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1));

        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({ color: 0xdddddd })
        );
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);
    }

    function initPhysics() {
        world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });

        const groundBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane()
        });
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        world.addBody(groundBody);

        diceBody = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
            position: new CANNON.Vec3(0, 5, 0),
        });
        world.addBody(diceBody);
    }

    function rollDice() {
        result = 0;
        stoppedFrameCount = 0;
        hasSentResult = false;

        diceBody.velocity.set(0, 0, 0);
        diceBody.angularVelocity.set(0, 0, 0);
        diceBody.position.set(0, 5, 0);
        diceBody.quaternion.set(0, 0, 0, 1);

        const minSpin = 5;
        diceBody.angularVelocity.set(
            (Math.random() - 0.5) * 20 + Math.sign(Math.random() - 0.5) * minSpin,
            (Math.random() - 0.5) * 20 + Math.sign(Math.random() - 0.5) * minSpin,
            (Math.random() - 0.5) * 20 + Math.sign(Math.random() - 0.5) * minSpin
        );
    }

    async function sendResultToServer(result: number) {
        const userToken = localStorage.getItem('userToken');
        if (!userToken || !gameId) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/dice/save-roll-result`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gameId, number: result })
            });

            const ok = await response.json();
            if (ok) console.log('✅ 주사위 결과 전송 성공');
            else console.warn('⚠ 주사위 결과 저장 실패');
        } catch (error) {
            console.error('전송 실패:', error);
        }
    }

    function animate(time: number) {
        requestAnimationFrame(animate);
        const dt = lastTime ? (time - lastTime) / 1000 : 0;
        lastTime = time;

        world.step(1 / 60, dt);
        diceMesh.position.copy(diceBody.position as any);
        diceMesh.quaternion.copy(diceBody.quaternion as any);

        if (isDiceStopped()) {
            stoppedFrameCount++;
            if (stoppedFrameCount >= 15 && result === 0) {
                result = getTopFaceIndex();
                if (!hasSentResult) {
                    sendResultToServer(result);
                    hasSentResult = true;
                }
            }
        } else {
            stoppedFrameCount = 0;
        }

        renderer.render(scene, camera);
    }

    function onResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
    }

    onMount(() => {
        initThree();
        initPhysics();
        rollDice();
        animate(0);

        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
            renderer.dispose();
        };
    });
</script>

<div bind:this={container} style={styleObjectToString(containerStyle)}>
    <button on:click={rollDice} style={styleObjectToString(buttonStyle)}>🎲 주사위 굴리기</button>
    {#if result > 0}
        <div style={styleObjectToString(resultStyle)}>결과: {result}</div>
    {/if}
</div>
