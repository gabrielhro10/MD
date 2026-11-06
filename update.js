// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
// Actualización manual de la PWA: botón con icono dentro del desplegable de versiones (<details>), como una fila más de
// la lista. Compara la versión publicada (archivo de versión leído de la red) con la instalada: si es otra muestra
// «Actualizando a vX…», deja activo el service worker nuevo y recarga; si ya está al día NO recarga (cortaría conexiones
// abiertas, p. ej. WebRTC) y dice «Al día · vX»; sin red, «Sin conexión».
//
// Requisitos:
//  - `version.js` con `self.APP_VERSION = '1.2.3';` cargado por la página y por sw.js (importScripts). Subir la versión al
//    publicar: es lo que dispara la actualización. Los nombres se cambian con `AppUpdate.init({ versionUrl, versionVar })`.
//  - sw.js con skipWaiting() en install y clients.claim() en activate.
//  - <script src="update.js"></script> antes del JS de la app y `AppUpdate.init()` al arrancar.
//  - HTML, DENTRO del <details> de versiones y encima de la lista (icono «refresh» de Material Symbols en el sprite):
//      <details class="about"><summary>App v1.2.3</summary>
//        <div class="update-row" id="update-row">
//          <span id="update-text" role="status" aria-live="polite">Actualización</span>
//          <button type="button" id="btn-update" aria-label="Buscar actualización" title="Buscar actualización"><svg class="ic" aria-hidden="true"><use href="#i-refresh"/></svg></button>
//        </div>
//        <ul>…versiones…</ul></details>
//  - CSS: la fila copia el estilo de las filas de la lista (texto pequeño, borde superior, espacio entre extremos) y el
//    botón es PLANO (sin fondo, borde ni desenfoque; 44 px de área táctil con margin-right negativo para alinear el icono):
//      .update-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 6px;
//                    border-top: 1px solid var(--line); font-variant-numeric: tabular-nums; }
//      .update-row[data-state="busy"] #update-text, .update-row[data-state="done"] #update-text { color: var(--text); }
//      .update-row button { width: 44px; height: 44px; margin-right: -12px; padding: 0; border-radius: 50%;
//                           background: none; border: 0; box-shadow: none; color: var(--muted); backdrop-filter: none; }
//      .update-row[data-state="busy"] .ic { animation: update-spin 1s linear infinite; }
//      @keyframes update-spin { to { transform: rotate(360deg); } }
//      @media (prefers-reduced-motion: reduce) { .update-row[data-state="busy"] .ic { animation: none; } }
(function () {
    'use strict';
    const CHECK_TIMEOUT_MS = 10000;
    const ACTIVATE_TIMEOUT_MS = 8000;
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // La versión publicada, leída de la red (no de la caché). Lanza si no hay conexión. No se decide con los eventos del
    // service worker (updatefound/controllerchange): en iOS tardan o no llegan y el botón quedaría girando sin decir nada.
    async function publishedVersion(versionUrl, versionVar) {
        if (navigator.onLine === false) throw new Error('sin conexión');
        const response = await Promise.race([
            fetch(`${versionUrl}?t=${Date.now()}`, { cache: 'no-store' }),
            wait(CHECK_TIMEOUT_MS).then(() => { throw new Error('sin respuesta'); }),
        ]);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const match = new RegExp(`${versionVar}\\s*=\\s*['"]([^'"]+)['"]`).exec(await response.text());
        return match ? match[1] : null;
    }

    // Deja activo el service worker nuevo antes de recargar; si no responde a tiempo se recarga igual (el shell va primero por la red).
    async function activateNewWorker() {
        try {
            const registration = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistration() : null;
            if (!registration) return;
            let changed = false;
            navigator.serviceWorker.addEventListener('controllerchange', () => { changed = true; }, { once: true });
            await Promise.race([registration.update(), wait(ACTIVATE_TIMEOUT_MS)]);
            const started = Date.now();
            while (!changed && (registration.installing || registration.waiting) && Date.now() - started < ACTIVATE_TIMEOUT_MS) await wait(100);
        } catch (error) { /* se recarga de todos modos */ }
    }

    window.AppUpdate = {
        /** Recarga la página; sustituible en pruebas. */
        reload: () => location.reload(),

        init({ versionUrl = 'version.js', versionVar = 'APP_VERSION' } = {}) {
            const row = document.getElementById('update-row');
            const button = document.getElementById('btn-update');
            const text = document.getElementById('update-text');
            if (!row || !button || !text) return;
            const label = text.textContent; // lo que dice la fila en reposo
            let busy = false;
            const show = (state, message) => { row.dataset.state = state; text.textContent = message || label; };

            button.addEventListener('click', async () => {
                if (busy) return;
                busy = true;
                button.disabled = true;
                show('busy', 'Buscando…');
                try {
                    const current = self[versionVar];
                    const published = await publishedVersion(versionUrl, versionVar);
                    if (published && current && published !== current) {
                        show('busy', `Actualizando a v${published}…`);
                        await activateNewWorker();
                        window.AppUpdate.reload();
                        return;
                    }
                    show('done', current ? `Al día · v${current}` : 'Al día');
                } catch (error) {
                    show('done', 'Sin conexión');
                }
                busy = false;
                button.disabled = false;
            });
        },
    };
})();
