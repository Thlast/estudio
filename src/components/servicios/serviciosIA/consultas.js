
const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const preguntarIA = async (prompt, messages, apiKey) => {

  const messagesSystem = [
    {
      role: "system",
      content: "Eres un asistente muy útil especialista en impuestos de Argentina. Das respuestas concisas y referencias de la fuente para complementar el análisis."
    }
  ]

  if (apiKey) {
    let messagesToSend = []
    if (messages) {
      messagesToSend = [
        ...messages, ...messagesSystem
      ]
    } else {
      messagesToSend = [
        ...messagesSystem
      ]
    }
    console.log(messagesToSend)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [...messagesToSend, {role: "user", content: prompt}],
          stream: false, // esto luego lo pondremos en true
          temperature: 0.0,
          stop: null
        })
      })
      console.log(response)
      const data = await response.json();
      console.log(data, data.choices[0])
      return data.choices[0].message.content;
  }
  else {
    alert("necesitas añadir una apiKey")
  }
}