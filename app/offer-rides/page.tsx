// WICHTIG: Füge 'use client' hinzu, wenn du Formulare
// oder Interaktivität (wie onClick) planst.
// 'use client';

// Jede Seite MUSS eine Komponente als 'default' exportieren
export default function OfferRidePage() {
  return (
    <div>
      <h1>Hier bietest du eine Fahrt an</h1>
      {/* Hier kommt dein Formular hin */}
    </div>
  );
}

// Funktion, die beim Klick auf "Speichern" aufgerufen wird
async function handleSave(formData) {
  'use server'; // Wichtig in Next.js 13+ für Formular-Aktionen

  // 1. Finde heraus, wer der eingeloggte Nutzer ist
  // (Dafür gibt es Helfer von @supabase/auth-helpers-nextjs)
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Speichere die Daten in der DB
  const { error } = await supabase.from('rides').insert({
    start_location: formData.get('start'), // 'start' ist der name="..." im Input
    end_location: formData.get('ziel'),
    departure_time: formData.get('datum'),
    free_seats: formData.get('seats'),
    surfboard_space: formData.get('boards'),
    driver_id: user.id // Verknüpfe die Fahrt mit dem eingeloggten Nutzer
  });

  if (error) {
    console.error('Fehler:', error);
  } else {
    // Erfolgreich! Leite Nutzer zur Startseite
    // redirect('/');
  }
}