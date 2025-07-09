/*async function gerarPDF() {
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
  }*/
//Raiz do Projeto
function gerarPDF() {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();
//Captação de dados do local do Paciente
const paciente = document.getElementById("patientName").value;
const idade = document.getElementById("patientAge").value;
const data = document.getElementById("evolutionDate").value;
const hora = document.getElementById("evolutionTime").value;
const leito = document.getElementById("patientBed").value;
const dih = document.getElementById("dih").value;
const ala = document.getElementById("alaPaciente").value;
//Parte de Avaliação Neurológica
const pupilas = document.getElementById("avaliacaoPupilar").value;
const reacaoPupilar = document.getElementById("reacaoPupilar").value;
const sedacao = document.getElementById("avaliacaoSedacao").value;
//Sinais Vitais
const frequenciaRespiratoria = document.getElementById("fr").value;
const saturacaoO2 = document.getElementById("saturacao").value;
const ritmoRespiratorio = document.getElementById("ritmoRespiratorio").value;
const avaliacaoVentilacao = document.getElementById("avaliacaoVentilacao").value;
const murmurioVesicularDireito = document.getElementById("murmurioVesicularDireito").value;
const murmurioVesicularEsquerdo = document.getElementById("murmurioVesicularEsquerdo").value;
const auscutaPulmonar = document.getElementById("auscutaPulmonar").value;
const avaliacaoTosse = document.getElementById("avaliacaoTosse").value;
const frequenciaCardiaca = document.getElementById("frequenciaCardiaca").value;
const pressaoArterial = document.getElementById("pressaoArterial").value;
const pulsoPeriferico = document.getElementById("pulsoPeriferico").value;
const perfusaoPeriferica = document.getElementById("perfusaoPeriferica").value;
const turgidezJugular = document.querySelector('input[name"turgidezJugular"]:checked').value;
const turgidezValor = turgidezJugular ? turgidezJugular.value : "Não informado!";
const avaliacaoEdema = document.getElementById("avaliacaoEdema").value;
const avaliacaoAlimentacao = document.getElementById("avaliacaoAlimentacao").value;
const avaliacaoDieta = document.getElementById("avaliacaoDieta").value;
const avaliacaoAbdomen = Array.from(document.querySelectorAll('input[name="avaliacaoAbdomen"]:checked')).map(cb => cb.value);
const ruidosIntestinais = document.getElementById("ruidosIntestinais").value;
//OBS: fazer calculo da Glasgow!!!!!

if (!paciente || !data || !hora) {
  alert("Preencha os campos obrigatórios: nome, data e hora.");
  return;
}

    const textoEvolucao = `
    Paciente em leito hospitalar, consciente, orientado, Glasgow 15, pupilas ${pupilas} e ${reacaoPupilar}, ${avaliacaoSedacao}. Apresenta FR = ${frequenciaRespiratoria} irpm, saturando ${saturacaoO2}% em ${avaliacaoVentilacao}, com padrão respiratório ${ritmoRespiratorio}. Murmúrios vesiculares: ${murmurioVesicularDireito} a direita e ${murmurioVesicularEsquerdo} a esquerda, ausculta pulmonar com aspecto ${auscutaPulmonar}, tosse ${avaliacaoTosse}. FC = ${frequenciaCardiaca} bpm, PA = ${pressaoArterial} mmHg, pulso periférico ${pulsoPeriferico} e perfusão periférica ${perfusaoPeriferica}. ${turgidezJugular} e ${avaliacaoEdema} em membros inferiores.
    Alimentação por ${avaliacaoAlimentacao}, ${avaliacaoDieta}. ${avaliacaoAbdomen}, ruídos hidroaéreos ${ruidosIntestinais}. Evacuação e diurese espontâneas, diurese preservada em 1.400 mL/24h, aspecto da urina amarelo claro e límpido. Glicemia capilar de 102 mg/dL e temperatura axilar de 36,7°C. Extremidades aquecidas, paciente corado, sem alterações dermatológicas aparentes. Braden = 18 (risco moderado de lesão por pressão). Ausência de dispositivos invasivos no momento.
    `.trim();

    const textoConduta = `
  Manter medidas de prevenção de lesão por pressão, reposicionamento a cada 2h, hidratação oral incentivada, controle glicêmico conforme prescrição médica e manutenção de dieta via oral. Seguir plano de cuidados conforme protocolo institucional.
    `.trim();

    let marginLeft = 20;
    let y = 20;
    let larguraTexto = 170;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Evolução de Enfermagem", marginLeft, y);

    y += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Paciente: ${paciente}`, marginLeft, y);
    doc.text(`Idade: ${idade}`, marginLeft + 100, y);
    doc.text(`Ala: ${ala}`, marginLeft + 140, y);

    y += 8;
    doc.text(`Data: ${data}`, marginLeft, y);
    doc.text(`Hora: ${hora}`, marginLeft + 50, y);
    doc.text(`Leito: ${leito}`, marginLeft + 100, y);
    doc.text(`DIH: ${dih}`, marginLeft + 140, y);

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Evolução:", marginLeft, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    let linhasEvolucao = doc.splitTextToSize(textoEvolucao, larguraTexto);
    doc.text(linhasEvolucao, marginLeft, y);

    y += linhasEvolucao.length * 7 + 5;
    doc.setFont("helvetica", "bold");
    doc.text("Conduta de Enfermagem:", marginLeft, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    let linhasConduta = doc.splitTextToSize(textoConduta, larguraTexto);
    doc.text(linhasConduta, marginLeft, y);

    doc.save("evolucao-enfermagem.pdf");
  }