/**
 * Función para generar texto desde OpenAI
 * @param {string} prompt - Lo que el usuario escribe
 * @param {number} maxTokens - Opcional, número máximo de tokens
 * @returns {Promise<string>} - Texto generado o mensaje de error
 */
export async function generarTexto(prompt, maxTokens = 150) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Eres un asistente útil.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMsg = errorData?.error?.message || response.statusText;
      return `Error al generar respuesta: ${errorMsg}`;
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    return 'No se pudo conectar con la API de OpenAI. Intenta de nuevo más tarde.';
  }
}