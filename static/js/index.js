
var idatual = 0;
var modalCadastro;
var modalAlerta;

window.onload = function(e) {
   listar();
}

function listar() {
   
    var tab = document.getElementById("tabela");
    for (var i=tab.rows.length -1; i>0; i--) {
        tab.deleteRow(i);
    }

    fetch("http://localhost:8080/CadastroVeiculo/VeiculoServlet", {method: "GET"})
    .then(response => response.json())
    .then(data => {
         for (const item of data) {
             var tab = document.getElementById("tabela");
             var row = tab.insertRow(-1);
             row.insertCell(-1).innerHTML = item.idveiculo;
             row.insertCell(-1).innerHTML = item.modelo;
             row.insertCell(-1).innerHTML = item.placa;
             row.insertCell(-1).innerHTML = item.cor;
             row.insertCell(-1).innerHTML = item.direcao;
              row.insertCell(-1).innerHTML = item.ano;
             row.insertCell(-1).innerHTML = "<button type='button' class='btn btn-primary' "
             + "onclick='alterar("+item.idveiculo+")'> "
             + "<i class'bi bi-pencil'></i></button>"
             + "<button type='button' class='btn btn-danger' "
             + "onclick='excluir("+item.idveiculo+")'> "
             + "<i class'bi bi-trash'></i></button>";
          }
         })
         .catch(error => console.log("Erro", error));

    }




function novo() {

    idatual = 0;
    document.getElementById("txtModelo").value = "";
    document.getElementById("txtPlaca").value = "";
    document.getElementById("txtCor").value = "";
    document.getElementById("txtDirecao").value = "";
    document.getElementById("txtAno").value = "";
  
     modalCadastro = new bootstrap.Modal(document.getElementById("modalCadastro"));
     modalCadastro.show();

}

function alterar(id) {
    idatual = id;

    fetch("http://localhost:8080/CadastroVeiculo/VeiculoServlet/"+idatual,{method: "GET"})
    .then(response => response.json())
    .then(data => {

        document.getElementById("txtModelo").value = data.modelo;
        document.getElementById("txtPlaca").value = data.placa;
        document.getElementById("txtCor").value = data.cor;
        document.getElementById("txtDirecao").value = data.direcao;
        document.getElementById("txtAno").value = data.ano;
        modalCadastro = new bootstrap.Modal(document.getElementById("modalCadastro"));
        modalCadastro.show();
         
         })
         .catch(error => console.log("Erro", error));

    


}


function excluir(id) {
idatual = id;
document.getElementById("modalAlertaBody").style.backgroundColor = "FFFFFF";
document.getElementById("modalAlertaBody").innerHTML = "<h5>Confirma a exclusão do registro? </h5>"
+'<button type="button" class="btn btn-primary" onclick="excluirSim()">Sim</button>'
+'<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>';
modalAlerta = new bootstrap.Modal(document.getElementById("modalAlerta"));
modalAlerta.show();

}

function excluirSim() {
    fetch("http://localhost:8080/CadastroVeiculo/VeiculoServlet", + idatual, {method: "DELETE"})
    .then(response => response.json())
    .then(result => {
        modalAlerta.hide();
        listar();
        if (result.success) {
            mostrarAlerta("Registro excluído com sucesso!", true);

        }else {
            mostrarAlerta("Falha ao excluir registro!", false);
        }

         })
         .catch(error => console.log("Erro", error));

    


}

function salvar() {
    var v = {
        idveiculo: idatual,
        modelo: document.getElementById("txtModelo").value,
        placa: document.getElementById("txtPlaca").value,
        cor: document.getElementById("txtCor").value,
        direcao: document.getElementById("txtDirecao").value,
        ano: document.getElementById("txtAno").value,

    };


    var json = JSON.stringify(v);

    var url;
    var metodo;
    if (idatual==0) {
        url = "http://localhost:8080/CadastroVeiculo/VeiculoServlet";
        metodo = "POST";
    } else {
        url = "http://localhost:8080/CadastroVeiculo/VeiculoServlet/" + idatual;
        metodo = "PUT";
    }
    fetch(url, {method: metodo, body: json})
    .then(response => response.json())
    .then(result => {
        alert(result.message);
        if (result.success) {
            mostrarAlerta(result.message, true);
        modalCadastro.hide();
        listar();
        } else {
            mostrarAlerta(result.message, false);
        }

    })

}

function mostrarAlerta(msg, sucess) {
    if (success) {
        document.getElementById("modalAlertaBody").style.backgroundColor = "#E0F2F1";

    } else {
        document.getElementById("modalAlertaBody").style.backgroundColor = "#FFEBEE";
    }
    document.getElementById("modalAlertaBody").innerHTML = msg;
    modalAlerta = new bootstrap.Modal(document.getElementById("modalAlerta"));
    modalAlerta.show();
    window.setTimeout(function(){
        modalAlerta.hide();
    }, 3000);

}