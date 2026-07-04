/* ===========================================================
   Hvar 2026 — all platsdata på ett ställe (korta beskrivningar)
   =========================================================== */

const platser = [
  // --- Städer & byar ---
  { id:"stari-grad", grupp:"stader", namn:"Stari Grad",
    text:"Gammal stad med bad, färjeläge och slottet Tvrdalj.", lat:43.1847, lng:16.5983 },
  { id:"jelsa", grupp:"stader", namn:"Jelsa",
    text:"Mysig by med lugn strandpromenad.", lat:43.1608, lng:16.6900 },
  { id:"sveta-nedelja", grupp:"stader", namn:"Sveta Nedelja",
    text:"Bad, klippdyk och restaurang med havsutsikt. Bil behövs.", lat:43.1447, lng:16.5460 },
  { id:"malo-grablje", grupp:"stader", namn:"Malo Grablje",
    text:"Övergiven stenby med den kända krogen Stori Komin.", lat:43.1625, lng:16.3990 },

  // --- Båtutflykter ---
  { id:"pakleni", grupp:"bat", namn:"Pakleni Islands",
    text:"Öar minuter bort — turkosa vikar och strandkrogar.", lat:43.1560, lng:16.3550 },

  // --- Stränder ---
  { id:"pokonji-dol", grupp:"strand", namn:"Pokonji Dol",
    text:"Närmaste stranden — 25 min till fots. Turkost vatten.", lat:43.1668, lng:16.4560 },
  { id:"bonj", grupp:"strand", namn:"Bonj (Bonj 'les Bains')",
    text:"Elegant strand vid Amfora, väster om stan.", lat:43.1725, lng:16.4360 },
  { id:"sirena", grupp:"strand", namn:"Beach Sirena",
    text:"Liten strand väster om stan, nära Hula Hula.", lat:43.1713, lng:16.4310 },
  { id:"krizna-luka", grupp:"strand", namn:"Križna Luka",
    text:"Liten stadsstrand vid klostret, nära hamnen.", lat:43.1705, lng:16.4460 },
  { id:"mekicevica", grupp:"strand", namn:"Mekićevica",
    text:"Avskild vik med strandkrog, öster om stan.", lat:43.1610, lng:16.4740 },
  { id:"dubovica", grupp:"strand", namn:"Dubovica Plaža",
    text:"Vik med fin strand och klarblått vatten.", lat:43.1430, lng:16.5040 },
  { id:"velo-zarace", grupp:"strand", namn:"Plaža Velo Zaraće",
    text:"Strand med restaurang.", lat:43.1452, lng:16.4870 },
  { id:"mala-stiniva", grupp:"strand", namn:"Plaža Mala Stiniva",
    text:"Liten, undangömd strand.", lat:43.1440, lng:16.4920 },
];

const uteliv = [
  { id:"hula-hula", namn:"Hula Hula Beach Bar",
    text:"Legendarisk sunset-fest med DJ, väster om stan.", lat:43.1706, lng:16.4320 },
  { id:"carpe-diem", namn:"Carpe Diem",
    text:"Ikonisk cocktailbar vid hamnen. Beachklubb på Pakleni.", lat:43.1727, lng:16.4415 },
  { id:"kiva", namn:"Kiva Bar",
    text:"Litet, sprudlande barställe i en gränd. Full fart.", lat:43.1723, lng:16.4408 },
  { id:"central-park", namn:"Central Park Club",
    text:"Nattklubb mitt i stan — dansa vidare på natten.", lat:43.1719, lng:16.4402 },
  { id:"falko", namn:"Falko Beach Bar",
    text:"Chill strandbar i pinjeskog. Lugnare än Hula Hula.", lat:43.1712, lng:16.4285 },
  { id:"seven", namn:"Seven", typ:"Bar", text:"Trevlig bar för en drink.", lat:43.1723, lng:16.4432 },
];

const guldkorn = [
  { id:"fortica", namn:"Solnedgång på Fortica",
    text:"Vandra upp till fästningen för magisk solnedgång.", lat:43.1762, lng:16.4432 },
  { id:"vinprovning", namn:"Vinprovning i Sveta Nedelja",
    text:"Provsmaka prisbelönta viner hos Zlatan Otok.", lat:43.1452, lng:16.5475 },
  { id:"egen-bat", namn:"Hyr egen båt en dag",
    text:"Utforska Paklenis gömda vikar i egen takt." },
  { id:"konoba", namn:"Konoba Menego",
    text:"Mysig familjekrog i gamla stan. Bläckfisk-peka, kontanter.", lat:43.1721, lng:16.4405 },
  { id:"kajak", namn:"Kajak eller SUP",
    text:"Paddla längs kusten i solnedgången.", },
];

const hyra = [
  { id:"hyra-bat", namn:"Hyra båt",
    text:"Uthyrare vid hamnen. Liten båt räcker till Pakleni.", lat:43.1728, lng:16.4418 },
  { id:"hyra-moped", namn:"Hyra moped / scooter",
    text:"Nå sydkustens stränder. Ta med körkort.", lat:43.1719, lng:16.4430 },
  { id:"hyra-cykel", namn:"Hyra cykel / elcykel",
    text:"Cyklar och elcyklar hos Hvar Adventure m.fl.", lat:43.1731, lng:16.4408 },
];

const handla = [
  { id:"konzum", namn:"Konzum",
    text:"Största snabbköpet — bäst för storhandling.", lat:43.1716, lng:16.4452 },
  { id:"studenac", namn:"Studenac / Tommy",
    text:"Närbutiker i stan för det man glömt.", lat:43.1723, lng:16.4432 },
  { id:"torg", namn:"Torghandel & bageri",
    text:"Färsk frukt, grönt och bröd vid torget.", lat:43.1728, lng:16.4415 },
];

const boende = {
  id:"boende", namn:"Memo Top View Apartment",
  text:"Vårt boende — övre Hvar stad, havsutsikt, 9 min till torget.",
  lat:43.1713, lng:16.4460,
  lank:"https://www.booking.com/hotel/hr/memo-top-view-apartment-hvar.sv.html"
};

const restauranger = [
  { id:"kantun", namn:"Kantun", typ:"Frukost", text:"Bra frukoststopp för att starta dagen.",
    lat:43.1731, lng:16.4420, ta:"https://www.tripadvisor.com/Search?q=Kantun%20Hvar" },
  { id:"kava", namn:"Kava", typ:"Kaffe", text:"Mysigt kaffeställe för en lugn morgon.",
    lat:43.1729, lng:16.4427, ta:"https://www.tripadvisor.com/Search?q=Kava%20Hvar" },
  { id:"kinkin", namn:"Kinkin", typ:"Smörgåsar", text:"Goda mackor att ta med till stranden.",
    lat:43.1725, lng:16.4418, ta:"https://www.tripadvisor.com/Search?q=Kinkin%20Hvar" },
  { id:"lamore", namn:"L'amore per il gelato", typ:"Gelato", text:"Krämig italiensk gelato — perfekt i värmen.",
    lat:43.1719, lng:16.4444, ta:"https://www.tripadvisor.com/Restaurant_Review-g303808-d21026556-Reviews-L_amore_Per_Il_Gelato-Hvar_Hvar_Island_Split_Dalmatia_County_Dalmatia.html" },
  { id:"code11", namn:"Code 11", typ:"Restaurang", text:"Omtyckt restaurang med havsutsikt, öster om hamnen.",
    lat:43.1707, lng:16.4460, lank:"https://code-11.hr/", ta:"https://www.tripadvisor.com/Restaurant_Review-g303808-d25563018-Reviews-Code_11-Hvar_Hvar_Island_Split_Dalmatia_County_Dalmatia.html" },
  { id:"dieci", namn:"Dieci", typ:"Middag", text:"Mysig pizzeria vid hamnen med god italiensk mat.",
    lat:43.1721, lng:16.4406, ta:"https://www.tripadvisor.com/Restaurant_Review-g303808-d27950693-Reviews-Pizzeria_Dieci_Hvar-Hvar_Hvar_Island_Split_Dalmatia_County_Dalmatia.html" },
  { id:"black-pepper", namn:"Black Pepper", typ:"Restaurang", text:"Rustik krog med grillat och lokala rätter.",
    lat:43.1732, lng:16.4423, ta:"https://www.tripadvisor.com/Search?q=Black%20Pepper%20Hvar" },
  { id:"lungo-mare", namn:"Lungo Mare", typ:"Restaurang", text:"Havsnära restaurang med fisk och skaldjur.",
    lat:43.1714, lng:16.4450, ta:"https://www.tripadvisor.com/Search?q=Lungo%20Mare%20Hvar" },
  { id:"giaxa", namn:"Giaxa", typ:"Fine dining", text:"Elegant fine dining i ett gammalt stenpalats.",
    lat:43.1731, lng:16.4406, ta:"https://www.tripadvisor.com/Search?q=Giaxa%20Hvar" },
  { id:"fig", namn:"Fig Hvar", typ:"Café & bar", text:"Avslappnad café-bar med brunch och cocktails.",
    lat:43.1726, lng:16.4416, ta:"https://www.tripadvisor.com/Search?q=Fig%20Hvar" },
  { id:"slik", namn:"Slik", typ:"Vinbar", text:"Mysig vinbar med små rätter att dela.",
    lat:43.1734, lng:16.4419, ta:"https://www.tripadvisor.com/Search?q=Slik%20Hvar" },
  { id:"spice", namn:"Spice", typ:"Restaurang", text:"Modern meny med smaker från hela världen.",
    lat:43.1728, lng:16.4431, ta:"https://www.tripadvisor.com/Search?q=Spice%20Hvar" },
];

// Par (för matlag-hjulet, om det används)
const paren = ["Joachim & Sofia", "Joel & Sofia", "Lykke & Emil"];
