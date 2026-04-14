(() => {
  document.getElementById("kira-jai-panel")?.remove();

  const panel = document.createElement("div");
  panel.id = "kira-jai-panel";
  Object.assign(panel.style, {
    position: "fixed",
    top: "16px",
    right: "16px",
    width: "420px",
    maxHeight: "85vh",
    overflow: "hidden",
    background: "#111",
    color: "#eee",
    padding: "12px",
    zIndex: 999999,
    borderRadius: "12px",
    fontFamily: "system-ui, sans-serif",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    border: "1px solid #444"
  });

  const title = document.createElement("div");
  title.textContent = "JanitorAI Exporter";
  title.style.fontWeight = "700";
  title.style.marginBottom = "8px";

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.flexWrap = "wrap";
  controls.style.gap = "6px";
  controls.style.marginBottom = "8px";

  const list = document.createElement("div");
  Object.assign(list.style, {
    maxHeight: "300px",
    overflowY: "auto",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "8px",
    background: "#0a0a0a"
  });

  const output = document.createElement("textarea");
  Object.assign(output.style, {
    width: "100%",
    height: "180px",
    marginTop: "8px",
    background: "#000",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "8px",
    boxSizing: "border-box"
  });

  const status = document.createElement("div");
  status.style.fontSize = "12px";
  status.style.opacity = "0.8";
  status.style.marginTop = "6px";

  let messages = [];

  function btn(label, fn) {
    const b = document.createElement("button");
    b.textContent = label;
    Object.assign(b.style, {
      background: "#222",
      color: "#eee",
      border: "1px solid #555",
      borderRadius: "8px",
      padding: "6px 10px",
      cursor: "pointer"
    });
    b.onclick = fn;
    return b;
  }

  function getMessageNodes() {
    return [...document.querySelectorAll("li[class*='messageDisplayWrapper']")];
  }

  function getMessageText(node) {
    const ps = [...node.querySelectorAll("p")];
    const text = ps.map(p => p.innerText.trim()).filter(Boolean).join("\n");
    return text.trim();
  }

  function refreshList() {
    messages = getMessageNodes()
      .map((node, index) => ({
        index,
        node,
        text: getMessageText(node)
      }))
      .filter(m => m.text);

    list.innerHTML = "";

    messages.forEach((m, i) => {
      const row = document.createElement("label");
      Object.assign(row.style, {
        display: "block",
        padding: "6px",
        marginBottom: "6px",
        border: "1px solid #222",
        borderRadius: "8px",
        cursor: "pointer",
        background: "#111"
      });

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.dataset.idx = String(i);
      cb.style.marginRight = "8px";

      const num = document.createElement("span");
      num.textContent = `${i + 1}. `;
      num.style.fontWeight = "700";

      const preview = document.createElement("span");
      const short = m.text.replace(/\s+/g, " ").slice(0, 120);
      preview.textContent = short + (m.text.length > 120 ? "..." : "");

      row.appendChild(cb);
      row.appendChild(num);
      row.appendChild(preview);

      row.addEventListener("mouseenter", () => {
        m.node.style.outline = "2px solid cyan";
      });
      row.addEventListener("mouseleave", () => {
        m.node.style.outline = "";
      });

      list.appendChild(row);
    });

    status.textContent = `Found ${messages.length} messages`;
  }

  function getSelectedTexts() {
    const checked = [...list.querySelectorAll("input[type='checkbox']:checked")];
    return checked
      .map(cb => messages[Number(cb.dataset.idx)]?.text)
      .filter(Boolean);
  }

  function exportSelected() {
    output.value = getSelectedTexts().join("\n\n");
    status.textContent = `Exported ${getSelectedTexts().length} selected messages`;
  }

  function exportAll() {
    output.value = messages.map(m => m.text).join("\n\n");
    status.textContent = `Exported all ${messages.length} messages`;
  }

  function selectAll() {
    list.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = true);
    status.textContent = `Selected all ${messages.length} messages`;
  }

  function clearAll() {
    list.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = false);
    output.value = "";
    status.textContent = "Cleared selection";
  }

  function copyOutput() {
    output.select();
    document.execCommand("copy");
    status.textContent = "Copied output";
  }

  controls.appendChild(btn("Scan", refreshList));
  controls.appendChild(btn("Select All", selectAll));
  controls.appendChild(btn("Clear", clearAll));
  controls.appendChild(btn("Export Selected", exportSelected));
  controls.appendChild(btn("Export All", exportAll));
  controls.appendChild(btn("Copy", copyOutput));
  controls.appendChild(btn("Close", () => panel.remove()));

  panel.appendChild(title);
  panel.appendChild(controls);
  panel.appendChild(list);
  panel.appendChild(output);
  panel.appendChild(status);
  document.body.appendChild(panel);

  refreshList();
})();
