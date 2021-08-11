//Klasės tipo objektų šablonas sukuriamas pradedant žodžiu <class>.
//Klasės šablone savybės pateikiamos viduje <constructor> funkcijos, o metodai pateikiami atskirai. Kitaip tariant, klasės šablonas yra kitaip užrašytas objektų konstruktoriaus šablonas. Objekto savybių įvedimo funkcijos pateikiami kaip metodai klasės viduje vietoj <Object.defineProperty> išorinės funkcijos. Klasės prototipo objekto metodai gali būti įvesti iš už šablono ribų su <Object.defineProperty>.

class ZmogusI {
    // savybės pateikiamos viduje <constructor> funkcijos:
        constructor(vardas, pavarde, gimimoMetai) {
            this.vardas = vardas;
            this.pavarde = pavarde;
            this.gimimoMetai = gimimoMetai;
        }
    //metodai pateikiami atskirai, šiuo aveju "labas" ir 'gime".
        labas() {
            console.log("Labas,", this.vardas, this.pavarde);
        }
        gime() {
            console.log(this.vardas+" "+this.pavarde+" gimė "+this.gimimoMetai+" metais.");
        }
    //savybių įvedimo į šablono objektą funkcijos <get, get-set> pateikiamos atskirai. 
    get amzius() {
        return 2021 - this.gimimoMetai;
    }
    get pilnasVardas() {
        return this.vardas + " " + this.pavarde;
    }
    set pilnasVardas(value) {
        const vardai = value.split(" ");
        this.vardas = vardai[0];
        this.pavarde = vardai[1];
    }
};
//Prototipo savybes galima įvesti per <Object.defineProperty> už klasės šablono ribų:
Object.defineProperty(ZmogusI.prototype, "pilietybe", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: "Lietuvos pilietis(-ė)",
    })
Object.defineProperty(ZmogusI.prototype, "amziusN", {
        configurable: true,
        enumerable: true,
        get: function() {
            return 2021 - this.gimimoMetai;
        }
});
//______________________________________________________
    //Objektas pagal klasės šabloną sukuriamas su <new> raktažožiu:
    
    let zmogusM = new ZmogusI ("Vardenis", "Pavardenis", 1998);
    //išvedame objekto zmogusN savybes ir metodus į konsolę:
    console.log (zmogusN);
    zmogusM.labas();
    zmogusM.gime();
    //išvedame objekto zmogusN prototipo objekto savybes į konsolę:
    console.log (zmogusM.amzius);
    console.log (zmogusM.pilnasVardas);
    //išvedame objekto zmogusM prototipo savybes, įvestas už klasės šablono ZmogusI ribų:
    console.log (zmogusM.pilietybe);
    console.log (zmogusM.amziusN);
//___________________________________________
    //Kitas klasės šablonas su perimamomis savybėmis ir metodais išvedamas per <extends> raktažodį:
    class StudentasI extends ZmogusI {
    //Įvedama <construtor> funkcija su papildomomis savybėmis, kur perimamos savybės pakartojamos iš aukštesnė klasės su <super> raktažodžiu:
        constructor(vardas, pavarde, gimimoMetai, mokykla, kursas, balai) {
            super(vardas, pavarde, gimimoMetai);
            this.mokykla = mokykla;
            this.kursas = kursas;
            this.balai = balai;
    }
//Nauji metodai įvedami atskirai, šiuo aveju "mokausi" ir "pereitiIKitaKursa":
mokausi() {
    console.log(this.vardas, this.pavarde, "mokosi", this.mokykla);
}
pereitiIKitaKursa() {
    if (this.balai < 1 || this.balai > 100) {
        console.log("negali būti tokių balų");
        return;
        }
    if (this.balai < 35) {
        console.log(this.pilnasVardas+" pasilieka kartoti kurso");
    } else {
        console.log(this.pilnasVardas+" pereina į kitą kursa");
        this.kursas++;
        }
    }
}
//Pastebėkit, kad this.pilnasVardas paimtas iš paveldėtos iš ZmogusI savybės.
//_________________________________________________________
//Sukuriamas objektas pagal išvestinę objektų klasę StudentasI per raktažodį <new>:
studentasM = new StudentasI ("Tomas", "Andrijauskas", 1996, "Vilniaus universitetas", "II kursas", 30);
//Išvedamas studentasM aprašas į konsolę:
console.log (studentasM);
//Išvedami į konsolę paveldėti metodai iš StudentasI klasės:
studentasM.mokausi();
studentasM.pereitiIKitaKursa();
//Išvedami į konsolę paveldėti metodai iš ZmogusI klasės:
studentasM.labas();
console.log (studentasM.pilnasVardas);
//Išvedamos į konsolę paveldėtos prototipo savybės iš ZmogusI klasės:
console.log (studentasM.pilietybe);
console.log (studentasM.amziusN);
