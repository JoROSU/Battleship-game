
// class Table
var Tabla = function () {
    this.kolona = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.red = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    //prebrojava broj unesenih polja sad zasad mozemo unijeti samo po jedan brod 
    this.brojUnesenihPolja = 0;
    this.brojPokusaja = 0;
    this.brojPogodaka = 0;
    this.nizPokusaja = [];
};

//metoda za ubacivanje tabele 
Tabla.prototype.ubacivanjeTabele = function (velicinaKocke, topPozicija, nazivKlasePolja) {
    var red = this.red;
    var kolona = this.kolona;
    $(".tablaUlaz").css("position", "relative");
    for (var i = 0; i < red.length; i++) {
        for (var j = 0; j < kolona.length; j++)
        {
            $('<div/>', {
                id: "" + red[i] + kolona[j],
                class: "" + nazivKlasePolja,
                height: velicinaKocke + "px",
                width: velicinaKocke + "px",
                css: {
                    position: "absolute",
                    top: topPozicija + i * velicinaKocke + "px",
                    left: j * velicinaKocke + "px",
                    border: '1px solid rgb(21, 83, 107)',
                    float: 'left',
                    value: 0
                },
            }).appendTo('.tablaUlaz');
        }
    }
};
// funkcija koja na klik uzima val, i horiyontal i id polja 
Tabla.prototype.ubacivanjeBrodova = function () {
    var duzinaBroda;
    var vertikalno;
    if ($(".brod").is(':checked')) {
        duzinaBroda = $(".brod:checkbox:checked").val();

        this.brojUnesenihPolja += parseInt(duzinaBroda);

        console.log(this.brojUnesenihPolja);
    }
    if ($('input[name="vertikalno"]').is(':checked')) {
        vertikalno = $('input[name="vertikalno"]').val();
    }
    console.log("vijednost duzine broda" + duzinaBroda);
    console.log("vertikalno je " + vertikalno);
    return [duzinaBroda, vertikalno];
}

///Sredi kako ynas i umijes 
Tabla.prototype.mijestoUbacivanjaNaTabli = function () {

    $(".polje").click(function () {
        var $this = $(this);
        if ($this.data('clicked')) {
            idPoljaZaUbacivanje = $(this).attr("id");
            console.log(idPoljaZaUbacivanje);
            return idPoljaZaUbacivanje;

        } else {
            console.log("Nisi kliknuo");

        }
    });
};



//sad treba definisati funkciju koja na osnovu vrijednosti velicine broda i da li je horizontalno i id polja postavllja pozadinu polje  u crveno kao brod 
Tabla.prototype.ubacivanjeBrodova1 = function (pozicija) {

    //var idPoljaZaUbacivanje=this.mijestoUbacivanjaNaTabli();
    var ubacivanjeBrodova = this.ubacivanjeBrodova();
    var duzinaBroda = ubacivanjeBrodova[0];
    var vertikalno = ubacivanjeBrodova[1];
    var imaginarniID = pozicija;
    // rastavio id na red i kolunu
    //Imas problem za zadnju kolonu!!!!!!

    // Ima greska 
    //if(idKaoNiz.length<3)
    var idKaoNiz = imaginarniID.split("");
    var kolona = parseInt(idKaoNiz[1]);
    var red = idKaoNiz[0];
    var red1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    var indexReda = red1.indexOf(red);
    console.log("indeks reda je" + indexReda);
    //Index red/kolona i duzina broda u broj
    sumRedShip = parseInt(indexReda) + parseInt(duzinaBroda);
    sumColShip = parseInt(kolona) + parseInt(duzinaBroda);

    if
            (vertikalno == 1 && (sumRedShip) <= 10) {
        var red1 = red1.slice(indexReda, (indexReda + duzinaBroda));
        for (var i = 0; i < duzinaBroda; i++) {
            $("#" + red1[i] + (kolona)).css({"background-color": "#15536b"}).attr('background-color', 'busy');
            $('.brod').remove(':checked');
        }
    } else if (vertikalno == null && (sumColShip) <= 10) {
        for (var i = 0; i < duzinaBroda; i++) {
            $("#" + red + (kolona + i)).css({"background-color": "#15536b"}).attr('background-color', 'busy');
            $('.brod').remove(':checked');
        }
    } else {
        document.getElementById("message").innerHTML = "Ship is too long. Try again!";
        $('.brod').prop('checked', false);
        this.brojUnesenihPolja -= (parseInt(duzinaBroda)) ;
    }

    this.prebrojavnjeZauzetihPolja();
   
};

//2 sad trba da napravimo funkciju koja broji koliko ima crvenih polja i na odredjen broj polja hide ih sve
// (ideja je da se definise neka globalna varijabla koja bi primala broj a brojUnesenihPolja max broj unesenih polja 18)
Tabla.prototype.prebrojavnjeZauzetihPolja = function () {


    if (this.brojUnesenihPolja >= 18) {
        document.getElementById("message").innerHTML = "Time for play.";
        $('.brod').prop('checked', false);
        $('.odabirBrodova').hide();
        $('.btn-start').show();

    }
    console.log("broj unesenih polja je" + this.brojUnesenihPolja);
   
    
   

};

//Startanje igre funkcija prikriva polja na tabeli 
Tabla.prototype.startanjeIgre = function () {
    $(".polje").fadeOut("slow", function () {
    });
};
//Sad treba napraviti funkciju koja uzima id kliknutog polja1 i otkriva polje sa istim id.
Tabla.prototype.otkrivanjePodmornica = function (idPoljeZaPogadjanje) {
    $(".polje[id=" + idPoljeZaPogadjanje + "]").fadeIn('slow', function () {

    });

    this.nizPokusaja.push($(".polje[id=" + idPoljeZaPogadjanje + "]"));
    console.log("broj pokusaja u nizu" + this.nizPokusaja.length);
    this.brojPokusaja++;
    console.log("broj pokusaja je" + this.brojPokusaja);

    var polje = $(".polje[id=" + idPoljeZaPogadjanje + "][background-color='busy']");
    if (polje.length && this.brojPogodaka<18) {
        this.brojPogodaka++;
    }else if (this.brojPogodaka==18){
        this.ocijenaUspijesnosti();
    }
    console.log("broj pogodaka" + this.brojPogodaka);
    
};
//console.log(daLiJePodmornica);
//};

// kreiramo funkciju koja iterira niza i vraca broj polja ca crvenom pozadimon 

Tabla.prototype.detektovanjePodmornice = function (nizPokusaja) {
    for (var pokusaj in nizPokusaja)
    {
        if (pokusaj.attr('background-color') == "Red") {
            this.brojPogodaka++;
        }
    }
};


//Sada treba napraviti funkcija koja ocjenjuje uspjesnost igraca 
Tabla.prototype.ocijenaUspijesnosti = function() {
    if(this.brojPogodaka==this.brojUnesenihPolja && this.brojUnesenihPolja<30){
        alert("Svaka Cast");
    }else if(this.brojPogodaka==this.brojUnesenihPolja && this.brojUnesenihPolja<60){
        alert("Nije lose");
    };
};







var tabela = new Tabla();
var tabela1 = new Tabla();
tabela.ubacivanjeTabele(40, 0, 'polje');
tabela.ubacivanjeTabele(40, 550, 'polje1');


// Click outside the table


// suvisno totalno jedino da se 
$("button").click(function ()
{
    tabela.ubacivanjeBrodova();
});

$(".brod").click(function () {
    document.getElementById("message").innerHTML = "Choose position on the board!";
    $('.message-note').addClass('message');

});
//SAD ZASAD ZANEMARI 
// $(".polje").click(function()
//    {tabela.mijestoUbacivanjaNaTabli();});

$(".polje").click(function () {
    var idPoljaZaUbacivanje = $(this).attr("id");
    tabela.ubacivanjeBrodova1(idPoljaZaUbacivanje);
});

$("button").click(function () {
    tabela.startanjeIgre();
});

$(".polje1").click(function () {
    var idPoljeZaPogadjanje = $(this).attr("id");
    tabela.otkrivanjePodmornica(idPoljeZaPogadjanje);



    // sa fadeOut sprijecavamo da se ponavlja izbor istih polja 
    $(this).fadeOut();

});


// $(window).bind('beforeunload',function(){

// return 'are you sure you want to leave?';

// });


