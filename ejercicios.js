let edad = parseInt(prompt('Ingrese su edad.'));
let salario = parseInt(prompt('Ingrese su monto salarial.'));

function tributo() {
  if (edad >= 16 && salario >= 1000) {
    console.log("Debe de tributar");
  }
  else
  {
    console.log("no cuenta con la edad o el salario para poder tributar");
  }
}

tributo();