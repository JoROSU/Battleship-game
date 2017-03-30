
// klasa Tabela 
var Tabla=function(){
	this.kolona= ['1','2','3','4','5','6','7','8','9','10'];
  this.red = ['A','B','C','D','E','F','G','H','I','J'];
  //prebrojava broj unesenih polja sad zasad mozemo unijeti samo po jedan brod 
  this.brojUnesenihPolja=0;
  this.brojPokusaja=0;
  this.brojPogodaka=0;
  this.nizPokusaja=[];
};
//metoda za ubacivanje tabele 
Tabla.prototype.ubacivanjeTabele = function(velicinaKocke,topPozicija,nazivKlasePolja) {
   var red=this.red;
   var kolona=this.kolona;
  //   var kolona= ['1','2','3','4','5','6','7','8','9','10'];
  // var red = ['A','B','C','D','E','F','G','H','I','J'];
  $(".tablaUlaz").css("position","relative");
	for (var i =0; i<red.length;i++) {
		for (var j=0; j <kolona.length;j++)
		    {
			$('<div/>', {
             id: ""+red[i]+kolona[j],
             class: ""+nazivKlasePolja,
             height: velicinaKocke+"px",
             width: velicinaKocke+"px",
             css:{
             position:"absolute",
             top: topPozicija+i * velicinaKocke+"px",
             left: j*velicinaKocke+"px",
             border:'1px solid #999',
             float:'left',
             value:0

             },
             
             }).appendTo('.tablaUlaz');		
		    }
      }
    };
// funkcija koja na klik uzima val, i horiyontal i id polja 
Tabla.prototype.ubacivanjeBrodova = function() {
  //ovo bi na klik trebalo uzeti vrijednosti duzine i da li je vertikalno 
  var duzinaBroda;
  var vertikalno;
  //osim sto provjerava da li je cekirano ili ne trebalo bi da sakrije cekirani element da se ne bi dva puta cekirao 
    if($(".brod").is(':checked')) {
    duzinaBroda=$(".brod:checkbox:checked").val();
    //$('.brod:checked').hide().css("visibility", "hidden");;
    this.brojUnesenihPolja+=parseInt(duzinaBroda);
	$('.brod').remove(':checked');
  console.log(this.brojUnesenihPolja);
   };
   if($('input[name="vertikalno"]').is(':checked')){
    vertikalno=$('input[name="vertikalno"]').val();
    
   };
       console.log("vijednost duzine broda"+duzinaBroda);
    console.log("vertikalno je "+vertikalno);
    window.alert("sada izaberite polje na tabli");
    return [duzinaBroda,vertikalno];

   
    // sad smo kao uzeli sta nam treba 

};

///Sredi kako ynas i umijes 
Tabla.prototype.mijestoUbacivanjaNaTabli = function() {

   $(".polje").click(function(){
    var $this = $(this);
    if($this.data('clicked')) {
      idPoljaZaUbacivanje=$(this).attr("id");
      console.log(idPoljaZaUbacivanje);
      return idPoljaZaUbacivanje;

    }
    else {
       // $this.data('clicked', true);
       console.log("Nijesi kliknuo");
    }
});


};



//sad treba definisati funkciju koja na osnovu vrijednosti velicine broda i da li je horizontalno i id polja postavllja pozadinu polje  u crveno kao brod 
Tabla.prototype.ubacivanjeBrodova1=function(pozicija){

  //var idPoljaZaUbacivanje=this.mijestoUbacivanjaNaTabli();
  var ubacivanjeBrodova=this.ubacivanjeBrodova();
  var duzinaBroda=ubacivanjeBrodova[0];
  var vertikalno=ubacivanjeBrodova[1];
  var imaginarniID= pozicija;
  // rastavio id na red i kolunu
  //Imas problem za zadnju kolonu!!!!!!
  var idKaoNiz=imaginarniID.split("");
  var kolona=parseInt(idKaoNiz[1]);
  var red= idKaoNiz[0];
  var red1 = ['A','B','C','D','E','F','G','H','I','J'];
  var indexReda=red1.indexOf(red);
  console.log("indeks reda je"+indexReda);
  //sad unosum brodove 
  // na osnovu vrijednosti check boxa vertikalno i duzine broda unosimo brod tj cinimo polje crvenim
  // 1 OVDE TREBA JOS MALO OVE USLOVE UTANACITI NE RADE KAKO TReba 
  if(vertikalno==1 && (indexReda+duzinaBroda)>=10){
    //Niz od E, F, G , H..
    var red1=red1.slice(indexReda,(indexReda+duzinaBroda));
     for (var i = 0; i <duzinaBroda; i++) {
       $("#"+red1[i]+(kolona)).css({"background-color" : "Red","value":"1"});
     }
  }else if (vertikalno== null && (kolona + duzinaBroda)>=10){
     for (var i = 0; i <duzinaBroda; i++) {
       $("#"+red+(kolona+i)).css("background-color","#638c9c");
     }
  }else{
    alert("Zbog duzine broda nije moguce unijeti brod u selektovano polje ");
  }
  // osim sto smo unijeli crvenu pozadinu trebali bi nekako drzati evidenciju 

  this.prebrojavnjeZauzetihPolja();
};

//2 sad trba da napravimo funkciju koja broji koliko ima crvenih polja i na odredjen broj polja hide ih sve
// (ideja je da se definise neka globalna varijabla koja bi primala broj a brojUnesenihPolja max broj unesenih polja 18)
Tabla.prototype.prebrojavnjeZauzetihPolja=function(){
if(this.brojUnesenihPolja==18){
  alert ("Unijeli ste sve brodove sada stisnite start i igra moze da pocne");
}
console.log("broj unesenih polja je"+this.brojUnesenihPolja);

};
//Startanje igre funkcija prikriva polja na tabeli 
Tabla.prototype.startanjeIgre = function() {
   $( ".polje" ).fadeOut( "slow", function() {
   });
};
//Sad treba napraviti funkciju koja uzima id kliknutog polja1 i otkriva polje sa istim id.
Tabla.prototype.otkrivanjePodmornica = function(idPoljeZaPogadjanje) {
  $(".polje[id="+idPoljeZaPogadjanje+"]").fadeIn('slow',function(){

  });
   
   this.nizPokusaja.push( $(".polje[id="+idPoljeZaPogadjanje+"]"));
  console.log("broj pokusaja u nizu"+this.nizPokusaja.length);
  this.brojPokusaja++;
  console.log("broj pokusaja je"+this.brojPokusaja);
  //this.detektovanjePodmornice(this.nizPokusaja);
//!!! OVDE SAM STAO PROBAJ SKONTATI BROJ POGODAKA
//   var daLiJePodmornica = $(".polje[{id="+idPoljeZaPogadjanje+",background-color='Red'}]");
// if (typeof daLiJePodmornica !== typeof undefined && daLiJePodmornica !== false) {
//      this.brojPogodaka++;
// ovo bi trebalo vracati atribut background color i ako je red 
// var baLiJeBrod = $(".polje[id="+idPoljeZaPogadjanje+"]").attr('background-coloror');
//   if($(".polje[id="+idPoljeZaPogadjanje+"]").attr('background-coloror')== "Red"){
//     this.brojPogodaka++;
//   };


};
  console.log("broj pogodaka"+this.brojPogodaka);
  //console.log(daLiJePodmornica);
//};

// kreiramo funkciju koja iterira niza i vraca broj polja ca crvenom pozadimon 

Tabla.prototype.detektovanjePodmornice = function(nizPokusaja) {
  for(var pokusaj in nizPokusaja)
  {
   if(pokusaj.attr('background-coloror')=="Red"){
    this.brojPogodaka++;
   }
  }
};










 var tabela = new Tabla();
 var tabela1 = new Tabla();
 tabela.ubacivanjeTabele(30,50,'polje');
tabela.ubacivanjeTabele(30,550,'polje1');




// suvisno totalno jedino da se 
  $("button").click(function()
    {tabela.ubacivanjeBrodova();});


//SAD ZASAD ZANEMARI 
 // $(".polje").click(function()
 //    {tabela.mijestoUbacivanjaNaTabli();});

  $(".polje").click(function(){
    var idPoljaZaUbacivanje=$(this).attr("id");
    tabela.ubacivanjeBrodova1(idPoljaZaUbacivanje);
  });

$( "button" ).click(function() { 
  tabela.startanjeIgre();
});

$(".polje1").click(function(){
    var idPoljeZaPogadjanje=$(this).attr("id");
    tabela.otkrivanjePodmornica(idPoljeZaPogadjanje);



    // sa fadeOut sprijecavamo da se ponavlja izbor istih polja 
    $(this).fadeOut();

  });


// $(window).bind('beforeunload',function(){

    // return 'are you sure you want to leave?';

// });