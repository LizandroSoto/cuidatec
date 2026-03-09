document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const pantallaInicio = $("pantalla-inicio");
  const panelEmergencia = $("panel-emergencia");
  const panelCredencial = $("panel-credencial");
  const panelGuias = $("panel-guias");
  const panelDirectorio = $("panel-directorio");
  const panelMapa = $("panel-mapa");
  const panelChat = $("panel-chat");
  const panelNosotros = $("panel-nosotros");
  const panelLogin = $("panel-login");
  const panelRegistroCuenta = $("panel-registro");

  const guiaDesmayo = $("guia-desmayo");
  const guiaConvulsion = $("guia-convulsion");
  const guiaHerida = $("guia-herida");
  const guiaAtragantamiento = $("guia-atragantamiento");

  const todosLosPaneles = [
    pantallaInicio,
    panelEmergencia,
    panelCredencial,
    panelGuias,
    panelDirectorio,
    panelMapa,
    panelChat,
    panelNosotros,
    panelLogin,
    panelRegistroCuenta,
  ];

  const botonSOS = $("boton-sos");
  const abrirCredencial = $("abrir-credencial");
  const volverInicio = $("volver-inicio");

  const input = $("credencial-input");
  const btnBuscar = $("buscar-credencial");
  const btnLimpiar = $("limpiar-credencial");
  const chkPrivacidad = $("confirmo-privacidad");
  const estado = $("estado-credencial");
  const resultado = $("resultado-credencial");

  const modal = $("modal-registro");
  const btnVerRegistro = $("ver-registro");
  const btnCerrarRegistro = $("cerrar-registro");
  const btnBorrarRegistro = $("borrar-registro");
  const listaRegistro = $("lista-registro");

  const btnCuenta = $("btn-cuenta");
  const menuCuenta = $("menu-cuenta");

  // Toast (notificaciones)
  const toast = $("toast");
  const toastTitle = $("toast-title");
  const toastMessage = $("toast-message");
  const toastClose = $("toast-close");
  let toastTimer = null;
  const showToast = ({ title, message, ms = 3200 } = {}) => {
    if (!toast || !toastTitle || !toastMessage) return;
    toastTitle.textContent = title || "Aviso";
    toastMessage.textContent = message || "";
    toast.classList.remove("hidden");
    toast.style.display = "block";
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add("hidden");
      toast.style.display = "none";
    }, ms);
  };
  toastClose?.addEventListener("click", () => {
    if (!toast) return;
    toast.classList.add("hidden");
    toast.style.display = "none";
    if (toastTimer) clearTimeout(toastTimer);
  });

  // Menú de cuenta (elige login o registro)
  btnCuenta?.addEventListener("click", (e) => {
    e.stopPropagation?.();
    if (!menuCuenta) return;
    menuCuenta.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!menuCuenta || !btnCuenta) return;
    const target = e.target;
    if (menuCuenta.contains(target) || btnCuenta.contains(target)) return;
    menuCuenta.classList.add("hidden");
  });

  // CEREBRO MÉDICO (JSON externo)
  let cerebroMedico = null;
  const loadCerebroMedico = async () => {
    if (cerebroMedico) return cerebroMedico;
    try {
      const res = await fetch("./cerebro_medico.json");
      if (!res.ok) throw new Error("No se pudo cargar cerebro_medico.json");
      cerebroMedico = await res.json();
    } catch (e) {
      console.error("Error cargando cerebro_medico.json:", e);
      cerebroMedico = null;
    }
    return cerebroMedico;
  };

  // --- Navegación de paneles ---
  const show = (el) => {
    el.classList.remove("hidden");
    el.style.display = "flex";
  };
  const hide = (el) => {
    el.classList.add("hidden");
    el.style.display = "none";
  };
  const hideAll = () => todosLosPaneles.forEach(hide);

  const irInicio = () => {
    hideAll();
    show(pantallaInicio);
    window.scrollTo(0, 0);
  };
  const irEmergencia = () => {
    hideAll();
    show(panelEmergencia);
    window.scrollTo(0, 0);
  };
  const irCredencial = () => {
    hideAll();
    show(panelCredencial);
    window.scrollTo(0, 0);
    input?.focus();
  };
  const irGuias = () => {
    hideAll();
    show(panelGuias);
    window.scrollTo(0, 0);
  };
  const irDirectorio = () => {
    hideAll();
    show(panelDirectorio);
    window.scrollTo(0, 0);
  };
  const irMapa = () => {
    hideAll();
    show(panelMapa);
    window.scrollTo(0, 0);
  };
  const irLogin = () => {
    hideAll();
    show(panelLogin);
    window.scrollTo(0, 0);
  };
  const irRegistroCuenta = () => {
    hideAll();
    show(panelRegistroCuenta);
    window.scrollTo(0, 0);
  };
  const irNosotros = () => {
    hideAll();
    show(panelNosotros);
    window.scrollTo(0, 0);
  };
  const irChat = () => {
    hideAll();
    show(panelChat);
    window.scrollTo(0, 0);
  };

  botonSOS?.addEventListener("click", irEmergencia);
  abrirCredencial?.addEventListener("click", irCredencial);
  volverInicio?.addEventListener("click", irInicio);

  // Router simple (links y botones con data-route)
  const setActiveNav = (route) => {
    const navs = $$("a[data-route]");
    navs.forEach((a) => {
      const isActive = a.dataset.route === route;
      a.classList.toggle("text-primary", isActive);
      a.classList.toggle("font-bold", isActive);
      a.classList.toggle("border-b-2", isActive);
      a.classList.toggle("border-primary", isActive);
      a.classList.toggle("pb-1", isActive);
      if (!isActive) {
        a.classList.add("text-slate-700", "dark:text-slate-200", "font-medium");
        a.classList.remove("text-slate-900", "dark:text-white");
      }
    });
  };

  const go = (route) => {
    const r = String(route || "").toLowerCase();
    if (r === "inicio") {
      irInicio();
      setActiveNav("inicio");
      return;
    }
    if (r === "credencial") {
      irCredencial();
      setActiveNav("credencial");
      return;
    }
    if (r === "emergencia" || r === "sos") {
      irEmergencia();
      setActiveNav("inicio");
      return;
    }
    if (r === "chat") { irChat(); setActiveNav("chat"); return; }
    if (r === "guias") { irGuias(); setActiveNav("guias"); return; }
    if (r === "directorio") { irDirectorio(); setActiveNav("directorio"); return; }
    if (r === "mapa") { irMapa(); setActiveNav("mapa"); return; }
    if (r === "nosotros") { irNosotros(); setActiveNav("nosotros"); return; }
    if (r === "login") { irLogin(); setActiveNav("inicio"); return; }
    if (r === "registro") { irRegistroCuenta(); setActiveNav("inicio"); return; }
    showToast({ title: "Ruta no válida", message: "Ese botón aún no tiene acción configurada." });
  };

  document.addEventListener("click", (e) => {
    const el = e.target?.closest?.("[data-route]");
    if (!el) return;
    // Evita que los <a href="#..."> brinquen raro
    e.preventDefault?.();
    go(el.dataset.route);
    // Cierra el menú de cuenta si estaba abierto
    menuCuenta?.classList.add("hidden");
    // Mantén el hash útil (opcional)
    if (el.tagName === "A") history.replaceState(null, "", el.getAttribute("href") || "#");
  });

  window.addEventListener("hashchange", () => {
    const hash = (location.hash || "").replace("#", "").trim();
    if (hash) go(hash);
  });

  // Botones de Manual rápido en panel de emergencia -> abren Guías y enfocan la tarjeta correcta
  const focusGuia = (tipo) => {
    irGuias();
    setActiveNav("guias");
    let target = null;
    if (tipo === "desmayo") target = guiaDesmayo;
    if (tipo === "convulsion") target = guiaConvulsion;
    if (tipo === "herida") target = guiaHerida;
    if (tipo === "atragantamiento") target = guiaAtragantamiento;
    if (!target) return;

    target.classList.add("ring-4", "ring-danger/60", "ring-offset-2", "ring-offset-background-light", "dark:ring-offset-background-dark");
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Quitar el highlight después de unos segundos
    setTimeout(() => {
      target.classList.remove("ring-4", "ring-danger/60", "ring-offset-2", "ring-offset-background-light", "dark:ring-offset-background-dark");
    }, 3500);
  };

  document.addEventListener("click", (e) => {
    const btnManual = e.target?.closest?.("button[data-manual]");
    if (!btnManual) return;
    const tipo = btnManual.getAttribute("data-manual");
    if (!tipo) return;
    e.preventDefault?.();
    focusGuia(tipo);
  });

  // ============================
  // CHAT DE ORIENTACIÓN RÁPIDA
  // ============================
  const chatInput = $("chat-input");
  const chatEnviar = $("chat-enviar");
  const chatMensajes = $("chat-mensajes");

  const addChatMessage = (from, text) => {
    if (!chatMensajes) return;
    const wrapper = document.createElement("div");
    const isUser = from === "user";
    wrapper.className = `flex ${isUser ? "justify-end" : "justify-start"}`;
    wrapper.innerHTML = `
      <div class="max-w-[85%] rounded-2xl px-3 py-2 text-xs md:text-sm ${
        isUser
          ? "bg-primary text-white rounded-br-sm"
          : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-50 rounded-bl-sm"
      }">
        ${escapeHtml(text)}
      </div>
    `;
    chatMensajes.appendChild(wrapper);
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
  };

  const initChatIfEmpty = () => {
    if (!chatMensajes || chatMensajes.children.length > 0) return;
    addChatMessage(
      "bot",
      "Hola, soy un chat de orientación. Cuéntame con tus palabras qué sientes (ej. “dolor de pecho y falta de aire”, “fiebre desde ayer”, “me duele el estómago”). No soy médico: si parece grave te mandaré al botón SOS."
    );
  };

  const analizarSintomasBasico = (texto) => {
    const t = texto.toLowerCase();

    const redFlags = [
      /(dolor|duele|molestia).*?(pecho|t[óo]rax|torax)/,
      /falta de aire|no puedo respirar|me ahogo|no respiro bien/,
      /no puede hablar|no puedo hablar/,
      /paralizad[oa]|no puedo mover/,
      /convulsi[oó]n/,
      /desmay[ao]/,
      /sangrado abundante|mucha sangre/,
    ];

    const posibles = [];
    if (/tos|fiebre|gripe|gripa|dolor de garganta/.test(t)) posibles.push("infección respiratoria (gripe, resfriado u otra)");
    if (/(dolor|duele).*cabeza|migrañ/.test(t)) posibles.push("cefalea (dolor de cabeza), que puede ser desde tensión hasta migraña");
    if (/dolor.*est[oó]mago|dolor abdominal|n[aá]useas|v[oó]mito/.test(t))
      posibles.push("molestia gastrointestinal (gastritis, infección, irritación)");
    if (/tos.*fiebre|fiebre.*tos/.test(t))
      posibles.push("cuadro respiratorio que puede requerir revisión (posible bronquitis o similar)");

    const esRedFlag = redFlags.some((re) => re.test(t));

    if (esRedFlag) {
      return {
        tipo: "urgente",
        mensaje:
          "Por lo que describes, podría tratarse de una situación de URGENCIA. Usa el botón SOS del inicio o llama al 911/servicios de emergencia del campus. No esperes cita programada.",
      };
    }

    if (posibles.length === 0) {
      return {
        tipo: "indefinido",
        mensaje:
          "No puedo identificar claramente el tipo de problema solo con este texto. Si te sientes muy mal, trata el caso como urgente. Si no es tan intenso, puedes considerar pedir una cita médica en el IMSS para una valoración completa.",
      };
    }

    return {
      tipo: "no_urgente",
      mensaje: `Podría relacionarse con: ${posibles.join(
        "; ",
      )}. Esto NO es un diagnóstico. Si los síntomas son moderados y no empeoran, puedes agendar una cita médica en el IMSS para valoración. Si empeora o sientes que no puedes más, trátalo como urgencia (usa SOS / 911).`,
    };
  };

  const analizarConCerebro = async (texto) => {
    const data = await loadCerebroMedico();
    if (!data?.padecimientos) return null;
    const t = texto.toLowerCase();

    const candidatos = data.padecimientos
      .map((p) => {
        const campos = [
          p.nombre,
          p.descripcion,
          ...(p.sintomas_generales || []),
          ...((p.emergencias || []).flatMap((e) => [e.nombre, ...(e.sintomas || [])])),
        ]
          .join(" ")
          .toLowerCase();

        let score = 0;
        for (const raw of t.split(/\s+/)) {
          const w = raw.replace(/[^a-záéíóúñü0-9]/gi, "");
          if (w.length >= 4 && campos.includes(w)) score += 2;
          // coincidencias parciales comunes (pecho, cabeza, estómago)
          if (w.length >= 4 && campos.indexOf(w) === -1 && campos.includes(w.slice(0, 4))) score += 1;
        }
        return { padecimiento: p, score };
      })
      .filter((x) => x.score >= 2)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    if (!candidatos.length) return null;

    const nivelPeso = { CRÍTICO: 4, CRITICO: 4, ALTO: 3, MEDIO: 2, BAJO: 1 };

    const resumenes = candidatos.map(({ padecimiento, score }) => {
      const emergencias = padecimiento.emergencias || [];
      let nivelMax = "BAJO";
      let ejemplo = null;
      for (const e of emergencias) {
        const n = (e.nivel_urgencia || "BAJO").toUpperCase();
        if ((nivelPeso[n] || 0) > (nivelPeso[nivelMax] || 0)) {
          nivelMax = n;
          ejemplo = e;
        }
      }
      const etiquetaNivel =
        nivelMax === "CRÍTICO" || nivelMax === "CRITICO"
          ? "CRÍTICO (llamar al 911 de inmediato si los síntomas encajan)"
          : nivelMax === "ALTO"
            ? "ALTO (puede requerir atención urgente)"
            : nivelMax === "MEDIO"
              ? "MEDIO (revisar pronto con médico)"
              : "BAJO (generalmente no urgente, pero vigilar)";

      const pasos = (ejemplo?.que_hacer || []).slice(0, 3);

      return {
        nombre: padecimiento.nombre,
        tipo: padecimiento.tipo,
        nivel: etiquetaNivel,
        pasos,
        cuando911: padecimiento.llamar_911_cuando,
        score,
      };
    });

    return resumenes;
  };

  const enviarChat = async () => {
    const txt = norm(chatInput?.value);
    if (!txt) return;
    initChatIfEmpty();
    addChatMessage("user", txt);
    if (chatInput) chatInput.value = "";

    const resBasico = analizarSintomasBasico(txt);
    if (resBasico.tipo === "urgente") {
      addChatMessage("bot", resBasico.mensaje);
      showToast({
        title: "Posible urgencia",
        message: "Revisa el botón SOS en el inicio y considera llamar al 911.",
      });
    } else {
      addChatMessage("bot", resBasico.mensaje);
    }

    const resumenes = await analizarConCerebro(txt);
    if (resumenes && resumenes.length) {
      const textoExtra =
        "Con base en lo que escribiste, podría relacionarse con alguno de estos padecimientos (esto NO es diagnóstico, solo orientación):\n\n" +
        resumenes
          .map((r) => {
            const pasosTxt = r.pasos.map((p) => `- ${p}`).join("\n");
            return `• ${r.nombre} (${r.tipo})\n  Nivel: ${r.nivel}\n  Qué puedes hacer:\n${pasosTxt}\n  Cuándo llamar al 911: ${r.cuando911}`;
          })
          .join("\n\n");
      addChatMessage("bot", textoExtra);
    }
  };

  chatEnviar?.addEventListener("click", () => {
    enviarChat();
  });
  chatInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enviarChat();
    }
  });

  document.addEventListener("click", (e) => {
    const quick = e.target?.closest?.(".chat-quick");
    if (!quick) return;
    const val = quick.getAttribute("data-quick");
    if (!val) return;
    if (chatInput) {
      chatInput.value = val;
      chatInput.focus();
    }
  });

  // ============================================================
  // BASE DE DATOS DINÁMICA — carga desde CSV o demo embebido
  // ============================================================
  const CSV_DEMO = `control,nombre,carrera,tipo_sangre,alergia,padecimiento,medicamentos,contacto_nombre,contacto_tel,notas
c22230697,Ana García López,Ing. Sistemas Computacionales,O+,Penicilina,Asma,Salbutamol inhalador,María López,9211000001,Crisis asmática: sentar aflojar ropa usar inhalador
22230698,Carlos Mendoza Ríos,Ing. Industrial,A-,,Diabetes tipo 1,Insulina personal,Roberto Mendoza,9211000002,Desorientado con sudor frío: posible hipoglucemia dar azúcar si está consciente
c22230699,Sofía Torres Vega,Ing. Mecánica,B+,,,,,9211000003,Sin alertas médicas registradas
22230700,Luis Ramírez Cruz,Ing. Eléctrica,AB+,Ibuprofeno,Epilepsia,Ácido valproico,Elena Cruz,9211000004,Convulsión: no sujetar no meter nada en boca cronometrar si pasa 5 min llamar 911
c22230701,Daniela Flores Ruiz,Ing. Química,O-,Látex,,,,9211000005,Evitar contacto con guantes de látex y productos con latex
22230702,Miguel Hernández Pérez,Ing. Sistemas Computacionales,A+,Sulfonamidas,Hipertensión,Losartán 50mg,Jorge Hernández,9211000006,No suministrar sulfonamidas; en crisis hipertensiva: sentar tranquilizar llamar 911
c22230703,Valeria Castillo Mora,Ing. Industrial,B-,,Anemia,,Carmen Mora,9211000007,Puede presentar fatiga y mareos frecuentes; asegurar que coma y descanse
22230704,Diego Ortega Soto,Ing. Mecánica,O+,Aspirina,Asma,Montelukast,Patricia Soto,9211000008,No dar aspirina ni antiinflamatorios similares; inhalador en mochila
c22230705,Paola Jiménez Díaz,Ing. Eléctrica,A+,,,,,9211000009,Sin alertas médicas registradas
22230706,Andrés López Vargas,Ing. Química,AB-,Penicilina Amoxicilina,Diabetes tipo 2,Metformina,Sandra Vargas,9211000010,Alergia severa a penicilinas; si hipoglucemia dar azúcar; no dar antibióticos sin consultar`;

  const norm = (v) => String(v ?? "").trim();

  // Convierte una fila CSV a la estructura interna de la app
  const csvRowToStudent = (row) => {
    const alertas = [];
    const alergia = norm(row.alergia);
    const padecimiento = norm(row.padecimiento);

    if (alergia) alertas.push({ nivel: "ALTO",  etiqueta: "Alergia",      valor: alergia });
    if (padecimiento) {
      const nivelPad = ["diabetes","epilepsia","asma","hipertension"].some(k =>
        padecimiento.toLowerCase().includes(k)) ? "ALTO" : "MEDIO";
      alertas.push({ nivel: nivelPad, etiqueta: "Padecimiento", valor: padecimiento });
    }
    if (!alertas.length) alertas.push({ nivel: "BAJO", etiqueta: "Sin alertas", valor: "No registradas" });

    const meds = norm(row.medicamentos) ? norm(row.medicamentos).split(/[,;]/).map(m => m.trim()).filter(Boolean) : [];

    return {
      control:     norm(row.control),
      barcode:     norm(row.control),   // usa el control como barcode por defecto
      displayName: norm(row.nombre),
      carrera:     norm(row.carrera),
      alertas,
      extras: {
        tipoSangre:         norm(row.tipo_sangre) || "No registrado",
        medicamentosClave:  meds,
        contactoEmergencia: { nombre: norm(row.contacto_nombre) || "No registrado", telefono: norm(row.contacto_tel) || "" },
        notas:              norm(row.notas) || "Sin notas.",
      },
    };
  };

  // Parsea CSV robusto: maneja BOM, CRLF, campos vacíos y PapaParse opcional
  const parseCSV = (text) => {
    // Limpiar BOM y saltos de línea de Windows
    const clean = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

    if (window.Papa) {
      const result = Papa.parse(clean, {
        header: true,
        skipEmptyLines: true,
        transformHeader: h => h.trim().toLowerCase().replace(/\s+/g, "_"),
        transform: v => v.trim()
      });
      return result.data.map(csvRowToStudent).filter(s => s.control);
    }

    // Fallback manual robusto
    const lines = clean.split("\n").filter(l => l.trim());
    const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,""));
    return lines.slice(1).map(line => {
      // Split respetando campos entre comillas
      const vals = [];
      let cur = "", inQ = false;
      for (const ch of line) {
        if (ch === '"') { inQ = !inQ; }
        else if (ch === "," && !inQ) { vals.push(cur.trim()); cur = ""; }
        else { cur += ch; }
      }
      vals.push(cur.trim());
      const row = {};
      headers.forEach((h, i) => { row[h] = (vals[i] || "").replace(/^"|"$/g,"").trim(); });
      return csvRowToStudent(row);
    }).filter(s => s.control);
  };

  // Estado global de la DB
  let DB = parseCSV(CSV_DEMO);
  let dbModo = "demo"; // "demo" | "csv"

  const actualizarEstadoCSV = () => {
    const el = $("csv-status-text");
    if (!el) return;
    if (dbModo === "demo") {
      el.innerHTML = `<span class="text-amber-600 font-bold">Demo activo</span> · ${DB.length} estudiantes · formato: c22230697 ó 22230697`;
    } else {
      el.innerHTML = `<span class="text-secondary-green font-bold">✅ CSV cargado</span> · ${DB.length} estudiantes`;
    }
  };
  actualizarEstadoCSV();

  // Botón cargar CSV
  const csvFileInput = $("csv-file-input");
  const csvResetBtn  = $("csv-reset-btn");

  csvFileInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target.result;
        const parsed = parseCSV(text);
        if (parsed.length === 0) throw new Error("Sin filas válidas");
        DB = parsed;
        dbModo = "csv";
        actualizarEstadoCSV();
        showToast({ title: "✅ CSV cargado", message: `${DB.length} estudiantes importados correctamente.`, ms: 4000 });
        // Limpiar resultado anterior
        btnLimpiar?.click();
      } catch (err) {
        showToast({ title: "Error al leer CSV", message: "Revisa que el archivo tenga el formato correcto.", ms: 5000 });
      }
    };
    reader.readAsText(file, "UTF-8");
    e.target.value = ""; // allow re-upload same file
  });

  csvResetBtn?.addEventListener("click", () => {
    DB = parseCSV(CSV_DEMO);
    dbModo = "demo";
    actualizarEstadoCSV();
    btnLimpiar?.click();
    showToast({ title: "Demo restaurado", message: `${DB.length} estudiantes de prueba activos.` });
  });

  const maskPhone = (v) => {
    const s = norm(v).replace(/\D/g, "");
    if (s.length < 7) return "******";
    return `${s.slice(0, 3)}***${s.slice(-2)}`;
  };

  // --- Registro local de consultas (auditoría básica) ---
  const STORAGE_KEY = "cuidaTec.consultas";
  const getLog = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  };
  const setLog = (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  const addLog = (item) => {
    const items = getLog();
    items.unshift(item);
    setLog(items.slice(0, 50));
  };

  const renderRegistro = () => {
    const items = getLog();
    if (!listaRegistro) return;
    if (items.length === 0) {
      listaRegistro.innerHTML =
        '<div class="rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-slate-600 dark:text-slate-300">Sin registros.</div>';
      return;
    }
    listaRegistro.innerHTML = items
      .map((it) => {
        const when = new Date(it.ts).toLocaleString();
        return `
          <div class="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <div class="flex items-center justify-between gap-3">
              <div class="font-black text-slate-900 dark:text-white">${it.action}</div>
              <div class="text-xs font-bold text-slate-500 dark:text-slate-400">${when}</div>
            </div>
            <div class="mt-2 text-sm text-slate-700 dark:text-slate-200">
              <div><span class="font-bold">Consulta</span>: ${it.queryMasked}</div>
              <div><span class="font-bold">Resultado</span>: ${it.result}</div>
            </div>
          </div>
        `;
      })
      .join("");
  };

  const openModal = () => {
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.style.display = "flex";
    renderRegistro();
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.style.display = "none";
  };

  btnVerRegistro?.addEventListener("click", openModal);
  btnCerrarRegistro?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    const backdrop = modal.querySelector(":scope > div.absolute");
    if (e.target === modal || e.target === backdrop) closeModal();
  });
  btnBorrarRegistro?.addEventListener("click", () => {
    setLog([]);
    renderRegistro();
  });

  // --- Render UI resultado ---
  const setEstado = (text, tone = "idle") => {
    if (!estado) return;
    estado.textContent = text;
    estado.className =
      "text-xs font-black px-3 py-1 rounded-full " +
      (tone === "ok"
        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
        : tone === "warn"
          ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200"
          : tone === "bad"
            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200");
  };

  const escapeHtml = (s) =>
    String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const badgeNivel = (nivel) => {
    const n = norm(nivel).toUpperCase();
    if (n === "ALTO") return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
    if (n === "MEDIO") return "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200";
    return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
  };

  const renderNoEncontrado = () => {
    if (!resultado) return;
    resultado.innerHTML = `
      <div class="rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div class="flex items-start gap-3">
          <span class="material-symbols-outlined text-danger">error</span>
          <div>
            <div class="font-black text-slate-900 dark:text-white">No se encontró coincidencia</div>
            <div class="text-sm text-slate-600 dark:text-slate-400 mt-1">Revisa el número de control o vuelve a escanear el código de barras.</div>
          </div>
        </div>
      </div>
    `;
  };

  const renderFicha = (alumno) => {
    if (!resultado) return;
    const extras = alumno.extras || {};
    const meds   = Array.isArray(extras.medicamentosClave) ? extras.medicamentosClave : [];

    const alertasHtml = (alumno.alertas || []).map(a => {
      const isAlto  = a.nivel === "ALTO";
      const isMedio = a.nivel === "MEDIO";
      const bg    = isAlto  ? "bg-red-50 dark:bg-red-900/20 border-danger/40"
                  : isMedio ? "bg-amber-50 dark:bg-amber-900/20 border-amber-400/40"
                  :           "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700";
      const icon  = isAlto  ? "warning" : isMedio ? "info" : "check_circle";
      const icol  = isAlto  ? "text-danger" : isMedio ? "text-amber-500" : "text-slate-400";
      const badge = isAlto  ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200"
                  : isMedio ? "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200"
                  :           "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300";
      return `
        <div class="flex items-start gap-3 rounded-2xl border ${bg} p-4">
          <span class="material-symbols-outlined ${icol} text-2xl mt-0.5">${icon}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-black text-slate-900 dark:text-white">${escapeHtml(a.etiqueta)}</span>
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full ${badge}">${escapeHtml(a.nivel)}</span>
            </div>
            <div class="text-sm font-bold text-slate-700 dark:text-slate-200 mt-0.5">${escapeHtml(a.valor)}</div>
          </div>
        </div>`;
    }).join("");

    const sangre = escapeHtml(extras.tipoSangre || "—");
    const sangreColor = (sangre.includes("O-") || sangre.includes("AB-"))
      ? "bg-red-600" : sangre.includes("-") ? "bg-amber-500" : "bg-primary";

    const notas = escapeHtml(extras.notas || "Sin notas.");
    const tieneNota = extras.notas &&
      extras.notas !== "Sin alertas médicas registradas" &&
      extras.notas !== "Sin notas.";

    const telLimpio = norm(extras.contactoEmergencia?.telefono || "").replace(/\D/g,"");
    const nombreContacto = escapeHtml(extras.contactoEmergencia?.nombre || "No registrado");
    const telContacto    = escapeHtml(extras.contactoEmergencia?.telefono || "");
    const btnLlamar = telLimpio
      ? `<a href="tel:${telLimpio}" class="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-secondary-green text-white px-4 py-2 text-sm font-black hover:bg-green-700 transition">
           <span class="material-symbols-outlined text-base">phone_in_talk</span> Llamar ahora
         </a>`
      : "";

    resultado.innerHTML = `
      <div class="space-y-4">

        <div class="rounded-2xl bg-primary text-white p-4 flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-3xl">person</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-[10px] font-bold opacity-70 uppercase tracking-wide">Estudiante encontrado</div>
            <div class="text-lg font-black leading-tight">${escapeHtml(alumno.displayName)}</div>
            <div class="text-xs opacity-75 mt-0.5">${escapeHtml(alumno.carrera)}</div>
            <div class="text-[10px] opacity-50 font-mono mt-0.5">${escapeHtml(alumno.control)}</div>
          </div>
          <div class="${sangreColor} rounded-2xl px-3 py-2 text-center shrink-0">
            <div class="text-[10px] font-bold opacity-80 uppercase">Sangre</div>
            <div class="text-2xl font-black leading-none">${sangre}</div>
          </div>
        </div>

        <div>
          <div class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 px-1">⚠️ Alertas médicas</div>
          <div class="space-y-2">${alertasHtml}</div>
        </div>

        ${tieneNota ? `
        <div class="rounded-2xl border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/15 p-4">
          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-amber-500 text-lg">bolt</span>
            <span class="font-black text-amber-900 dark:text-amber-200 text-sm">Qué hacer en emergencia</span>
          </div>
          <p class="text-sm text-amber-800 dark:text-amber-100 leading-relaxed">${notas}</p>
        </div>` : ""}

        ${meds.length ? `
        <div class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-primary text-lg">medication</span>
            <span class="font-black text-slate-900 dark:text-white text-sm">Medicamentos clave</span>
          </div>
          <div class="flex flex-wrap gap-2">
            ${meds.map(m => `<span class="rounded-full bg-primary/10 text-primary text-xs font-bold px-3 py-1">${escapeHtml(m)}</span>`).join("")}
          </div>
        </div>` : ""}

        <div class="rounded-2xl border border-secondary-green/30 bg-green-50 dark:bg-green-900/15 p-4">
          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-secondary-green text-lg">contact_phone</span>
            <span class="font-black text-slate-900 dark:text-white text-sm">Contacto de emergencia</span>
          </div>
          <div class="text-base font-black text-slate-900 dark:text-white">${nombreContacto}</div>
          ${telContacto ? `<div class="text-sm text-secondary-green font-bold mt-0.5">${telContacto}</div>` : ""}
          ${btnLlamar}
        </div>

      </div>
    `;
  };

  // --- Búsqueda ---
  const buscar = () => {
    const q = norm(input?.value);
    if (!q) {
      setEstado("Escribe o escanea", "warn");
      return;
    }
    if (!chkPrivacidad?.checked) {
      setEstado("Confirma privacidad", "warn");
      showToast({
        title: "Privacidad",
        message: "Confirma que tienes un motivo válido antes de consultar.",
      });
      return;
    }

    // Acepta: 8 dígitos (22230697) ó 1 letra + 8 dígitos (c22230697)
    const soloDigitos = (v) => v.replace(/[^0-9]/g, "");
    const qLow = q.toLowerCase().trim();
    const qDig = soloDigitos(q); // quita letra si la tiene → siempre 8 dígitos

    const alumno = DB.find((x) => {
      const cLow = x.control.toLowerCase().trim();
      const cDig = soloDigitos(x.control);
      if (cLow === qLow) return true;              // exacta (mayúsculas indiferentes)
      if (qDig.length >= 8 && cDig === qDig) return true; // mismos 8 dígitos sin importar letra
      return false;
    });
    const masked = q.length <= 4 ? "****" : `${q.slice(0, 2)}******${q.slice(-2)}`;

    if (!alumno) {
      renderNoEncontrado();
      setEstado("No encontrado", "bad");
      addLog({ ts: Date.now(), action: "Consulta", queryMasked: masked, result: "Sin coincidencia" });
      // Ayuda: muestra primeros controles para verificar formato
      const primeros = DB.slice(0, 4).map(x => x.control).join(" · ");
      showToast({ title: `${DB.length} registros en memoria`, message: `Ejemplo: ${primeros}`, ms: 5000 });
      return;
    }

    renderFicha(alumno);
    setEstado("Encontrado (alertas)", "ok");
    addLog({ ts: Date.now(), action: "Consulta", queryMasked: masked, result: alumno.displayName });
  };

  btnBuscar?.addEventListener("click", buscar);
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") buscar();
  });

  btnLimpiar?.addEventListener("click", () => {
    if (input) input.value = "";
    if (chkPrivacidad) chkPrivacidad.checked = false;
    setEstado("Sin búsqueda");
    if (resultado) {
      resultado.innerHTML = `
        <div class="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 p-6 text-center text-slate-600 dark:text-slate-300">
          <span class="material-symbols-outlined text-5xl text-primary/70">qr_code_2</span>
          <p class="mt-3 font-bold">Escanea una credencial o ingresa el número de control.</p>
          <p class="text-sm mt-1 text-slate-500 dark:text-slate-400">Tip: muchos lectores de código actúan como teclado y terminan con Enter.</p>
        </div>
      `;
    }
  });


  // =============================================
  // ESCÁNER DE CÁMARA (html5-qrcode)
  // Soporta: código de barras lineal + QR
  // =============================================
  const modalScanner   = $("modal-scanner");
  const btnCamara      = $("btn-camara");
  const cerrarScanner  = $("cerrar-scanner");
  const scannerRegion  = $("scanner-region");
  const scannerStatus  = $("scanner-status");

  let html5Qr = null;
  let scannerActivo = false;

  const abrirScanner = async () => {
    if (!modalScanner) return;
    modalScanner.classList.remove("hidden");
    modalScanner.style.display = "flex";
    scannerStatus.textContent = "Iniciando cámara...";

    // Esperar un frame para que el div sea visible antes de iniciar
    await new Promise(r => setTimeout(r, 100));

    try {
      html5Qr = new Html5Qrcode("scanner-region");

      const config = {
        fps: 12,
        qrbox: { width: 260, height: 160 },
        aspectRatio: 1.4,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.CODE_128,   // el más común en credenciales
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.ITF,
          Html5QrcodeSupportedFormats.PDF_417,
        ],
        experimentalFeatures: { useBarCodeDetectorIfSupported: true },
      };

      await html5Qr.start(
        { facingMode: "environment" },   // cámara trasera
        config,
        (decodedText) => {
          // ¡Código detectado!
          cerrarScannerFn();
          if (input) {
            input.value = decodedText.trim();
            input.focus();
          }
          showToast({ title: "Código detectado", message: `"${decodedText.trim()}" — presiona Buscar o Enter.`, ms: 4000 });
          // Auto-buscar si el checkbox ya está marcado
          if (chkPrivacidad?.checked) buscar();
        },
        (errorMsg) => {
          // Ignoramos errores de frame (normales mientras busca)
        }
      );

      scannerActivo = true;
      scannerStatus.textContent = "✅ Cámara activa — apunta al código";
    } catch (err) {
      console.error("Scanner error:", err);
      let msg = "No se pudo iniciar la cámara.";
      if (err.toString().includes("NotAllowedError") || err.toString().includes("Permission")) {
        msg = "❌ Permiso de cámara denegado. Ve a Configuración del navegador y permite el acceso.";
      } else if (err.toString().includes("NotFoundError")) {
        msg = "❌ No se encontró cámara en este dispositivo.";
      }
      scannerStatus.textContent = msg;
    }
  };

  const cerrarScannerFn = async () => {
    if (!modalScanner) return;
    modalScanner.classList.add("hidden");
    modalScanner.style.display = "none";
    if (html5Qr && scannerActivo) {
      try {
        await html5Qr.stop();
        html5Qr.clear();
      } catch (e) { /* ya estaba parado */ }
      scannerActivo = false;
      html5Qr = null;
    }
  };

  btnCamara?.addEventListener("click", abrirScanner);
  cerrarScanner?.addEventListener("click", cerrarScannerFn);
  modalScanner?.addEventListener("click", (e) => {
    if (e.target === modalScanner) cerrarScannerFn();
  });

  // Estado inicial consistente
  hideAll();
  show(pantallaInicio);
  setActiveNav("inicio");

  // Si abren con hash (ej. #credencial), navega ahí
  const initialHash = (location.hash || "").replace("#", "").trim();
  if (initialHash) go(initialHash);

  // ====================================================
  // GPS: COMPARTIR UBICACIÓN POR WHATSAPP
  // ====================================================
  const btnCompartirUbicacion = $("btn-compartir-ubicacion");

  const compartirUbicacion = () => {
    if (!navigator.geolocation) {
      showToast({
        title: "GPS no disponible",
        message: "Tu dispositivo no soporta geolocalización.",
        ms: 4000,
      });
      return;
    }

    // Feedback inmediato mientras obtiene el GPS
    if (btnCompartirUbicacion) {
      btnCompartirUbicacion.innerHTML = `
        <span class="material-symbols-outlined text-3xl animate-spin">sync</span>
        <div class="flex flex-col items-start leading-tight">
          <span>OBTENIENDO GPS...</span>
          <span class="text-xs font-normal opacity-75">Espera un momento</span>
        </div>`;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
        const mensaje = encodeURIComponent(
          `🚨 *EMERGENCIA - Tec de Minatitlán*\n\nNecesito ayuda urgente.\n📍 Mi ubicación exacta:\n${mapsUrl}\n\nCoordenadas: ${lat}, ${lng}`
        );

        // Restaurar botón
        if (btnCompartirUbicacion) {
          btnCompartirUbicacion.innerHTML = `
            <span class="material-symbols-outlined text-3xl">share_location</span>
            <div class="flex flex-col items-start leading-tight">
              <span>ENVIAR MI UBICACIÓN</span>
              <span class="text-xs font-normal opacity-75">Abre WhatsApp con tu posición GPS</span>
            </div>`;
        }

        window.open(`https://wa.me/?text=${mensaje}`, "_blank");
        showToast({
          title: "Ubicación obtenida",
          message: "Se abrió WhatsApp con tu posición GPS. Elige a quién enviarla.",
          ms: 5000,
        });
      },
      (err) => {
        // Restaurar botón
        if (btnCompartirUbicacion) {
          btnCompartirUbicacion.innerHTML = `
            <span class="material-symbols-outlined text-3xl">share_location</span>
            <div class="flex flex-col items-start leading-tight">
              <span>ENVIAR MI UBICACIÓN</span>
              <span class="text-xs font-normal opacity-75">Abre WhatsApp con tu posición GPS</span>
            </div>`;
        }

        let msg = "No se pudo obtener la ubicación.";
        if (err.code === 1) msg = "Permiso de ubicación denegado. Actívalo en configuración del navegador.";
        else if (err.code === 3) msg = "Tiempo de espera agotado. Intenta de nuevo.";
        showToast({ title: "Error GPS", message: msg, ms: 5000 });
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
    );
  };

  btnCompartirUbicacion?.addEventListener("click", compartirUbicacion);

  // ====================================================
  // TEMPORIZADOR MÉDICO — WIDGET FLOTANTE PERSISTENTE
  // ====================================================
  const timerPill        = $("timer-pill");
  const timerPillDisplay = $("timer-pill-display");
  const timerPillLabel   = $("timer-pill-label");
  const timerPillRing    = $("timer-pill-ring");
  const timerPillIcon    = $("timer-pill-icon");

  const timerPanel       = $("timer-panel");
  const timerLabel       = $("timer-label");
  const timerDisplay     = $("timer-display");
  const timerRing        = $("timer-ring");
  const timerAlerta      = $("timer-alerta");
  const timerAlertaFull  = $("timer-alerta-full");
  const timerAlertaNombre= $("timer-alerta-nombre");
  const timerAlertaCerrar= $("timer-alerta-cerrar");
  const timerToggleBtn   = $("timer-toggle");
  const timerResetBtn    = $("timer-reset");
  const cerrarTimerBtn   = $("cerrar-timer");
  const timerCollapseBtn = $("timer-collapse");
  const timerStatusTxt   = $("timer-status-text");

  const RING_CIRC_PANEL = 326.7;
  const RING_CIRC_PILL  = 94.25;

  let timerTotal     = 0;
  let timerRestante  = 0;
  let timerInterval  = null;
  let timerCorriendo = false;
  let timerCurrentLabel = "";
  let panelVisible   = false;

  // ── Slideshow state ──────────────────────────────────────
  let ssEl         = null;   // active slideshow element
  let ssIndex      = 0;      // current slide index
  let ssCount      = 0;      // total slides
  let ssPaused     = false;  // user paused auto-advance
  let ssResumeTO   = null;   // timeout to auto-resume

  const ssGoTo = (idx, fromUser = false) => {
    if (!ssEl) return;
    const track  = ssEl.querySelector('.slideshow-track');
    const slides = ssEl.querySelectorAll('.slideshow-slide');
    const dotEls = ssEl.querySelectorAll('.slideshow-dot');
    if (!track || !slides.length) return;

    idx = Math.max(0, Math.min(idx, slides.length - 1));
    ssIndex = idx;

    // Percentage-based — works even when container was hidden during init
    track.style.transform = `translateX(-${idx * 100}%)`;

    // Update dots
    dotEls.forEach((d, i) => {
      d.className = `slideshow-dot h-2 rounded-full transition-all duration-300 ${
        i === idx ? 'bg-primary w-4' : 'bg-slate-300 dark:bg-slate-600 w-2'
      }`;
    });

    if (fromUser) {
      // Pause auto-advance and show badge
      ssPaused = true;
      const badge = ssEl.querySelector('.slideshow-paused-badge');
      if (badge) { badge.classList.remove('hidden'); badge.style.display = 'flex'; }
      clearTimeout(ssResumeTO);
      ssResumeTO = setTimeout(() => {
        ssPaused = false;
        if (badge) { badge.classList.add('hidden'); badge.style.display = ''; }
      }, 4000);
    }
  };

  const ssInit = (guia) => {
    // Find slideshow element for this guide
    ssEl = document.querySelector(`.guia-slideshow[data-guia="${guia}"]`);
    if (!ssEl) { ssEl = null; return; }
    ssCount = ssEl.querySelectorAll('.slideshow-slide').length;
    ssPaused = false;
    ssIndex  = 0;

    // Width is 100% via CSS — no JS measurement needed
    ssGoTo(0);

    // Scroll slideshow into view
    ssEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Badge hidden
    const badge = ssEl.querySelector('.slideshow-paused-badge');
    if (badge) { badge.classList.add('hidden'); badge.style.display = ''; }
  };

  const ssUpdate = () => {
    if (!ssEl || ssPaused || ssCount < 2 || timerTotal === 0) return;
    const elapsed    = timerTotal - timerRestante;
    const stepDur    = timerTotal / ssCount;
    const targetSlide = Math.min(Math.floor(elapsed / stepDur), ssCount - 1);
    if (targetSlide !== ssIndex) ssGoTo(targetSlide);
  };

  // Delegación: prev / next en cualquier slideshow
  document.addEventListener('click', (e) => {
    const prev = e.target?.closest?.('.slideshow-prev');
    const next = e.target?.closest?.('.slideshow-next');
    const badge = e.target?.closest?.('.slideshow-paused-badge');
    const track = e.target?.closest?.('.slideshow-track');

    if (prev) {
      const sw = prev.closest('.guia-slideshow');
      if (sw && sw === ssEl) ssGoTo(ssIndex - 1, true);
      else if (sw) {
        // slideshow not active (just browsing guide without timer)
        const t = sw.querySelector('.slideshow-track');
        const slides = sw.querySelectorAll('.slideshow-slide');
        const dots   = sw.querySelectorAll('.slideshow-dot');
        const cur = parseInt(sw.dataset.idx || '0');
        const nxt = Math.max(0, cur - 1);
        sw.dataset.idx = nxt;
        if (t) t.style.transform = `translateX(-${nxt * 100}%)`;
        dots.forEach((d, i) => {
          d.className = `slideshow-dot h-2 rounded-full transition-all duration-300 ${i === nxt ? 'bg-primary w-4' : 'bg-slate-300 dark:bg-slate-600 w-2'}`;
        });
      }
    }
    if (next) {
      const sw = next.closest('.guia-slideshow');
      if (sw && sw === ssEl) ssGoTo(ssIndex + 1, true);
      else if (sw) {
        const t = sw.querySelector('.slideshow-track');
        const slides = sw.querySelectorAll('.slideshow-slide');
        const dots   = sw.querySelectorAll('.slideshow-dot');
        const cur = parseInt(sw.dataset.idx || '0');
        const nxt = Math.min(slides.length - 1, cur + 1);
        sw.dataset.idx = nxt;
        if (t) t.style.transform = `translateX(-${nxt * 100}%)`;
        dots.forEach((d, i) => {
          d.className = `slideshow-dot h-2 rounded-full transition-all duration-300 ${i === nxt ? 'bg-primary w-4' : 'bg-slate-300 dark:bg-slate-600 w-2'}`;
        });
      }
    }
    if (badge) {
      // Tap paused badge → resume
      ssPaused = false;
      badge.classList.add('hidden');
      badge.style.display = '';
      clearTimeout(ssResumeTO);
    }
  });

  // Resize: percentage-based so no recalculation needed
  window.addEventListener('resize', () => {
    document.querySelectorAll('.guia-slideshow').forEach(sw => {
      const cur = sw === ssEl ? ssIndex : parseInt(sw.dataset.idx || '0');
      const t = sw.querySelector('.slideshow-track');
      if (t) t.style.transform = `translateX(-${cur * 100}%)`;
    });
  });

  const fmt = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    return `${m}:${(s % 60).toString().padStart(2, "0")}`;
  };

  const colorTimer = (progreso) => {
    if (progreso > 0.5) return "#16a34a";
    if (progreso > 0.25) return "#d97706";
    return "#dc2626";
  };

  const actualizarUI = () => {
    const t = fmt(timerRestante);
    const progreso = timerTotal > 0 ? timerRestante / timerTotal : 1;
    const color = colorTimer(progreso);

    // Pill
    if (timerPillDisplay) timerPillDisplay.textContent = t;
    if (timerPillRing) {
      timerPillRing.style.strokeDashoffset = RING_CIRC_PILL * (1 - progreso);
      timerPillRing.style.stroke = color;
    }
    // Pill color de fondo
    const inner = $("timer-pill-inner");
    if (inner) {
      if (progreso <= 0.25) inner.style.backgroundColor = "#dc2626";
      else if (progreso <= 0.5) inner.style.backgroundColor = "#d97706";
      else inner.style.backgroundColor = "#1b4e88";
    }

    // Panel
    if (timerDisplay) timerDisplay.textContent = t;
    if (timerRing) {
      timerRing.style.strokeDashoffset = RING_CIRC_PANEL * (1 - progreso);
      timerRing.style.stroke = color;
    }
  };

  const mostrarPill = () => {
    if (!timerPill) return;
    timerPill.classList.remove("hidden");
    if (timerPillLabel) timerPillLabel.textContent = timerCurrentLabel;
  };

  const ocultarPill = () => timerPill?.classList.add("hidden");

  const expandirPanel = () => {
    timerPanel?.classList.remove("hidden");
    timerPill?.classList.add("hidden");
    panelVisible = true;
  };

  const colapsarPanel = () => {
    timerPanel?.classList.add("hidden");
    if (timerTotal > 0) mostrarPill();
    panelVisible = false;
  };

  const detenerTimer = () => {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    timerCorriendo = false;
    if (timerToggleBtn) {
      timerToggleBtn.innerHTML = `<span class="material-symbols-outlined text-base">play_arrow</span> Continuar`;
    }
    if (timerStatusTxt) timerStatusTxt.textContent = "Pausado";
    if (timerPillIcon) timerPillIcon.textContent = "pause";
  };

  const finalizarTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerCorriendo = false;

    if (timerDisplay) timerDisplay.textContent = "00:00";
    if (timerPillDisplay) timerPillDisplay.textContent = "00:00";
    if (timerAlerta) timerAlerta.classList.remove("hidden");
    if (timerToggleBtn) {
      timerToggleBtn.innerHTML = `<span class="material-symbols-outlined text-base">check_circle</span> Completado`;
      timerToggleBtn.disabled = true;
    }
    if (timerStatusTxt) timerStatusTxt.textContent = "¡Tiempo!";
    if (timerPillIcon) timerPillIcon.textContent = "alarm";

    // Pill parpadeante rojo
    const inner = $("timer-pill-inner");
    if (inner) inner.style.backgroundColor = "#dc2626";

    // Vibración
    if (navigator.vibrate) navigator.vibrate([500, 150, 500, 150, 900]);

    // Alerta fullscreen con delay mínimo para que se vea la transición
    setTimeout(() => {
      if (timerAlertaNombre) timerAlertaNombre.textContent = timerCurrentLabel;
      timerAlertaFull?.classList.remove("hidden");
      timerAlertaFull && (timerAlertaFull.style.display = "flex");
    }, 300);
  };

  const iniciarTimer = () => {
    if (timerRestante <= 0) return;
    timerCorriendo = true;
    if (timerAlerta) timerAlerta.classList.add("hidden");
    if (timerToggleBtn) {
      timerToggleBtn.innerHTML = `<span class="material-symbols-outlined text-base">pause</span> Pausar`;
      timerToggleBtn.disabled = false;
    }
    if (timerStatusTxt) timerStatusTxt.textContent = "Corriendo...";
    if (timerPillIcon) timerPillIcon.textContent = "timer";

    timerInterval = setInterval(() => {
      timerRestante--;
      actualizarUI();
      ssUpdate();
      if (timerRestante <= 0) finalizarTimer();
    }, 1000);
  };

  const resetearTimer = () => {
    detenerTimer();
    timerRestante = timerTotal;
    actualizarUI();
    if (timerAlerta) timerAlerta.classList.add("hidden");
    if (timerToggleBtn) {
      timerToggleBtn.innerHTML = `<span class="material-symbols-outlined text-base">play_arrow</span> Iniciar`;
      timerToggleBtn.disabled = false;
    }
    if (timerStatusTxt) timerStatusTxt.textContent = "Listo";
    if (timerPillIcon) timerPillIcon.textContent = "timer";
  };

  const abrirTimer = (segundos, label, guia) => {
    timerTotal         = segundos;
    timerRestante      = segundos;
    timerCurrentLabel  = label || "Temporizador";
    if (timerLabel) timerLabel.textContent = timerCurrentLabel;
    actualizarUI();
    if (timerAlerta) timerAlerta.classList.add("hidden");
    if (timerToggleBtn) {
      timerToggleBtn.innerHTML = `<span class="material-symbols-outlined text-base">play_arrow</span> Iniciar`;
      timerToggleBtn.disabled = false;
    }
    if (timerStatusTxt) timerStatusTxt.textContent = "Listo";

    // Mostrar panel expandido primero
    expandirPanel();

    // Init linked slideshow and auto-start
    if (guia) ssInit(guia);

    // Auto-iniciar
    iniciarTimer();
  };

  const cerrarTimerCompleto = () => {
    detenerTimer();
    timerTotal    = 0;
    timerRestante = 0;
    ocultarPill();
    colapsarPanel();
    timerPanel?.classList.add("hidden");
    panelVisible = false;
  };

  // Eventos de control
  timerToggleBtn?.addEventListener("click", () => {
    if (timerCorriendo) detenerTimer();
    else iniciarTimer();
  });
  timerResetBtn?.addEventListener("click", resetearTimer);
  cerrarTimerBtn?.addEventListener("click", cerrarTimerCompleto);
  timerCollapseBtn?.addEventListener("click", colapsarPanel);

  // Click en pill → expandir panel
  timerPill?.addEventListener("click", expandirPanel);

  // Alerta fullscreen → cerrar
  timerAlertaCerrar?.addEventListener("click", () => {
    timerAlertaFull?.classList.add("hidden");
    if (timerAlertaFull) timerAlertaFull.style.display = "none";
    colapsarPanel();
  });

  // Delegación: botones .btn-timer en las guías → abrir timer
  document.addEventListener("click", (e) => {
    const btn = e.target?.closest?.(".btn-timer");
    if (!btn) return;
    const segundos = parseInt(btn.getAttribute("data-segundos") || "60", 10);
    const label = btn.getAttribute("data-label") || "Temporizador médico";
    const guia  = btn.getAttribute("data-guia") || null;
    abrirTimer(segundos, label, guia);
  });
});