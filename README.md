# Convertidor y Visor Markdown

Página web estática que convierte documentos a Markdown (`.md`) directamente en el navegador.

- **PDF** con texto seleccionable, y **PDF escaneado** mediante OCR en español.
- **Word** (`.docx`), **HTML**, **texto** (`.txt`, `.md`) e **imágenes** (`.png`, `.jpg`, `.jpeg`, `.webp`) con OCR.
- Quita encabezados y pies de página repetidos, reconstruye párrafos, títulos, citas y tablas sencillas.
- Vista previa del Markdown, copiar al portapapeles y descargar `.md`.

Los archivos se procesan localmente en el navegador; no se envían a ningún servidor.

## Uso

<<<<<<< HEAD
Abre la página publicada en <https://gabrielhro10.github.io/MD/>, o sirve esta carpeta con GitHub Pages (**Settings → Pages → Deploy from a branch → `main` / root**).

Para probarla en local hace falta un servidor (el service worker no funciona abriendo `index.html` como archivo), por ejemplo `python -m http.server` y abrir <http://localhost:8000>.

En pantallas anchas (iPad horizontal, escritorio) el Markdown y su vista previa se ven lado a lado; en pantallas estrechas se alterna entre **Código** y **Vista previa**. El botón **Compartir** abre la hoja del sistema para guardar el `.md` en Archivos u otra app.

## Instalar como app (PWA)

| Dispositivo | Cómo |
|---|---|
| iPad / iPhone (Safari) | **Compartir → Añadir a pantalla de inicio** |
| Android, Chrome, Edge | botón **Instalar** en *Acerca de* (toca el logo), o el icono de instalar de la barra de direcciones |

Instalada, abre en pantalla completa con su propio icono. En iOS, además, Safari no borra los datos de las apps de la pantalla de inicio por falta de uso.

## Sin conexión

Un service worker ([sw.js](sw.js)) guarda la página y las librerías la primera vez que se usan. Después se puede abrir sin internet y convertir Word, PDF con texto, HTML y texto.

El OCR (imágenes y PDF escaneados) pesa varios MB: necesita haberse usado **una vez con internet** para descargar el motor y el modelo de español; a partir de entonces también funciona sin conexión.

Al publicar cambios en `index.html`, `manifest.webmanifest` o los iconos, sube `SHELL_VERSION` en [sw.js](sw.js). Si cambias la versión de una librería, actualiza también su URL en `LIB_URLS`.

## Icono

El icono (`icons/`) se dibuja en [icons/icon.svg](icons/icon.svg). Los PNG (192, 512, maskable 512 y `apple-touch-icon` de 180) se exportan de ese SVG.
=======
Necesita conexión a internet: las librerías se cargan desde CDN, y el OCR descarga el modelo de idioma español la primera vez.
>>>>>>> fb2a4c29db797db3b24d657cf8f597d65cfb8e73

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
