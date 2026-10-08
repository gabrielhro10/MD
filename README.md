# Convertidor y Visor Markdown

Página web estática que convierte documentos a Markdown (`.md`) directamente en el navegador.

- **PDF** con texto seleccionable, y **PDF escaneado** mediante OCR en español.
- **Word** (`.docx`), **HTML**, **texto** (`.txt`, `.md`) e **imágenes** (`.png`, `.jpg`, `.jpeg`, `.webp`) con OCR.
- Quita encabezados y pies de página repetidos, reconstruye párrafos, títulos, citas y tablas sencillas.
- Vista previa del Markdown, copiar al portapapeles y descargar `.md`.

Los archivos se procesan localmente en el navegador; no se envían a ningún servidor.

## Uso

Necesita conexión a internet: las librerías se cargan desde CDN, y el OCR descarga el modelo de idioma español la primera vez.

## Créditos

Este proyecto usa las siguientes librerías de código abierto, cargadas desde CDN:

| Librería | Uso | Licencia |
|---|---|---|
| [PDF.js](https://github.com/mozilla/pdf.js) (Mozilla) | Lectura y renderizado de PDF | [Apache 2.0](https://github.com/mozilla/pdf.js/blob/master/LICENSE) |
| [Tesseract.js](https://github.com/naptha/tesseract.js) | OCR | [Apache 2.0](https://github.com/naptha/tesseract.js/blob/master/LICENSE.md) |
| [Tesseract tessdata](https://github.com/tesseract-ocr/tessdata) | Modelo de idioma español | [Apache 2.0](https://github.com/tesseract-ocr/tessdata/blob/main/LICENSE) |
| [Mammoth.js](https://github.com/mwilliamson/mammoth.js) | Conversión de Word (.docx) | [BSD-2-Clause](https://github.com/mwilliamson/mammoth.js/blob/master/LICENSE) |
| [Turndown](https://github.com/mixmark-io/turndown) | Conversión de HTML a Markdown | [MIT](https://github.com/mixmark-io/turndown/blob/master/LICENSE) |
| [Marked](https://github.com/markedjs/marked) | Vista previa del Markdown | [MIT](https://github.com/markedjs/marked/blob/master/LICENSE.md) |

## Licencia

El código propio de este proyecto se distribuye bajo la licencia MIT; ver [LICENSE](LICENSE).
