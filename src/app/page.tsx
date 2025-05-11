import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">テニスチーム管理システム</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <Link
          href="/players"
          className="bg-blue-100 hover:bg-blue-200 p-8 rounded-lg shadow-md transition-colors text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">プレイヤー管理</h2>
          <p>チームのプレイヤー情報を登録・管理します。スキルレベルや連絡先情報も記録できます。</p>
        </Link>
        
        <Link
          href="/teams"
          className="bg-green-100 hover:bg-green-200 p-8 rounded-lg shadow-md transition-colors text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">チーム管理</h2>
          <p>複数のチームを作成・管理できます。プレイヤーをチームに割り当て、キャプテンやコーチを設定できます。</p>
        </Link>
        
        <Link
          href="/matches"
          className="bg-orange-100 hover:bg-orange-200 p-8 rounded-lg shadow-md transition-colors text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">試合管理</h2>
          <p>試合の予定や結果を記録します。対戦相手、スコア、出場プレイヤー、パフォーマンスを管理できます。</p>
        </Link>
      </div>
    </div>
  );
}
