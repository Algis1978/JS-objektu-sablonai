//Sukuriamas objekto šablonas:
function Zmogus(vardas, pavarde, gimimoMetai) {
    this.vardas = vardas;
    this.pavarde = pavarde;
    this.gimimoMetai = gimimoMetai;
}

//Su komanda "Object.defineProperty" įvedama nauja savybė į šablono prototipo objektą. Šiuo atveju metodas (arba funkcija) "amzius" įvedamas per 'get: function () {}'. Prototipo savybės bus paveldimos visų išvestinių objektų.
Object.defineProperty(Zmogus.prototype, "amzius", {
    configurable: true,
    enumerable: true,
    get: function() {
        return 2021 - this.gimimoMetai;
    }
});
//Kitas metodo įvedimo būdas per 'get/set' komandas. Šiuo atveju į šablono prototipą įvedamas metodas "pilnasVardas". 'set' komanda veikia kaip funkcija 'get' komandoje.
Object.defineProperty(Zmogus.prototype, "pilnasVardas", {
    configurable: true,
    enumerable: true,
    get: function() {
        return this.vardas + " " + this.pavarde;
    },
    set: function(value) {
        const vardai = value.split(" ");
        this.vardas = vardai[0];
        this.pavarde = vardai[1];
    }
});
// Taip įvedamas metodas tiesiogiai į šablono prototipą. Šiuo atveju "Labas".
Zmogus.prototype.labas = function() {
    console.log("Labas,", this.vardas, this.pavarde);
};

//Dabar objektų šablonas Žmogus turi priskirtas savybes (vardas, pavarde, gimimoMetai) ir įterptus metodus (amzius, pilnasVardas, labas) 
//Priskiriame įvedamos vertės paveldimą savybę "pilietybe" prototipe:
Object.defineProperty(Zmogus.prototype, "pilietybe", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: "Lietuvos pilietis(-ė)",
    })

//PAVYZDYS--PAVYZDYS--PAVYZDYS
//Sukuriame objektą zmogusN pagal šabloną Zmogus:
let zmogusN = new Zmogus ("Vardenis", "Pavardenis", 2000);
//Išvedame objekto zmogusN aprašą į konsolę:
console.log(zmogusN);
//Iššaukiame įvestą objekto prototipe funkciją(metodą):
zmogusN.labas ();
//Iššaukiame įvestą objekto prototipe savybę:
console.log (zmogusN.pilietybe);

//___________________________________________________________
//Sukuriame išvestinį objektų šabloną Studentas, kuris paveldi savybes ir metodus iš šablono Žmogus per 'call' funkiją. Jame papildomai įvedame savybes "mokykla" ir "kursas":
function Studentas(vardas, pavarde, gimimoMetai, mokykla, kursas) {
    Zmogus.call(this, vardas, pavarde, gimimoMetai);
    this.mokykla = mokykla;
    this.kursas = kursas;
}
//Sukuriame šablono Studentas prototipo objektą, kuris yra šablono Zmogus prototipas, nes norime, kad Studentas perimtų šablono Zmogus savybes ir metodus.
Studentas.prototype = Object.create(Zmogus.prototype);
//Tuo metu šablono Studentas prototipo 'constructor' funkcija nurodo patį šabloną Studentas:
Studentas.prototype.constructor = Studentas;
//Studento prototipe įvedame naują metodą "labas":
Studentas.prototype.labas = function() {
    console.log("Labas, "+this.vardas+" "+this.pavarde+", mokausi "+this.mokykla+".");
};
//Studento prototipe įvedame naują metodą "pereitiIKitaKursa":
Studentas.prototype.pereitiIKitaKursa = function(balai) {
    if (balai < 1 || balai > 100) {
        console.log("neteisinga balų vertė.");
        return;
    }
    if (balai < 35) {
        console.log(this.vardas+" "+this.pavarde+" lieka kartoti kurso.");
    } else {
        console.log(this.vardas+" "+this.pavarde+" pereina į kita kursą.");
        this.kursas++;
    }
};
//____________________________________
//Sukuriame objektą pagal šabloną Studentas:
let studentasN = new Studentas("Petras", "Petraitis", 1999, "BIT", 1);
//Išvedame studentasN aprašą į konsolę:
console.log(studentasN);
//Iššaukiame metodą "labas";
studentasN.labas();
//Iššaukiame metodą "pereitiIKitaKursas" pagal skirtingas vertes;
studentasN.pereitiIKitaKursa(-1);
studentasN.pereitiIKitaKursa(101);
studentasN.pereitiIKitaKursa(27);
studentasN.pereitiIKitaKursa(87);
//_________________________________________________________________
//Šablone Zmogus buvo metodas "labas", bet šablone Studentas jis buvo pakeistas to paties pavadinimo metodu, tačiau savybe "pilietybe" liko nepakeista:
console.log(studentasN.pilietybe);
//Padarome atvirkščiai. Sukuriame šabloną UzsienioStudentas ir pridedame savybes "valstybė" ir "kalba":

function UzsienioStudentas (vardas, pavarde, gimimoMetai, valstybe, kalba) {
    Zmogus.call(this, vardas, pavarde, gimimoMetai);
    this.valstybe = valstybe;
    this.kalba = kalba;
}
//Sukuriame UzsienioStudentas prototipo objektą:
UzsienioStudentas.prototype = Object.create(Zmogus.prototype);
//UzsienioStudentas prototipo 'constructor' nukreipiam į patį save:
UzsienioStudentas.prototype.constructor = UzsienioStudentas;
//Pakeičiame savybę "pilietybe":
UzsienioStudentas.prototype.pilietybe="Užsienio pilietis(-ė)"
//_________________________
//Sukuriame objektą pagal šabloną UzsienioStudentas:
let studentasU = new UzsienioStudentas ("Mark", "Johansson", 1998, "Jungtinė Karalystė", "anglų");
//Išvedame studentasU objekto savybes į konsolę:
console.log (studentasU);
//Iš Zmogus perimtas metodas "labas" veiks, savybė "pilietybė" pasikeis:
console.log (studentasU.pilietybe);
studentasU.labas ();

//Wrap up:
//1. naujas objektų šablonas sukuriamas su 'call' iššaukiant kito šablono savybes ir metodus. Pvz,: function Naujas () {Senas.call};
//2. sukuriames Naujo šablono prototipas per 'Object.create';
//3. Naujo prototipo constructor nukreipiamas į patį Naujas;
//4. per Object.defineProperty įvedamos naujos savybės ir metodai (funkcijos);
