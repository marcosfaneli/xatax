export default function Api() {

  const URL = 'http://localhost:3001';

  const getTopPlayers = async () => {
    const response = await fetch(`${URL}/top-players`,
      {
        method: 'GET',
        headers: {
          'x-game-name': 'xatax'
        },
      });
    const data = await response.json();
    return data;
  }

  const recordScore = async (user, score) => {
    const response = await fetch(`${URL}/record-score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-game-name': 'xatax'
      },
      body: JSON.stringify({ user, score })
    });
    return await response.json();
  }

  return {
    getTopPlayers,
    recordScore
  }
}