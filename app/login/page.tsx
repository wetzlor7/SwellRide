// WICHTIG: Diese Zeile muss ganz oben stehen!
// Sie sagt Next.js, dass dies eine interaktive Seite ist,
// die im Browser des Nutzers läuft (nicht auf dem Server).
'use client';

// 1. Importiere die nötigen Bausteine
import { createClientComponentClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'; // Das ist das Standard-Design
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Das ist deine Login-Seiten-Komponente
export default function LoginPage() {
  // 2. Erstelle einen Supabase-Client speziell für Client-Komponenten
  const supabase = createClientComponentClient();
  const router = useRouter();

  // 3. (Optional, aber empfohlen)
  // Ein kleiner Helfer, der prüft, ob sich der Login-Status ändert.
  // Wenn der Nutzer sich einloggt, wird er zur Startseite geschickt.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/'); // Zur Startseite weiterleiten
        router.refresh(); // Stellt sicher, dass die Seite die neuen Daten (z.B. "Logout-Button") lädt
      }
    });

    // Aufräumen, wenn die Seite verlassen wird
    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase, router]);

  // 4. Das ist der eigentliche "Block", den du gesucht hast!
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h1>Login / Registrierung</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }} // Nutzt das schöne Supabase-Standard-Theme
        providers={['google']} // Hier kannst du einfach 'google', 'github' etc. hinzufügen
        localization={{
            variables: { // Hier kannst du Texte eindeutschen
              sign_in: { email_label: 'Deine E-Mail', password_label: 'Dein Passwort', button_label: 'Einloggen' },
              sign_up: { button_label: 'Registrieren' },
            },
        }}
      />
    </div>
  );
}