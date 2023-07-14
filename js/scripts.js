class Validator {

    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length',
        ];
    }

    //iniciar a validação de todos os campos
    validate(form) {

        //resgata todas as validações
        let currentValidations = document.querySelectorAll("form .error-validation");
        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        //pegar os inputs
        let inputs = form.getElementsByTagName("input");
        
        //transformo uma HTMLCollection -> array
        let inputsArray = [...inputs];

        //loops nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {
            //loop em todas as validações existentes
            for (let i = 0; this.validations.length > i; i++) {
                //verifica se a validação atual existe no input
                if (input.getAttribute(this.validations[i]) !=null) {
                    
                    //limpando a string para virar um método
                    //data-min-length -> minlength
                    let method = this.validations[i].replace('data-', '').replace('-','');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invoca o método
                    this[method](input, value);
                }
            }

        }, this);
    };

    //verifica se um input tem um número mínimo de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);           
        }    
    };

    //verifica se um input passou do limite de caracteres
    maxlength(input, maxValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${maxValue} caracteres`;

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    };

    //método para imprimir mensagens de erro na tela
    printMessage(input, msg) {
        let template = document.querySelector(".error-validation").cloneNode(true);
        template.textContent = msg;

        let inputParent = input.parentNode;
        template.classList.remove("template");

        inputParent.appendChild(template);
    }

    //limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}


let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

//evento que dispara as validações
submit.addEventListener("click", function(e) {

    e.preventDefault();

    validator.validate(form);
});