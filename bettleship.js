
// class Table
var Table= function () {
    this.column = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    //prebrojava broj unesenih polja sad zasad mozemo unijeti samo po jedan brod 
    this.unitNumber = 0;
    this.shootNumber = 0;
    this.succesShootNumber = 0;
    this.shootArray = [];
};

//metoda za ubacivanje tabele 
Table.prototype.setTable = function (cubeSize, topPosition, classField) {
    var row = this.row;
    var column = this.column;
    $(".mainTable").css("position", "relative");
    for (var i = 0; i < row.length; i++) {
        for (var j = 0; j < column.length; j++)
        {
            $('<div/>', {
                id: "" + row[i] + column[j],
                class: "" + classField,
                height: cubeSize + "px",
                width: cubeSize + "px",
                css: {
                    position: "absolute",
                    top: topPosition + i * cubeSize + "px",
                    left: j * cubeSize + "px",
                    border: '1px solid rgb(21, 83, 107)',
                    float: 'left',
                    value: 0
                },
            }).appendTo('.mainTable');
        }
    }
};
// funkcija koja na klik uzima val, i horiyontal i id polja 
Table.prototype.positionShip = function () {
    var shipLength;
    var vertical;
    if ($(".brod").is(':checked')) {
        shipLength = $(".brod:checkbox:checked").val();

        this.unitNumber += parseInt(shipLength);

        console.log(this.unitNumber);
    }
    if ($('input[name="vertical"]').is(':checked')) {
        vertical = $('input[name="vertical"]').val();
    }
    console.log("ship negth" + shipLength);
    console.log("vertical is " + vertical);
    return [shipLength, vertical];
}

///Sredi kako ynas i umijes 
Table.prototype.shipOnTheBoard = function () {

    $(".field").click(function () {
        var $this = $(this);
        if ($this.data('clicked')) {
            idShipField = $(this).attr("id");
            console.log(idShipField);
            return idShipField;

        } else {
            console.log("Nisi kliknuo");

        }
    });
};



//sad treba definisati funkciju koja na osnovu vrijednosti velicine broda i da li je horizontalno i id polja postavllja pozadinu field  u crveno kao brod 
Table.prototype.positionShip1 = function (position) {

    //var idShipField=this.shipOnTheBoard();
    var positionShip = this.positionShip();
    var shipLength = positionShip[0];
    var vertical = positionShip[1];
    var positionId = position;
    // rastavio id na red i kolunu
    //Imas problem za zadnju kolonu!!!!!!

    // Ima greska 
    //if(idArray.length<3)
    var idArray = positionId.split("");
    var column = parseInt(idArray[1]);
    var row = idArray[0];
    var row1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    var rowIndex = row1.indexOf(row);
    console.log("index rowa" + rowIndex);
    //Index red/column i duzina broda u broj
    sumRedShip = parseInt(rowIndex) + parseInt(shipLength);
    sumColShip = parseInt(column) + parseInt(shipLength);

    if
            (vertical == 1 && (sumRedShip) <= 10) {
        var row1 = row1.slice(rowIndex, (rowIndex + shipLength));
        for (var i = 0; i < shipLength; i++) {
            $("#" + row1[i] + (column)).css({"background-color": "#15536b"}).attr('background-color', 'busy');
            $('.brod').remove(':checked');
        }
    } else if (vertical == null && (sumColShip) <= 10) {
        for (var i = 0; i < shipLength; i++) {
            $("#" + row + (column + i)).css({"background-color": "#15536b"}).attr('background-color', 'busy');
            $('.brod').remove(':checked');
        }
    } else {
        document.getElementById("message").innerHTML = "Ship is too long. Try again!";
        $('.brod').prop('checked', false);
        this.unitNumber -= (parseInt(shipLength)) ;
    }

    this.busyFieldNumber();
   
};

//2 sad trba da napravimo funkciju koja broji koliko ima crvenih polja i na odredjen broj polja hide ih sve
// (ideja je da se definise neka globalna varijabla koja bi primala broj a unitNumber max broj unesenih polja 18)
Table.prototype.busyFieldNumber = function () {


    if (this.unitNumber >= 18) {
        document.getElementById("message").innerHTML = "Time for play.";
        $('.brod').prop('checked', false);
        $('.odabirBrodova').hide();
        $('.btn-start').show();

    }
    console.log("broj unesenih polja je" + this.unitNumber);
   
    
   

};

//Startanje igre funkcija prikriva polja na tabeli 
Table.prototype.playTheGame = function () {
    $(".field").fadeOut("slow", function () {
    });
};
//Sad treba napraviti funkciju koja uzima id kliknutog polja1 i otkriva field sa istim id.
Table.prototype.shipPlace = function (playField) {
    $(".field[id=" + playField + "]").fadeIn('slow', function () {

    });

    this.shootArray.push($(".field[id=" + playField + "]"));
    console.log("broj shoota u nizu" + this.shootArray.length);
    this.shootNumber++;
    console.log("broj shoota je" + this.shootNumber);

    var field = $(".field[id=" + playField + "][background-color='busy']");
    if (field.length && this.succesShootNumber<18) {
        this.succesShootNumber++;
    }else if (this.succesShootNumber==18){
        this.succesMessage();
    }
    console.log("broj pogodaka" + this.succesShootNumber);
    
};
//console.log(daLiJePodmornica);
//};

// kreiramo funkciju koja iterira niza i vraca broj polja ca crvenom pozadimon 

Table.prototype.shipDeactivate = function (shootArray) {
    for (var shoot in shootArray)
    {
        if (shoot.attr('background-color') == "#ff9e00") {
            this.succesShootNumber++;
        }
    }
};


//Sada treba napraviti funkcija koja ocjenjuje uspjesnost igraca 
Table.prototype.succesMessage = function() {
    if(this.succesShootNumber==this.unitNumber && this.unitNumber<30){
        alert("You win!");
    }else if(this.succesShootNumber==this.unitNumber && this.unitNumber<60){
        alert("Good bettleship");
    };
};







var tabela = new Table();
var tabela1 = new Table();
tabela.setTable(40, 0, 'field');
tabela.setTable(40, 550, 'field1');


// Click outside the table


// suvisno totalno jedino da se 
$("button").click(function ()
{
    tabela.positionShip();
});

$(".brod").click(function () {
    document.getElementById("message").innerHTML = "Choose position on the board!";
    $('.message-note').addClass('message');

});
//SAD ZASAD ZANEMARI 
// $(".field").click(function()
//    {tabela.shipOnTheBoard();});

$(".field").click(function () {
    var idShipField = $(this).attr("id");
    tabela.positionShip1(idShipField);
});

$("button").click(function () {
    tabela.playTheGame();
});

$(".field1").click(function () {
    var playField = $(this).attr("id");
    tabela.shipPlace(playField);



    // sa fadeOut sprijecavamo da se ponavlja izbor istih polja 
    $(this).fadeOut();

});


// $(window).bind('beforeunload',function(){

// return 'are you sure you want to leave?';

// });


