import { NextRequest, NextResponse } from 'next/server'

interface NewsItem {
  title: string
  summary: string
  source: string
  url?: string
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json(
        { error: 'Query es requerido' },
        { status: 400 }
      )
    }

    // Simulamos búsqueda de noticias relacionadas con IA en deportes
    // En producción, esto podría usar APIs como NewsAPI, Google News, etc.
    const mockNews: NewsItem[] = [
      {
        title: 'La IA revoluciona el análisis táctico en el fútbol profesional',
        summary: 'Los equipos de fútbol de élite están utilizando inteligencia artificial para analizar partidos en tiempo real, identificar patrones de juego y optimizar estrategias. Esta tecnología permite procesar miles de datos por segundo para tomar mejores decisiones tácticas.',
        source: 'SportsTech News',
        url: 'https://example.com/news1'
      },
      {
        title: 'Sistemas de IA predicen lesiones deportivas con 85% de precisión',
        summary: 'Un nuevo sistema de inteligencia artificial desarrollado por científicos del deporte puede predecir lesiones antes de que ocurran mediante el análisis de biomecánica, carga de entrenamiento y datos fisiológicos de los atletas.',
        source: 'Tech in Sports',
        url: 'https://example.com/news2'
      },
      {
        title: 'Asistentes virtuales con IA personalizan entrenamientos olímpicos',
        summary: 'Atletas olímpicos ahora cuentan con asistentes personales impulsados por IA que adaptan rutinas de entrenamiento en tiempo real según el rendimiento, recuperación y objetivos específicos de cada deportista.',
        source: 'Olympic Tech Review',
        url: 'https://example.com/news3'
      },
      {
        title: 'IA en arbitraje: tecnología VAR mejorada reduce errores en un 40%',
        summary: 'La nueva generación de sistemas VAR incorpora inteligencia artificial para detectar infracciones con mayor precisión, analizar fueras de juego automáticamente y asistir a los árbitros en decisiones complejas durante los partidos.',
        source: 'Referee Tech Today',
        url: 'https://example.com/news4'
      },
      {
        title: 'Chatbots deportivos con IA ofrecen coaching personalizado 24/7',
        summary: 'Aplicaciones móviles equipadas con inteligencia artificial conversacional permiten a deportistas amateur recibir consejos de entrenamiento, nutrición y motivación personalizados en cualquier momento del día.',
        source: 'Fitness AI Magazine',
        url: 'https://example.com/news5'
      },
      {
        title: 'Análisis de rendimiento con IA transforma el baloncesto profesional',
        summary: 'Equipos de NBA implementan sistemas de visión por computadora e IA para analizar cada movimiento en la cancha, optimizar selección de tiros y mejorar estrategias defensivas basadas en datos históricos.',
        source: 'Basketball Analytics',
        url: 'https://example.com/news6'
      },
      {
        title: 'IA detecta talentos deportivos juveniles mediante análisis predictivo',
        summary: 'Scouts profesionales utilizan algoritmos de machine learning para identificar jóvenes promesas en el deporte, analizando habilidades técnicas, físicas y mentales con mayor objetividad que métodos tradicionales.',
        source: 'Youth Sports Tech',
        url: 'https://example.com/news7'
      },
      {
        title: 'Realidad virtual con IA mejora rehabilitación de atletas lesionados',
        summary: 'Plataformas de rehabilitación combinan realidad virtual e inteligencia artificial para crear programas de recuperación personalizados que aceleran el retorno de atletas lesionados a la competición.',
        source: 'Sports Medicine AI',
        url: 'https://example.com/news8'
      }
    ]

    // Filtrar noticias basadas en la query (búsqueda simple)
    const filteredNews = mockNews.filter(news =>
      news.title.toLowerCase().includes(query.toLowerCase()) ||
      news.summary.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().split(' ').some((term: string) =>
        news.title.toLowerCase().includes(term) ||
        news.summary.toLowerCase().includes(term)
      )
    )

    const results = filteredNews.length > 0 ? filteredNews : mockNews

    return NextResponse.json({
      news: results,
      count: results.length
    })
  } catch (error) {
    console.error('Error en búsqueda:', error)
    return NextResponse.json(
      { error: 'Error al procesar la búsqueda' },
      { status: 500 }
    )
  }
}
