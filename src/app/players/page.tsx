import Link from 'next/link';

async function getPlayers() {
  const res = await fetch('http://localhost:3000/api/players', { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    throw new Error('プレイヤーデータの取得に失敗しました');
  }
  
  return res.json();
}

export default async function PlayersPage() {
  const players = await getPlayers();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">プレイヤー一覧</h1>
        <Link 
          href="/players/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          新規プレイヤー登録
        </Link>
      </div>
      
      {players.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-md text-center">
          <p className="text-lg text-yellow-800">登録されているプレイヤーはまだいません</p>
          <Link 
            href="/players/new" 
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            最初のプレイヤーを登録する
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left border-b">名前</th>
                <th className="py-3 px-4 text-left border-b">メールアドレス</th>
                <th className="py-3 px-4 text-left border-b">電話番号</th>
                <th className="py-3 px-4 text-left border-b">スキルレベル</th>
                <th className="py-3 px-4 text-left border-b">ステータス</th>
                <th className="py-3 px-4 text-right border-b">アクション</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player: any) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{player.name}</td>
                  <td className="py-3 px-4 border-b">{player.email}</td>
                  <td className="py-3 px-4 border-b">{player.phone || '-'}</td>
                  <td className="py-3 px-4 border-b">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      player.skillLevel === 'BEGINNER' ? 'bg-green-100 text-green-800' :
                      player.skillLevel === 'INTERMEDIATE' ? 'bg-blue-100 text-blue-800' :
                      player.skillLevel === 'ADVANCED' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {player.skillLevel === 'BEGINNER' ? '初級' :
                      player.skillLevel === 'INTERMEDIATE' ? '中級' :
                      player.skillLevel === 'ADVANCED' ? '上級' : 'エキスパート'}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      player.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {player.isActive ? '活動中' : '非活動中'}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b text-right">
                    <Link 
                      href={`/players/${player.id}`}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      詳細
                    </Link>
                    <Link 
                      href={`/players/${player.id}/edit`}
                      className="text-green-600 hover:underline"
                    >
                      編集
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 