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
const turgidezSelected = document.querySelector('input[type="radio"][name="turgidezJugular"]:checked');
const turgidezJugular = turgidezSelected ? turgidezSelected.value : 'Turgidez não avaliada';
const avaliacaoEdema = document.getElementById("avaliacaoEdema").value;
const avaliacaoAlimentacao = document.getElementById("avaliacaoAlimentacao").value;
const avaliacaoDieta = document.getElementById("avaliacaoDieta").value;
let avaliacaoAbdomen = [];
document.querySelectorAll('input[type="checkbox"][name="avaliacaoAbdomen"]:checked').forEach(el => avaliacaoAbdomen.push(el.value));
const ruidosIntestinais = document.getElementById("ruidosIntestinais").value;
const incisaoSelected = document.querySelector('input[type="radio"][name="incisaoCirurgica"]:checked');
const incisaoCirurgica = incisaoSelected ? incisaoSelected.value : 'incisão cirúrgica não avaliada/encontrada';
const incisaoCirurgicaDescricao = document.getElementById("incisaoCirurgicaDescricao").value;
const evacuacaoSelected = document.querySelector('input[type="radio"][name="evacuacao"]:checked');
const evacuacao = evacuacaoSelected ? evacuacaoSelected.value : 'não avaliada/encontrada';
const eliminacoesDiurese = document.getElementById("eliminacoesDiurese").value;
const tempoDialise = document.getElementById("tempoDialise").value;
const quantidaDeDiurese = document.getElementById("quantidaDeDiurese").value;
const aspectoUrina = document.getElementById("aspectoUrina").value;
const glicemia = document.getElementById("glicemia").value;
const temperatura = document.getElementById("temperatura").value;
const extremidadeSelected = document.querySelector('input[type="radio"][name="extremidade"]:checked');
const extremidade = extremidadeSelected ? extremidadeSelected.value : 'não avaliada/encontrada';
const corSelected = document.querySelector('input[type="radio"][name="cor"]:checked');
const cor = corSelected ? corSelected.value : 'não avaliada/encontrada';
const escalaDeBranden = document.getElementById("escalaDeBranden").value;
let risco = [];
document.querySelectorAll('input[type="checkbox"][name="risco"]:checked').forEach(el => risco.push(el.value));
const condutaAdotada = document.getElementById("condutaAdotada").value;
//OBS: fazer calculo da Glasgow!!!!!
if (!pupilas || !reacaoPupilar || !sedacao || !ritmoRespiratorio || !avaliacaoVentilacao || !murmurioVesicularDireito || !murmurioVesicularEsquerdo || !auscutaPulmonar || !avaliacaoTosse || !pulsoPeriferico || !perfusaoPeriferica || !turgidezSelected || !avaliacaoEdema || !avaliacaoAlimentacao || !avaliacaoAbdomen || !ruidosIntestinais || !avaliacaoDieta || !incisaoSelected || !evacuacaoSelected || !eliminacoesDiurese || !extremidadeSelected || !corSelected || !escalaDeBranden || !risco) {
  alert("Por favor, selecione uma opção válida.");
  return;
}
    const textoEvolucao = `
    Paciente em leito hospitalar, consciente, orientado, Glasgow 15, pupilas ${pupilas} e ${reacaoPupilar}, ${sedacao}. Apresenta FR = ${frequenciaRespiratoria} irpm, saturando ${saturacaoO2}% em ${avaliacaoVentilacao}, com padrão respiratório ${ritmoRespiratorio}. Murmúrios vesiculares: ${murmurioVesicularDireito} a direita e ${murmurioVesicularEsquerdo} a esquerda, ausculta pulmonar com aspecto ${auscutaPulmonar}, tosse ${avaliacaoTosse}. FC = ${frequenciaCardiaca} bpm, PA = ${pressaoArterial} mmHg, pulso periférico ${pulsoPeriferico} e perfusão periférica ${perfusaoPeriferica}. ${turgidezJugular} e ${avaliacaoEdema} em membros inferiores.
    Alimentação por ${avaliacaoAlimentacao}, ${avaliacaoDieta}. Abdomên ${avaliacaoAbdomen}, ruídos hidroaéreos ${ruidosIntestinais}, ${incisaoCirurgica + incisaoCirurgicaDescricao}. Evacuação ${evacuacao}, diurese ${eliminacoesDiurese + tempoDialise} em ${quantidaDeDiurese} mL/24h, aspecto da urina ${aspectoUrina}. Glicemia capilar de ${glicemia} mg/dL e temperatura axilar de ${temperatura}°C. Extremidades ${extremidade}, paciente ${cor}. Braden = ${escalaDeBranden}. Apresenta risco de ${risco}.
    `.trim();

    const textoConduta = `
  ${condutaAdotada}
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