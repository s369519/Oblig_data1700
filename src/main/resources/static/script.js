
let bill = null;

function getBillett(){
    $.get("http://localhost:8080/billett", function (data){
        console.log(data)
        bill = {
            film: data.film,
            antall: data.antall,
            fornavn: data.fornavn,
            etternavn: data.etternavn,
            telefonnr: data.telefonnr,
            epost: data.epost
        }

        document.getElementById("bill1").innerHTML = "<p>" + bill.film + "</p>"
            + "<p>" + bill.antall + "</p>"
            + "<p>" + bill.fornavn + "</p>"
            + "<p>" + bill.etternavn + "</p>"
            + "<p>" + bill.telefonnr + "</p>"
            + "<p>" + bill.epost + "</p>"

    })
}

function getListOfBillett() {
    $.get("http://localhost:8080/getBillett", function (data) {
        let dynamicHTML = "<ul>";
        data.forEach(function (bill) {
            dynamicHTML += "<li>" + bill.film + " " + bill.antall + " " + bill.fornavn + " " + bill.etternavn +
                " " + bill.telefonnr + " " + bill.epost + " " +
                "<button onclick='slettBillett(" + bill.id + ")' class='rodKnapp'>Slett billett</button>" + "</li>";
        });
        dynamicHTML += "</ul>";
        document.getElementById("billetter").innerHTML = dynamicHTML;
    });
}

function validering() {
    let film = document.getElementById("film").value;
    let antall = document.getElementById("antall").value;
    let fornavn = document.getElementById("fornavn").value;
    let etternavn = document.getElementById("etternavn").value;
    let telefonnr = document.getElementById("telefonnr").value;
    let epost = document.getElementById("epost").value;

    let feilFilm = document.getElementById("feilFilm");
    let feilAntall = document.getElementById("feilAntall");
    let feilFornavn = document.getElementById("feilFornavn");
    let feilEtternavn = document.getElementById("feilEtternavn");
    let feilTelefonnr = document.getElementById("feilTelefonnr");
    let feilEpost = document.getElementById("feilEpost");

    // Tilbakestiller feilmeldingene
    feilFilm.innerHTML = "";
    feilAntall.innerHTML = "";
    feilFornavn.innerHTML = "";
    feilEtternavn.innerHTML = "";
    feilTelefonnr.innerHTML = "";
    feilEpost.innerHTML = "";

    // Validering film
    if (film === "Velg film her" || film === "") {
        feilFilm.innerHTML = "Du må velge en film!";
    }

    // Validering antall
    if (isNaN(Number(antall)) || !(1 <= Number(antall) && Number(antall) <= 50) || antall === "") {
        feilAntall.innerHTML = "Antallet må være mellom 1 og 50!";
    }

    // Validering fornavn
    if (fornavn === "" || /\d/.test(fornavn)) {
        feilFornavn.innerHTML = "Fornavn må fylles ut og være bokstaver!";
    }

    // Validering etternavn
    if (etternavn === "" || /\d/.test(etternavn)) {
        feilEtternavn.innerHTML = "Etternavn må fylles ut og være bokstaver!";
    }

    // Validering telefonnummer
    let tlfResultat = validerTelefonnr(telefonnr);
    if (!tlfResultat) {
        feilTelefonnr.innerHTML = "Ugyldig telefonnummer!";
    }

    // Validering epost
    let epostResultat = validerEpost(epost);
    if (!epostResultat) {
        feilEpost.innerHTML = "Ugyldig epostadresse!";
    }

    // Stopper ved ugyldige inputverdier samt gjør at flere feilmeldinger vises samtidig.
    if (feilFilm.innerHTML || feilAntall.innerHTML || feilFornavn.innerHTML || feilEtternavn.innerHTML || feilTelefonnr.innerHTML || feilEpost.innerHTML) {
        return;
    }

    else {
        sendBillettFromInput();
    }
}


// Validering telefonnummer
function validerTelefonnr(telefonnr) {
    // Regex for å validere telefonnummeret
    let telefonnrRegex = /^((0047)?|(\+47)?)[4|9]\d{7}$/;

    // Test om telefonnummeret passer til regexen
    return telefonnrRegex.test(telefonnr);

}


// Validering epost
function validerEpost(epost) {
    // Regex for å validere telefonnummeret
    let epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test om telefonnummeret passer til regexen
    return epostRegex.test(epost);
}




function sendBillettFromInput(){
    billett ={
        "film": document.getElementById("film").value,
        "antall": document.getElementById("antall").value,
        "fornavn": document.getElementById("fornavn").value,
        "etternavn": document.getElementById("etternavn").value,
        "telefonnr": document.getElementById("telefonnr").value,
        "epost": document.getElementById("epost").value
    }
    $.post("http://localhost:8080/insertBillettTilDB", billett, function (data){})
}

//Sletter billetter basert på id i DB
function slettBillett(id) {
    $.ajax({
        url: 'http://localhost:8080/slettBillett?id=' + id,
        type: 'DELETE',
        success: function () {
            // Når billetten er slettet, oppdater listen automatisk
            getListOfBillett();
        },
        error: function () {
            alert('Feil ved sletting av billett');
        }
    });
}








