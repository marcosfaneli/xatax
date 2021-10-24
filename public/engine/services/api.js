export default function Api() {

  const getTopPlayers = async () => {
    return [
      { name: 'John', score: 100 },
      { name: 'Jane', score: 200 },
      { name: 'Jack', score: 300 },
      { name: 'Jill', score: 400 },
      { name: 'Joe', score: 500 },
      { name: 'Juan', score: 600 },
      { name: 'Jenny', score: 700 },
      { name: 'Juan', score: 800 },
      { name: 'Jenny', score: 900 },
      { name: 'Juan', score: 1000 },
    ];
  }

  return {
    getTopPlayers
  }
}