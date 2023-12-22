export async function GET() {
    const response = await fetch("http://localhost:4000/exercises");
    const ejercicios = await response.json();

    return new Response (JSON.stringify(ejercicios));
}