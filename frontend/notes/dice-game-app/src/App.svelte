<script lang="ts">
    import Dice from './components/Dice.svelte';
    import { writable } from 'svelte/store';

    let showGame = false;
    let gameId: number | null = null;
    const hoverStart = writable(false);

    const containerStyleObj = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
    };

    const titleStyleObj = {
        fontSize: '2.5rem',   // 폰트 키우기
        fontWeight: 'bold',
        margin: '0',          // 기본 마진 제거
    };

    $: startBtnStyleObj = {
        padding: '12px 24px',
        fontSize: '18px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: $hoverStart ? '#1565c0' : '#1976d2',
        color: 'white',
        transition: 'background-color 0.3s ease',
    };

    function styleObjectToString(styleObj: Record<string, string>): string {
        return Object.entries(styleObj)
            .map(([key, value]) => {
                const kebabKey = key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
                return `${kebabKey}: ${value}`;
            })
            .join('; ');
    }

    async function startGame() {
        try {
            const userToken = localStorage.getItem('userToken');
            if (!userToken) {
                alert('로그인이 필요합니다.');
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/game/start`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`서버 오류: ${response.status}`);
            }

            gameId = await response.json();
            showGame = true;
        } catch (error) {
            console.error('게임 시작 중 오류 발생:', error);
            alert('게임 시작에 실패했습니다.');
        }
    }

    function goHome() {
        showGame = false;
        gameId = null;
    }
</script>

{#if showGame && gameId}
    <Dice {gameId} />
{:else}
    <main style={styleObjectToString(containerStyleObj)}>
        <h1 style={styleObjectToString(titleStyleObj)}>
            🎲 주사위 게임에 오신 것을 환영합니다
        </h1>
        <button
                style={styleObjectToString(startBtnStyleObj)}
                on:click={startGame}
                on:mouseover={() => hoverStart.set(true)}
                on:mouseleave={() => hoverStart.set(false)}
        >
            게임 시작
        </button>
    </main>
{/if}
