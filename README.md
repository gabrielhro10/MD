# Convertidor y Visor Markdown

Convierte PDF (con texto o escaneados, con OCR en español), Word, HTML, texto e imágenes a Markdown, y lo muestra en una vista previa. Se procesa en el dispositivo; no se sube nada a ningún servidor.

## Instalar como app (PWA)

| Dispositivo | Cómo |
|---|---|
| iPad / iPhone (Safari) | **Compartir → Añadir a pantalla de inicio** |
| Mac (Safari 17+) | **Archivo → Añadir al Dock** |
| Android, Chrome, Edge | botón **Instalar** en *Acerca de* (toca el logo) |

## Librerías

Cargadas desde CDN con versión fija:

| Librería | Uso | Licencia |
|---|---|---|
| [PDF.js](https://github.com/mozilla/pdf.js) | Lectura de PDF | [Apache 2.0](https://github.com/mozilla/pdf.js/blob/master/LICENSE) |
| [Tesseract.js](https://github.com/naptha/tesseract.js) y [tessdata](https://github.com/tesseract-ocr/tessdata) | OCR en español | [Apache 2.0](https://github.com/naptha/tesseract.js/blob/master/LICENSE.md) |
| [Mammoth.js](https://github.com/mwilliamson/mammoth.js) | Word (.docx) | [BSD-2-Clause](https://github.com/mwilliamson/mammoth.js/blob/master/LICENSE) |
| [Turndown](https://github.com/mixmark-io/turndown) | HTML a Markdown | [MIT](https://github.com/mixmark-io/turndown/blob/master/LICENSE) |
| [Marked](https://github.com/markedjs/marked) | Vista previa | [MIT](https://github.com/markedjs/marked/blob/master/LICENSE.md) |

## Licencia

El código propio se distribuye bajo la licencia MPL-2.0; ver [LICENSE](LICENSE). Las librerías de terceros conservan sus licencias.
