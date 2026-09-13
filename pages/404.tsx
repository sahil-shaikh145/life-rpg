import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rpg-darker via-rpg-dark to-rpg-darker flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-display font-bold text-rpg-gold mb-4">404</h1>
        <p className="text-2xl text-slate-300 mb-2">Quest Not Found</p>
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist in this realm.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-8 py-3 bg-gradient-to-r from-rpg-gold to-yellow-500 text-slate-900 font-bold rounded-lg transition hover:shadow-lg hover:shadow-rpg-gold/30"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
