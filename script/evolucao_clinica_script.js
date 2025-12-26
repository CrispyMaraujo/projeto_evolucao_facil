      //Raiz do Projeto
      function gerarPDF() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const marginLeft = 20;
      const larguraTexto = 170;
      let y = 20;

      //Função auxiliar para capturar valores de inputs
      const getValue = (id) => document.getElementById(id)?.value || '';
      const getRadioValue = (name, fallback = 'Não avaliado') => {
      const selected = document.querySelector(`input[name="${name}"]:checked`);
      return selected ? selected.value : fallback;
      };
      const getCheckboxValues = (name) => {
      return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
      };

      //Captação de dados do local do Paciente
      const dadosPaciente = {
      paciente: getValue("patientName"),
      idade: getValue("patientAge"),
      data: getValue("evolutionDate"),
      hora: getValue("evolutionTime"),
      leito: getValue("patientBed"),
      dih: getValue("dih"),
      ala: getValue("alaPaciente")
      }
            //Seção do Calculo de ECG:
      //Captação:
      const ocular = parseInt(document.getElementById("ocular").value);
      const verbal = parseInt(document.getElementById("verbal").value);
      const motora = parseInt(document.getElementById("motora").value);
      const reatividadePupilar = parseInt(document.getElementById("reatividadePupilar").value);

      //Cálculo:
      const escalaDeComaDeGlasgow = ocular + verbal + motora - reatividadePupilar;

      //Validação:
      if (isNaN(ocular) || isNaN(verbal) || isNaN(motora) || isNaN(reatividadePupilar)) {
            alert("Por favor, preecha todos os campos da Escala de Coma de Glasgow!");
            return;
      }

            //Seção de campos do texto
      const campos = {
            //Seção de Avaliação Neurológica:
      pupilas: getValue("avaliacaoPupilar"),
      reacaoPupilar: getValue("reacaoPupilar"),
      sedacao: getValue("avaliacaoSedacao"),
            //Seção de Sinais Vitais:
      frequenciaRespiratoria: getValue("frequenciaRespiratoria"),
      saturacaoO2: getValue("saturacao"),
      ritmoRespiratorio: getValue("ritmoRespiratorio"),
      frequenciaCardiaca: getValue("frequenciaCardiaca"),
      pressaoArterial: getValue("pressaoArterial"),
      pulsoPeriferico: getValue("pulsoPeriferico"),
      perfusaoPeriferica: getValue("perfusaoPeriferica"),
      glicemia: getValue("glicemia"),
      temperatura: getValue("temperatura"),
            //Seção de Avaliação Cardíaca:
      turgidezJugular: getRadioValue("turgidezJugular"),
      avaliacaoEdema: getValue("avaliacaoEdema"),
            //Seção de Avaliação Pulmonar:
      avaliacaoVentilacao: getValue("avaliacaoVentilacao"),
      murmurioVesicularDireito: getValue("murmurioVesicularDireito"),
      murmurioVesicularEsquerdo: getValue("murmurioVesicularEsquerdo"),
      auscutaPulmonar: getValue("auscutaPulmonar"),
      avaliacaoTosse: getValue("avaliacaoTosse"),
            //Seção de Avaliação Dietética:
      avaliacaoAlimentacao: getValue("avaliacaoAlimentacao"),
      avaliacaoDieta: getValue("avaliacaoDieta"),
            //Seção de Avaliação Abdominal:
      avaliacaoAbdomen: getCheckboxValues("avaliacaoAbdomen"),
      ruidosIntestinais: getValue("ruidosIntestinais"),
      incisaoCirurgica: getRadioValue("incisaoCirurgica"),
      incisaoCirurgicaDescricao: getValue("incisaoCirurgicaDescricao"),
      evacuacao: getRadioValue("evacuacao"),
            //Seção de Avaliação de Diurese:
      eliminacoesDiurese: getValue("eliminacaoDiurese"),
      tempoDialise: getValue("tempoDialise"),
      quantidaDeDiurese: getValue("quantidadeDeDiurese"),
      aspectoUrina: getValue("aspectoUrina"),
            //Seção de Avaliação Dermatológica:
      extremidade: getRadioValue("extremidade"),
      cor: getRadioValue("cor"),
      escalaDeBranden: getValue("escalaDeBranden"),
      risco: getCheckboxValues("risco"),
      condutaAdotada: getValue("condutaAdotada"),
      tipoDeFerida: getValue("tipoDeFerida"),
      localLesao: getValue("localLesao"),
      aspectoFerida: getValue("aspectoFerida"),
      materiaisUtilizados: getValue("materiaisUtilizados"),
      graulpp: getValue("graulpp")
      }

      if (!campos || !dadosPaciente) {
      alert("Por favor, selecione uma opção válida. TODOS OS CAMPOS SÃO OBRIGATÓRIOS!");
      return;
      }
      const textoEvolucao = `
      Paciente em leito hospitalar, consciente, orientado, Glasgow ${escalaDeComaDeGlasgow}, pupilas ${campos.pupilas} e ${campos.reacaoPupilar}, ${campos.sedacao}. Apresenta FR = ${campos.frequenciaRespiratoria} irpm, saturando ${campos.saturacaoO2}% em ${campos.avaliacaoVentilacao}, com padrão respiratório ${campos.ritmoRespiratorio}. Murmúrios vesiculares: ${campos.murmurioVesicularDireito} a direita e ${campos.murmurioVesicularEsquerdo} a esquerda, ausculta pulmonar com aspecto ${campos.auscutaPulmonar}, tosse ${campos.avaliacaoTosse}. FC = ${campos.frequenciaCardiaca} bpm, PA = ${campos.pressaoArterial} mmHg, pulso periférico ${campos.pulsoPeriferico} e perfusão periférica ${campos.perfusaoPeriferica}. ${campos.turgidezJugular} e ${campos.avaliacaoEdema} em membros inferiores.
      Alimentação por ${campos.avaliacaoAlimentacao}, ${campos.avaliacaoDieta}. Abdomên ${campos.avaliacaoAbdomen}, ruídos hidroaéreos ${campos.ruidosIntestinais}, ${campos.incisaoCirurgica + campos.incisaoCirurgicaDescricao}. Evacuação ${campos.evacuacao}, diurese ${campos.eliminacoesDiurese + campos.tempoDialise}: ${campos.quantidaDeDiurese} mL/24h, aspecto da urina ${campos.aspectoUrina}. Glicemia capilar de ${campos.glicemia} mg/dL e temperatura axilar de ${campos.temperatura}°C. Extremidades ${campos.extremidade}, paciente ${campos.cor}. Braden = ${campos.escalaDeBranden}. Apresenta risco de ${campos.risco}. ${campos.tipoDeFerida} ${campos.graulpp} ${campos.aspectoFerida}. Materiais Utilizados: ${campos.materiaisUtilizados}.
      `.trim();

      const textoConduta = `
      ${campos.condutaAdotada}
      `.trim();

                  //Seção de criação do PDF:

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Evolução de Enfermagem", marginLeft, y);

      y += 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Paciente: ${dadosPaciente.paciente}`, marginLeft, y);
      doc.text(`Idade: ${dadosPaciente.idade}`, marginLeft + 100, y);
      doc.text(`Ala: ${dadosPaciente.ala}`, marginLeft + 140, y);

      y += 8;
      doc.text(`Data: ${dadosPaciente.data}`, marginLeft, y);
      doc.text(`Hora: ${dadosPaciente.hora}`, marginLeft + 50, y);
      doc.text(`Leito: ${dadosPaciente.leito}`, marginLeft + 100, y);
      doc.text(`DIH: ${dadosPaciente.dih}`, marginLeft + 140, y);

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
      //Seção Botão de Visualizar:

      document.getElementById("btnVisualizar").addEventListener("click", function(visualizarPDF) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const marginLeft = 20;
      const larguraTexto = 170;
      let y = 20;

      //Função auxiliar para capturar valores de inputs
      const getValue = (id) => document.getElementById(id)?.value || '';
      const getRadioValue = (name, fallback = 'Não avaliado') => {
      const selected = document.querySelector(`input[name="${name}"]:checked`);
      return selected ? selected.value : fallback;
      };
      const getCheckboxValues = (name) => {
      return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
      };

      //Captação de dados do local do Paciente
      const dadosPaciente = {
      paciente: getValue("patientName"),
      idade: getValue("patientAge"),
      data: getValue("evolutionDate"),
      hora: getValue("evolutionTime"),
      leito: getValue("patientBed"),
      dih: getValue("dih"),
      ala: getValue("alaPaciente")
      }
            //Seção do Calculo de ECG:
      //Captação:
      const ocular = parseInt(document.getElementById("ocular").value);
      const verbal = parseInt(document.getElementById("verbal").value);
      const motora = parseInt(document.getElementById("motora").value);
      const reatividadePupilar = parseInt(document.getElementById("reatividadePupilar").value);

      //Cálculo:
      const escalaDeComaDeGlasgow = ocular + verbal + motora - reatividadePupilar;

      //Validação:
      if (isNaN(ocular) || isNaN(verbal) || isNaN(motora) || isNaN(reatividadePupilar)) {
            alert("Por favor, preecha todos os campos da Escala de Coma de Glasgow!");
            return;
      }

            //Seção de campos do texto
      const campos = {
            //Seção de Avaliação Neurológica:
      pupilas: getValue("avaliacaoPupilar"),
      reacaoPupilar: getValue("reacaoPupilar"),
      sedacao: getValue("avaliacaoSedacao"),
            //Seção de Sinais Vitais:
      frequenciaRespiratoria: getValue("frequenciaRespiratoria"),
      saturacaoO2: getValue("saturacao"),
      ritmoRespiratorio: getValue("ritmoRespiratorio"),
      frequenciaCardiaca: getValue("frequenciaCardiaca"),
      pressaoArterial: getValue("pressaoArterial"),
      pulsoPeriferico: getValue("pulsoPeriferico"),
      perfusaoPeriferica: getValue("perfusaoPeriferica"),
      glicemia: getValue("glicemia"),
      temperatura: getValue("temperatura"),
            //Seção de Avaliação Cardíaca:
      turgidezJugular: getRadioValue("turgidezJugular"),
      avaliacaoEdema: getValue("avaliacaoEdema"),
            //Seção de Avaliação Pulmonar:
      avaliacaoVentilacao: getValue("avaliacaoVentilacao"),
      murmurioVesicularDireito: getValue("murmurioVesicularDireito"),
      murmurioVesicularEsquerdo: getValue("murmurioVesicularEsquerdo"),
      auscutaPulmonar: getValue("auscutaPulmonar"),
      avaliacaoTosse: getValue("avaliacaoTosse"),
            //Seção de Avaliação Dietética:
      avaliacaoAlimentacao: getValue("avaliacaoAlimentacao"),
      avaliacaoDieta: getValue("avaliacaoDieta"),
            //Seção de Avaliação Abdominal:
      avaliacaoAbdomen: getCheckboxValues("avaliacaoAbdomen"),
      ruidosIntestinais: getValue("ruidosIntestinais"),
      incisaoCirurgica: getRadioValue("incisaoCirurgica"),
      incisaoCirurgicaDescricao: getValue("incisaoCirurgicaDescricao"),
      evacuacao: getRadioValue("evacuacao"),
            //Seção de Avaliação de Diurese:
      eliminacoesDiurese: getValue("eliminacaoDiurese"),
      tempoDialise: getValue("tempoDialise"),
      quantidaDeDiurese: getValue("quantidadeDeDiurese"),
      aspectoUrina: getValue("aspectoUrina"),
            //Seção de Avaliação Dermatológica:
      extremidade: getRadioValue("extremidade"),
      cor: getRadioValue("cor"),
      escalaDeBranden: getValue("escalaDeBranden"),
      risco: getCheckboxValues("risco"),
      condutaAdotada: getValue("condutaAdotada"),
      tipoDeFerida: getValue("tipoDeFerida"),
      localLesao: getValue("localLesao"),
      aspectoFerida: getValue("aspectoFerida"),
      materiaisUtilizados: getValue("materiaisUtilizados"),
      graulpp: getValue("graulpp")
      }

      if (!campos || !dadosPaciente) {
      alert("Por favor, selecione uma opção válida. TODOS OS CAMPOS SÃO OBRIGATÓRIOS!");
      return;
      }
      const textoEvolucao = `
      Paciente em leito hospitalar, consciente, orientado, Glasgow ${escalaDeComaDeGlasgow}, pupilas ${campos.pupilas} e ${campos.reacaoPupilar}, ${campos.sedacao}. Apresenta FR = ${campos.frequenciaRespiratoria} irpm, saturando ${campos.saturacaoO2}% em ${campos.avaliacaoVentilacao}, com padrão respiratório ${campos.ritmoRespiratorio}. Murmúrios vesiculares: ${campos.murmurioVesicularDireito} a direita e ${campos.murmurioVesicularEsquerdo} a esquerda, ausculta pulmonar com aspecto ${campos.auscutaPulmonar}, tosse ${campos.avaliacaoTosse}. FC = ${campos.frequenciaCardiaca} bpm, PA = ${campos.pressaoArterial} mmHg, pulso periférico ${campos.pulsoPeriferico} e perfusão periférica ${campos.perfusaoPeriferica}. ${campos.turgidezJugular} e ${campos.avaliacaoEdema} em membros inferiores.
      Alimentação por ${campos.avaliacaoAlimentacao}, ${campos.avaliacaoDieta}. Abdomên ${campos.avaliacaoAbdomen}, ruídos hidroaéreos ${campos.ruidosIntestinais}, ${campos.incisaoCirurgica + campos.incisaoCirurgicaDescricao}. Evacuação ${campos.evacuacao}, diurese ${campos.eliminacoesDiurese + campos.tempoDialise}: ${campos.quantidaDeDiurese} mL/24h, aspecto da urina ${campos.aspectoUrina}. Glicemia capilar de ${campos.glicemia} mg/dL e temperatura axilar de ${campos.temperatura}°C. Extremidades ${campos.extremidade}, paciente ${campos.cor}. Braden = ${campos.escalaDeBranden}. Apresenta risco de ${campos.risco}. ${campos.tipoDeFerida} ${campos.graulpp} ${campos.aspectoFerida}. Materiais Utilizados: ${campos.materiaisUtilizados}.
      `.trim();

      const textoConduta = `
      ${campos.condutaAdotada}
      `.trim();

                  //Seção de criação do PDF:

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Evolução de Enfermagem", marginLeft, y);

      y += 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Paciente: ${dadosPaciente.paciente}`, marginLeft, y);
      doc.text(`Idade: ${dadosPaciente.idade}`, marginLeft + 100, y);
      doc.text(`Ala: ${dadosPaciente.ala}`, marginLeft + 140, y);

      y += 8;
      doc.text(`Data: ${dadosPaciente.data}`, marginLeft, y);
      doc.text(`Hora: ${dadosPaciente.hora}`, marginLeft + 50, y);
      doc.text(`Leito: ${dadosPaciente.leito}`, marginLeft + 100, y);
      doc.text(`DIH: ${dadosPaciente.dih}`, marginLeft + 140, y);

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

      window.open(doc.output("bloburl"));
      });

      //Seção Lesão Por Pressão:
      //Captação:
      document.addEventListener("DOMContentLoaded", function() {
            const selectFerida = document.getElementById("haferida");
            const FeridaAparecer = document.getElementById("FeridaAparecer");
            //Validação:
            selectFerida.addEventListener("change", function(){
            if (selectFerida.value === "Sim") {
                  FeridaAparecer.style.display = "block";
            } else {
                  FeridaAparecer.style.display = "none";
            }
            });
      });
      document.addEventListener("DOMContentLoaded", function() {
            const tipoDeFerida = document.getElementById("tipoDeFerida");
            const extensaolpp = document.getElementById("extensaolpp");
            //Validação:
            tipoDeFerida.addEventListener("change", function(){
            if (tipoDeFerida.value === "Presença de lesão por pressão") {
                  extensaolpp.style.display = "block";
            } else {
                  extensaolpp.style.display = "none";
            }
            });
      });

      //Seção de captação da div (aparecer e desaparecer) Escala de Coma de Glasgow:
            document.addEventListener("DOMContentLoaded", function() {
            const escaladeECG = document.getElementById("escaladeComadeGlasgow");
            const divEscalaGlasgow = document.getElementById("divEscalaGlasgow");
            //Validação:
            escaladeECG.addEventListener("change", function(){
            if (escaladeECG.value === "avaliar") {
                  divEscalaGlasgow.style.display = "block";
            } else {
                  divEscalaGlasgow.style.display = "none";
            }
            });
      });