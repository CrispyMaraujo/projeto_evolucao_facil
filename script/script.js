async function gerarPDF() {
const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let marginLeft = 15;
    let y = 20;
    const linhaEspaco = 8;
    function novaLinha(espaco = linhaEspaco) {
    y += espaco;
    if (y >= 280) { // quando se aproxima do final da página
        doc.addPage();
        y = 20;
    }
    }

    // --- Título ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Evolução Clínica do Paciente", 105, y, { align: "justify" });
    y += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    // --- Dados principais ---
    const dadosPrincipais = [
      [`Nome`, document.getElementById("patientName").value],
      [`Idade`, document.getElementById("patientAge").value],
      [`Data`, document.getElementById("evolutionDate").value],
      [`Hora`, document.getElementById("evolutionTime").value],
      [`Leito`, document.getElementById("patientBed").value],
      [`DIH`, document.getElementById("dih").value]
    ];

    dadosPrincipais.forEach(([rotulo, valor]) => {
      doc.text(`${rotulo}: ${valor}`, marginLeft, y);
      novaLinha(); //y += linhaEspaco;
    });

    y += 5;

    function adicionarSecao(titulo, dados) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 128);
      doc.text(titulo, marginLeft, y);
      y += linhaEspaco;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      dados.forEach(([rotulo, valor]) => {
        doc.text(`${rotulo}: ${valor}`, marginLeft + 5, y);
        y += linhaEspaco;
      });

      y += 5;
    }

    // --- Neurológico ---
    adicionarSecao("Sistema Neurológico", [
      ["Pupilas", document.getElementById("avaliacaoPupilar").value],
      ["Reação Pupilar", document.getElementById("reacaoPupilar").value],
      ["Sedação", document.getElementById("avaliacaoSedacao").value],
    ]);

    // --- Respiratório ---
    adicionarSecao("Sistema Respiratório", [
      ["FR", document.getElementById("fr").value],
      ["Saturação", document.getElementById("saturacao").value],
      ["Ventilação", document.getElementById("avaliacaoVentilacao").value],
      ["MV Direito", document.getElementById("murmurioVesicularDireito").value],
      ["MV Esquerdo", document.getElementById("murmurioVesicularEsquedo").value],
      ["Ausculta", document.getElementById("auscutaPulmonar").value],
      ["Tosse", document.getElementById("avaliacaoTosse").value],
    ]);

    // --- Cardiovascular ---
    const turgidez = document.querySelector('input[name="turgidezjugular"]:checked');
    adicionarSecao("Sistema Cardiovascular", [
      ["FC", document.getElementById("frequenciaCardiaca").value],
      ["PA", document.getElementById("pressaoArterial").value],
      ["Pulso Periférico", document.getElementById("pulsoPeriferico").value],
      ["Perfusão Periférica", document.getElementById("perfusaoPeriferica").value],
      ["Turgidez Jugular", turgidez ? (turgidez.id.includes("Presente") ? "Presente" : "Ausente") : "—"],
      ["Edema", document.getElementById("avaliacaoEdema").value],
    ]);

    // --- Gastrointestinal ---
    let abdomen = [];
    document.querySelectorAll('input[type="checkbox"][value^="abdomen"]:checked').forEach(el => abdomen.push(el.value));
    const incisao = document.querySelector('input[name="incisaocirurgica"]:checked');

    adicionarSecao("Sistema Gastrointestinal", [
      ["Alimentação", document.getElementById("avaliacaoAlimentação").value],
      ["Abdome", abdomen.join(", ") || "—"],
      ["Ruidos Intestinais", document.getElementById("ruidosIntestinais").value],
      ["Dieta", document.getElementById("avaliacaoDieta").value],
      ["Incisão Cirúrgica", incisao ? (incisao.id.includes("Presente") ? "Presente" : "Ausente") : "—"],
      ["Descrição Incisão", document.getElementById("incisaoCirurgicaDescricao").value],
      ["Evacuação", document.getElementById("evacuacao").value],
      ["Diurese", document.getElementById("diurese").value],
    ]);

    // --- Renal ---
    adicionarSecao("Sistema Renal", [
      ["Eliminações", document.getElementById("eliminacoesDiurese").value],
      ["Tempo de Diálise", document.getElementById("tempoDialise").value],
      ["Quantidade de Diurese", document.getElementById("quantidaDeDiurese").value],
      ["Aspecto da Urina", document.getElementById("aspectoUrina").value],
    ]);

    // --- Endócrino / Tegumentar ---
    adicionarSecao("Sistema Tegumentar / Endócrino", [
      ["Glicemia Capilar", document.getElementById("glicemia").value],
      ["Temperatura", document.getElementById("temperatura").value],
    ]);

    // --- Rodapé com data/hora ---
    const now = new Date();
    const dataHora = now.toLocaleString();
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Gerado em: ${dataHora}`, marginLeft, 290);

    // Salvar
    const nomeArquivo = `Evolucao_${document.getElementById("patientName").value || "Paciente"}.pdf`;
    doc.save(nomeArquivo);
  }