import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

interface NewsItem {
  title: string
  summary: string
  source: string
  url?: string
}

export async function POST(request: NextRequest) {
  try {
    const { news } = await request.json()

    if (!news || !Array.isArray(news)) {
      return NextResponse.json(
        { error: 'Datos de noticias inválidos' },
        { status: 400 }
      )
    }

    // Preparar datos para Excel
    const excelData = news.map((item: NewsItem, index: number) => ({
      '#': index + 1,
      'Título': item.title,
      'Resumen': item.summary,
      'Fuente': item.source,
      'URL': item.url || 'N/A'
    }))

    // Crear libro de trabajo
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Ajustar ancho de columnas
    const columnWidths = [
      { wch: 5 },   // #
      { wch: 60 },  // Título
      { wch: 80 },  // Resumen
      { wch: 25 },  // Fuente
      { wch: 40 }   // URL
    ]
    worksheet['!cols'] = columnWidths

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Noticias IA Deportes')

    // Generar buffer del archivo Excel
    const excelBuffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx'
    })

    // Retornar archivo Excel
    return new NextResponse(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="noticias_ia_deportes_${new Date().toISOString().split('T')[0]}.xlsx"`
      }
    })
  } catch (error) {
    console.error('Error al exportar:', error)
    return NextResponse.json(
      { error: 'Error al generar archivo Excel' },
      { status: 500 }
    )
  }
}
