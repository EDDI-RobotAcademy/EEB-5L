<script lang="ts">
    import Dice from './components/Dice.svelte';

    let showGame = false;
    let gameId: number | null = null;

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
            console.log('게임 ID:', gameId);

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
    <main style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
        <h1>🎲 주사위 게임에 오신 것을 환영합니다</h1>
        <button on:click={startGame} style="padding: 12px 24px; font-size: 18px; cursor: pointer;">게임 시작</button>
    </main>
{/if}
