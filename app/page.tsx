// KEIN 'use client' hier! Das ist eine Server-Seite.

import { createClient } from '@supabase/supabase-js';

// HIER erstellst du den Client für den SERVER.
// Er liest die .env.local-Variablen direkt.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // Das '!' sagt TypeScript: "Keine Sorge, die Variable ist da"
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function HomePage() {
  // HIER benutzt du den Client, um Daten zu laden
  const { data: rides, error } = await supabase
    .from('rides')
    .select('*');

  // ... dein JSX zum Anzeigen der Fahrten ...
  return (
    <div>
      <h1>Alle Surftrips</h1>
      {rides?.map((ride) => ( // Das '?' prüft, ob rides existiert
        <div key={ride.id}>
          <h2>Von {ride.start_location} nach {ride.end_location}</h2>
          {/* ... mehr Details ... */}
        </div>
      ))}
    </div>
  );
}