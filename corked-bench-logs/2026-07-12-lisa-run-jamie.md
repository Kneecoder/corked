Ja. Die HTML maakte alles te veel tot een projectplan, terwijl juist de kleine tegenstrijdigheden belangrijk zijn. Hieronder staat het volledige observatielog van deze test, zo dicht mogelijk op wat er werkelijk gebeurde.

Testcontext
We testten één relatief sterke happy path: een software-idee rond WhatsApp-voice notes van klanten.

De Spark was:

Thinking of a small tool that turns client WhatsApp voice notes into clear tasks, because my friend Lisa keeps losing requested changes in long chats.

De testgebruiker had hierdoor vanaf het begin al:
een concrete persoon: Lisa;
een relatie: my friend;
een herkenbaar probleem;
een mogelijke softwarevorm;
ogenschijnlijk enige echte ervaring met het probleem.
De latere antwoorden waren bewust concreet, consistent en van hoge kwaliteit. Dit was dus geen rommelige gebruiker die halve antwoorden gaf.
Daardoor zijn de problemen die we vonden geen obscure edge cases. Ze ontstonden zelfs op een vrij ideale route.
1. De eerste Spark invoeren
Het eerste invoerscherm was inhoudelijk duidelijk:
één grote vraag;
één tekstveld;
uitleg dat de Spark niet gepolijst hoeft te zijn;
één primaire actie.

De tekst:

Do not polish the spark. Corked only needs enough shape to bottle it.

werkt goed. Hij geeft toestemming om iets onafs in te voeren zonder veel extra uitleg.

Tijdens het bottelen bleef dezelfde primaire knop visueel aanwezig. De status veranderde naar Bottling spark…, maar het was niet volledig duidelijk of de knop nogmaals kon worden aangeklikt.

De gebottelde zin bleef redelijk trouw aan onze Spark:

A small tool for people like Lisa to turn client WhatsApp voice notes into clear tasks, so requested changes don't get lost in long chats.

Corked voegde geen compleet nieuw product, markt of belofte toe. De M0-regel compress, never upgrade werkte hier redelijk goed.
"People like Lisa" was wel al een kleine generalisatie. De input ging over Lisa; de gebottelde zin maakte daar direct een bredere categorie van.
De Winemaster-analyse was correct maar technisch:

A role is visible (...) and a stated problem is present (...). Both enter cleanly.

Dat leest meer als een evaluatorlog dan als betekenisvolle feedback voor een gebruiker.
2. Edit Spark
Bij Edit Spark kwamen we terug op het oorspronkelijke invoerscherm.
Het tekstveld bevatte daarna niet de oorspronkelijke ruwe Spark, maar de door Corked gebottelde versie.
Daardoor is Edit Spark feitelijk niet alleen "pas mijn oorspronkelijke gedachte aan", maar "bewerk de interpretatie die Corked ervan heeft gemaakt".
Er was geen Cancel-actie om te zeggen:

Laat maar, de gebottelde versie was toch goed.

Om terug te keren moest de gebruiker opnieuw op Bottle your Spark klikken.
Daardoor kon een gebruiker opnieuw een AI-call en tokens verbruiken zonder inhoudelijk iets te hebben veranderd.
De knop controleerde voor zover zichtbaar niet of de tekst daadwerkelijk gewijzigd was.
Dezelfde knoptekst Bottle your Spark werd gebruikt voor zowel de eerste verwerking als een herverwerking. Het onderscheid tussen bottelen en opnieuw bottelen was niet zichtbaar.
Er was geen veilige toestand waarin je even kon kijken, teruggaan en het bestaande resultaat behouden.
3. Corked bepaalde vooraf de ervaringsroute
Corked liet daarna twee routes zien:
Lisa is concreet en de gebruiker kent het moment;
Lisa is concreet, maar de gebruiker heeft het alleen indirect gehoord.
De eerste optie was vooraf geselecteerd.
De tweede optie was disabled en kon niet worden gekozen.
Corked leidde uit de Spark af dat de gebruiker zowel Lisa als een concreet moment kende.
De Spark bewees dat echter niet. "Lisa keeps losing requested changes" kan betekenen:
ik heb het zelf zien gebeuren;
Lisa heeft het mij verteld;
ik heb alleen een algemeen patroon van haar gehoord;
ik neem aan dat dit regelmatig gebeurt.
Corked maakte hier dus een bewijsbeslissing voordat de gebruiker die zelf had bevestigd.
De voorselectie als subtiele suggestie had verdedigbaar kunnen zijn. Het volledig blokkeren van de andere route niet.
Dit was extra opvallend omdat Corked juist probeert aannames van de founder te testen.
4. Naam en relatie van Lisa
Op het volgende scherm waren beide velden vooraf ingevuld:
naam: Lisa;
relatie: my friend.
Dit was inhoudelijk logisch. Beide gegevens kwamen letterlijk uit de Spark.
In tegenstelling tot de vorige stap deed Corked hier geen sterke nieuwe aanname; het extraheerde alleen bestaande informatie.
Het scherm maakte echter niet zichtbaar dat deze informatie uit de Spark was overgenomen.
Daardoor kon de gebruiker niet goed onderscheiden tussen:
wat Corked heeft gevonden;
wat Corked heeft geconcludeerd;
wat de gebruiker zelf al expliciet heeft bevestigd.
De veldvraag was:

How do you know them?

Het antwoord my friend beantwoordt die vraag letterlijk.
Later beoordeelde Corked "my friend" toch als onvoldoende, omdat het een sociale categorie zou zijn zonder concrete context.
Het scherm vertelde vooraf niet dat Corked bijvoorbeeld iets verwachtte als:

A friend I studied design with and still work beside twice a week.

Corked accepteerde het antwoord dus eerst zonder waarschuwing en presenteerde het pas later als onvolledig.
5. De onboardinganimatie
De onboarding liet dezelfde fles in drie mogelijke toestanden zien.
De zes bolletjes maakten visueel duidelijk dat een bottle uit meerdere onderdelen bestaat.
De drie voorbeelden lieten zien dat een uitkomst niet simpelweg goed of fout is:
vijf onderdelen zijn sterk, één ontbreekt;
meerdere onderdelen zijn nog onzeker;
vier onderdelen zijn sterk en twee zijn nog in ontwikkeling.
Dat idee werkte visueel beter dan een uitlegpagina met alleen tekst zou hebben gedaan.
De kleuren groen, geel en grijs hadden echter geen expliciete betekenis of legenda.
De gebruiker moest uit de animatie en begeleidende tekst afleiden wat de kleuren ongeveer betekenden.
De zin:

Three ways one has gone before.

was taalkundig en inhoudelijk vaag. "One" kan slaan op een Spark, bottle, idea of eerdere gebruiker.

De zin:

You came in for wine. The cellar is making champagne.

is opvallend, maar verandert de metafoor.

Corked gaat normaal over een idee dat ouder wordt en eerlijker wordt. Champagne suggereert eerder dat Corked het idee verbetert of luxer maakt.
Dat botst mogelijk met het uitgangspunt dat Corked een Spark niet moet upgraden.
De onboarding sprak nadrukkelijk over six elements.
Dat maakte de latere aanduiding Element 1 of 7 direct inconsistent.
6. Het eerste Phase 1-scherm
Na de onboarding kwamen we op een groot desktopdashboard.
De daadwerkelijke content nam maar een relatief smal deel van het scherm in.
Er was veel lege ruimte, terwijl:
de bodytekst klein was;
de contrasten zwak waren;
belangrijke analyses in kleine panelen stonden.
Daardoor voelde de inhoud minder belangrijk dan zij inhoudelijk was.
De linkerzijbalk, fles, Spark, labels en hoofdcontent waren allemaal tegelijkertijd zichtbaar.
Dat gaf overzicht, maar ook veel concurrerende informatie voor een eerste scherm.
De lange gebogen lijn liep van het actieve element in de sidebar naar de content.
Het idee was duidelijk: de gebruiker moest zien dat de huidige content bij Grape hoorde.
In de praktijk voelde de lijn eerder als een decoratieve kabel of dataverbinding.
De actieve sidebarrij, de elementnaam en de hoofdkop gaven die relatie al aan.
De lijn nam veel visuele ruimte in zonder nieuwe informatie toe te voegen.
7. Grape werd meteen Clearing
Corked beoordeelde Grape als Clearing, niet als Settled.
De hoofdboodschap was:

Lisa is the person this spark must answer to.

Dat is een sterke positioneringszin. Hij maakt Lisa belangrijker dan een algemene doelgroep.
De analyse daaronder zei ongeveer:

Lisa – my friend. A name is present. The relationship field contains "my friend", which is a social category without a real-world tie that anchors Lisa to a specific context.

Dat is inhoudelijk specifieker, maar erg evaluatorachtig en lang.
De gebruiker kreeg te horen wat er ontbrak, maar kreeg op dat moment geen zichtbare actie om het te verbeteren.
Er stond geen knop als:
Sharpen this person;
Add context;
Edit relationship.
Corked zei tegelijkertijd:

The elements ahead will sharpen it.

Dat suggereerde dat de gebruiker het niet nu hoefde op te lossen.
Later bleek Grape aan het einde nog steeds Clearing te zijn.
De eerdere boodschap "the elements ahead will sharpen it" bleek dus misleidend: de latere stappen maakten Grape niet vanzelf Settled.
Het scherm noemde dit Element 1 of 7, terwijl:
de onboarding zes elementen had getoond;
de sidebar zes elementen bevatte;
het eindlabel later ook zes elementen had.
8. Grape kon tóch worden aangepast, maar verborgen
Later klikten we toevallig op Grape in de sidebar.
Toen verscheen een detailpagina van Grape.
Daar stond wél een invoerveld om de relatie opnieuw te beschrijven.
De mogelijkheid die op het eerste Clearing-scherm ontbrak, bestond dus technisch al.
Ze was alleen niet zichtbaar op het moment dat de gebruiker haar nodig had.
De gebruiker moest zelf ontdekken dat de sidebar niet alleen een statusoverzicht was, maar ook navigatie naar bewerkbare elementpagina's.
Er was geen visuele affordance zoals:
een edit-icoon;
"Review";
"Answer again";
een chevron.
Op de detailpagina stond:

Tap to answer again.

Ook dat is vaag: het zegt niet welk ontbrekend bewijs Corked nodig heeft.
De goede functie zat dus op de verkeerde plaats en was slecht vindbaar.
9. Cellar Rhythm
Na Continue verscheen Cellar Rhythm op hetzelfde scherm onder de Grape-analyse.
We kozen:
Daily;
Morning.
De interface gaf aan dat dit geen commitment was, maar het tempo bepaalde.
Het bleef onduidelijk wat het tempo precies bestuurde:
wanneer nieuwe vragen beschikbaar worden;
wanneer een herinnering verschijnt;
wanneer Corked automatisch iets terugbrengt;
of vragen daadwerkelijk tot dat moment worden geblokkeerd.
Ondanks Daily · Morning konden we vrijwel de hele Phase 1 direct in één sessie afmaken.
Daardoor voelde rhythm niet als een daadwerkelijke productregel, maar vooral als opgeslagen metadata.
De tekst links bleef later zeggen:

Next question: daily in the morning.

Ook toen we al meerdere vragen achter elkaar hadden beantwoord.
10. De Friction Test / The Tell
De tweede stap heette bovenaan:

Element 2 of 7 · The Friction Test.

In de sidebar heette het corresponderende labelelement:

The Tell.

Mechanisme en labelelement werden dus als vrijwel hetzelfde gepresenteerd, maar hadden verschillende namen.
Het was niet duidelijk of de gebruiker:
een vraagmechanisme doorliep;
een labelelement invulde;
of beide tegelijk.
De vraag zelf was sterk en specifiek:

Ask Lisa to walk you through the last specific time a client change request got lost in a WhatsApp chat...

Corked vroeg niet naar een mening of hypothetisch gebruik, maar naar een concrete gebeurtenis.
Dat paste goed bij het doel van Phase 1.
De aanvullende uitleg beschreef echter al uitgebreid wat een goed antwoord moest bevatten:
voice note;
gemiste verandering;
rework;
missed deadline;
client complaint.
Dat helpt de gebruiker, maar kan hem ook richting het gewenste bewijs coachen.
De gebruiker kan daardoor een correct gestructureerd verhaal produceren zonder dat alle onderdelen werkelijk uit het gesprek met Lisa komen.
In de sidebar werd niet duidelijk genoeg aangegeven dat we nu bij The Tell waren.
Grape bleef visueel de prominentste gekleurde status.
De huidige stap was daardoor minder duidelijk dan de status van eerder bewijs.
11. Park
We klikten bij deze vraag op de mogelijkheid om de vraag te parkeren.
Corked veranderde de status naar:

Parked · a question to ask.

De geparkeerde weergave toonde:
de vraag om aan Lisa te stellen;
een Copy question-actie;
de melding dat de vraag over één dag terugkwam;
"Nothing to enter yet."
De Cellar-card toonde daarna correct dat er een geparkeerde buitentaak bestond.
Op dat moment was Parked een begrijpelijke status.
Het probleem was dat de geparkeerde vraag volledig gesloten leek.
Er was geen zichtbare optie:
Answer now;
I already asked;
Resume;
Unpark.
Als de gebruiker Lisa eerder dan de volgende ochtend spreekt, zou hij toch meteen moeten kunnen antwoorden.
Park functioneerde daardoor als een blokkade, terwijl het inhoudelijk alleen een reminder had moeten zijn.
12. Navigeren vanuit een geparkeerde vraag
In de geparkeerde situatie werd The Tell nog steeds niet duidelijk als de actuele stap gemarkeerd.
We konden vanuit daar wel op Grape klikken.
Daardoor ontdekten we de verborgen mogelijkheid om de relatie met Lisa opnieuw te beschrijven.
Boven de Grape-detailpagina verscheen een link terug naar Current question.
Toen we daarop klikten, kwam de geparkeerde Friction-vraag terug.
Het invoerveld was nu ineens weer beschikbaar.
Corked behandelde dezelfde vraag dus tegelijkertijd als:
geparkeerd en nog niet beantwoordbaar;
current question;
actief en direct beantwoordbaar.
Dit was geen puur visueel probleem. Het interne state-model leek daadwerkelijk twee tegenstrijdige statussen te bevatten.
13. Vastlopen op Saving
We vulden vervolgens toch een antwoord in bij de opnieuw geopende geparkeerde vraag.
De interface bleef hangen op Saving….
Er was geen:
timeout;
foutmelding;
retry;
cancel;
indicatie of de tekst lokaal al veilig stond.
De gebruiker wist niet of opnieuw klikken het antwoord dubbel zou versturen.
Op hetzelfde scherm bleef onder de actieve vraag ook de oude geparkeerde versie zichtbaar.
Er stonden dus twee representaties van dezelfde vraag onder elkaar:
de beantwoorde actieve versie;
de geparkeerde "Nothing to enter yet"-versie.
Dit bevestigde dat Corked niet één betrouwbare source of truth voor de vraagstatus had.
Uiteindelijk werd het antwoord wel verwerkt, maar de route daarheen voelde kapot en onvoorspelbaar.
14. Het antwoord op de Friction Test
We gaven een zeer concreet antwoord over:
afgelopen donderdag;
een drie minuten durende voice note;
een logoaanpassing;
een buttonkleur;
luisteren tijdens het lopen;
niet noteren;
de volgende ochtend één wijziging vergeten;
terugzoeken in WhatsApp;
bestanden opnieuw openen;
een dag te laat leveren.
Corked haalde hier correct twee soorten bewijs uit:
The Tell werd Settled;
Vintage werd Settled.
Dit was een van de sterkste productmomenten van de test.
Eén antwoord mocht meerdere labelelementen versterken, zonder dat Corked dezelfde gebeurtenis opnieuw hoefde uit te vragen.
De observatie koppelde zichtbaar gedrag aan het probleem.
Vintage koppelde dat gedrag aan één concreet moment.
De output werd alleen op drie plaatsen herhaald:
in het analyseblok;
in What changed;
in de sidebarstatussen.
Daardoor verloor het sterke moment impact door herhaling.
De oude geparkeerde vraag bleef bovendien onder het reeds verwerkte resultaat zichtbaar.
"Saving…" en "Asked, waiting on a reply" bleven op meerdere vervolgschermen staan, ook nadat de verwerking feitelijk klaar was.
15. Third-party Workarounds
De volgende vraag was:

Set Lisa aside. Who else hits this? Name one person and tell me what they have actually done about it.

Dit was opnieuw een sterke vraag.
Corked voorkwam dat Lisa's verhaal automatisch als algemeen bewijs werd behandeld.
Het vroeg naar:
een tweede echte persoon;
werkelijk gedrag;
een bestaande workaround.
We noemden Tom, een freelance video-editor, met een concrete werkwijze via starred messages en Notion.
Corked maakte The Echo Settled.
Dat liet goed zien dat het probleem buiten Lisa en buiten de founder bestond.
De analyse gebruikte taal als:

The Echo bar finds...

"Bar" is interne systeemtaal en voegt voor de gebruiker weinig toe.
Corked noemde ook opnieuw Vintage, hoewel Vintage al Settled was.
Daarna werd opnieuw vrijwel dezelfde conclusie herhaald in What changed.
16. De flow sprong van 3 naar 5
Third-party Workarounds stond als Element 3 of 7.
De volgende zichtbare stap was Element 5 of 7 · The Existing Fix.
Element of stap 4 verscheen niet.
Corked legde niet uit:
waarom stap 4 was overgeslagen;
of Toms antwoord stap 4 automatisch had afgedekt;
of nummer 4 later zou terugkomen;
of dit een bug was.
Een intelligente dynamische flow mag stappen overslaan, maar de zichtbare nummering maakte dit nu verdacht.
Dit versterkte de verwarring tussen zeven mechanismen en zes labelelementen.
17. The Existing Fix / The Gap
De volgende vraag vroeg:

What do people use for this problem now, and exactly where does it fall short?

De combinatie van "bestaande oplossing" én "waar faalt die" was inhoudelijk sterk.
Corked accepteerde niet alleen "ze gebruiken Trello" als volledig antwoord.
Het eiste het concrete faalpunt.
Tegelijkertijd werd de vraag weer generiek geformuleerd als "people", terwijl Corked inmiddels Lisa en Tom kende.
Een meer gerichte vraag had kunnen aansluiten op de bestaande informatie.
We antwoordden dat Lisa starred messages en Trello gebruikte, maar dat:
starring de hele voice note bewaart;
individuele wijzigingen niet los beschikbaar worden;
handmatig kopiëren afhankelijk is van direct handelen;
de gemiste wijziging in een niet-gemarkeerde voice note zat.
Corked maakte The Gap Settled.
Dat was inhoudelijk logisch.
Opnieuw verschenen:
een analyseblok;
een What changed-blok;
een nieuwe sidebarstatus.
Alle drie beschreven vrijwel dezelfde conclusie.
18. Their Words, Not Yours
De volgende stap heette:

Element 6 of 7 · Their Words, Not Yours.

In de sidebar bestond geen apart element voor "Their Words".
De sidebar bleef The Echo als actief of relevant element tonen.
Daardoor was opnieuw niet duidelijk hoe het huidige mechanisme zich tot de zes labelelementen verhield.
Boven de vraag stond:

Your grape is Lisa. M6 will ask for their exact words.

Dit lekte interne architectuur naar de gebruiker:
"M6";
de mechanische rol van de stap;
interne terminologie rond grape.
De vraag gebruikte:

How would Lisa describe this in their own words?

"Their" is grammaticaal als neutraal pronomen mogelijk, maar voelde hier onnatuurlijk omdat Corked voortdurend over één specifiek benoemd persoon sprak.
Corked bood een belangrijke eerlijke keuze:
echte woorden uit een werkelijk gesprek;
gereconstrueerd, we hebben er niet in deze termen over gesproken.
Dit was inhoudelijk een goede manier om echt bewijs van reconstructie te onderscheiden.
We selecteerden expliciet:

Their words, from a real exchange.

Daarmee had Corked gestructureerde metadata dat de ingevoerde tekst van Lisa kwam.
We vulden vervolgens een first-person quote in:

Clients send me these three-minute voice notes...

Corked concludeerde desondanks:

The answer contains no language attributed to Lisa.

Het behandelde de tekst als de woorden van de founder.
De eerder geselecteerde bronkeuze werd dus niet goed aan de evaluator doorgegeven, niet gebruikt of niet vertrouwd.
Corked vroeg vervolgens nogmaals:

What did Lisa say, in her own words?

Om verder te komen moesten we letterlijk invoeren:

Lisa said, "..."

De gebruiker moest daardoor dezelfde broninformatie twee keer geven.
Dit was niet strengheid tegen zwak bewijs, maar verlies of negeren van reeds bekende informatie.
Op het follow-upscherm stonden bovendien twee Continue-knoppen.
Het was niet zichtbaar wat het functionele verschil tussen die twee knoppen was.
Na het follow-upantwoord ging de flow door naar de Non-Case zonder een duidelijk afzonderlijk resultaat te tonen van wat Lisa's woorden precies hadden veranderd.
19. The Non-Case / The Limit
De laatste vraag was:

Who looks like they should have this problem but doesn't? Why not?

Dit was inhoudelijk een van de onderscheidendste Corked-vragen.
De vraag zocht niet naar nog meer bevestiging, maar naar een grens van het probleem.
De begeleidende tekst:

This is not a weakness to explain away. It is a sharpener. The boundary makes the need real.

communiceerde de bedoeling goed.

We noemden Maya:
freelance brand designer;
vergelijkbare werkomgeving;
accepteert revisies alleen in Figma;
start niet voordat alles daar staat;
verwijst voice notes terug naar Figma;
gebruikt WhatsApp niet als takenlijst.
Dit antwoord bevatte:
één concrete persoon;
een vergelijkbare rol;
een duidelijke non-case;
concreet gedrag;
een structurele reden waarom zij het probleem niet heeft;
een zichtbare grens van de behoefte.
Corkeds eigen analyse erkende dat ook:

The answer names a bounded individual and her specific working arrangement.

De analyse erkende bovendien:

The reason for immunity is present and specific.

Ondanks die positieve beoordeling werd The Limit slechts Clearing.
Onder What changed stond:

Corked could not pinpoint the exact phrase that would settle The Limit.

Dat is een cruciale tegenstrijdigheid:
Corked zegt dat de persoon concreet is;
Corked zegt dat de immuniteitsreden concreet is;
Corked maakt het element toch niet Settled;
Corked kan niet uitleggen wat werkelijk ontbreekt.
"Could not pinpoint" beschrijft de beperking van Corked, niet de tekortkoming van het antwoord.
De gebruiker kreeg geen concrete vervolgvraag om The Limit alsnog te settelen.
De enige actie was opnieuw Continue.
Daarmee liet Corked een element onaf terwijl het zelf niet kon zeggen hoe de gebruiker het moest afmaken.
20. Grape bleef aan het einde Clearing
Grape bleef gedurende de hele test Clearing.
Dat kwam doordat "my friend" volgens Corked onvoldoende concrete context bevatte.
De rest van Phase 1 leverde ondertussen veel concrete informatie over Lisa:
zij werkt met klanten;
ontvangt voice notes;
voert designwijzigingen uit;
gebruikt WhatsApp;
gebruikt soms Trello;
mist wijzigingen;
leverde een versie te laat.
Toch gebruikte Corked die latere informatie niet om de oorspronkelijke Grape-beoordeling automatisch te verdiepen.
De eerdere belofte dat latere elementen "the picture will sharpen" kwam hier niet uit.
Als Corked bewust alleen het oorspronkelijke relatieveld voor Grape gebruikt, had het dat duidelijk moeten maken.
Als latere evidence wel mag bijdragen, dan had Grape mogelijk kunnen settelen of een veel gerichtere vervolgvraag kunnen krijgen.
21. Het eindlabel
Na de zevende stap verscheen een volledige labelweergave.
De zes labelelementen werden zichtbaar opgesomd:
Grape;
The Tell;
Vintage;
The Gap;
The Echo;
The Limit.
Vier waren Settled:
Tell;
Vintage;
Gap;
Echo.
Twee waren Clearing:
Grape;
Limit.
De samenvatting 4 of 6 elements settled was correct.
Hier gebruikte Corked dus weer zes elementen, nadat de flow steeds over zeven elementen had gesproken.
Het eindlabel maakte zichtbaar welk bewijs de Spark inmiddels had verdiend.
Dat is conceptueel sterk: Phase 1 eindigde niet alleen met een chatgeschiedenis, maar met een inspecteerbaar bewijsobject.
De status kwam echter over alsof het label al het eindproduct was, terwijl het tegelijkertijd nog onaf was.
Dat is op zichzelf niet per se fout—een label kan een tussentijdse stand zijn—maar het onderscheid tussen:
current label;
settled label;
final Phase 1 label

was niet duidelijk.

De tekst zei:

Phase 2 opens when all six clear.

Elders is de positieve eindstatus Settled, niet "clear". 
Daardoor werden Clearing, clear en Settled taalkundig te dicht door elkaar gebruikt.
De tekst zei ook:

The bottle is aging, not finished.

Maar er was geen helder mechanisme dat vertelde wat er nu vanzelf zou gebeuren of wanneer Corked terug zou komen.
In werkelijkheid moest de gebruiker zelf opnieuw op de twee onafgemaakte elementen klikken.
22. Afgebroken teksten op het label
Meerdere bewijsregels werden midden in een woord afgekapt.
Voorbeelden:
"had to reop"
"remembering to do it immediate"
"revision requests as c"
Er stond geen ellipsis om te tonen dat de tekst bewust was ingekort.
Er was geen uitklapactie om de volledige evidence te bekijken.
Daardoor leek het alsof data corrupt was opgeslagen of slecht was gegenereerd.
Dit gebeurde precies op het scherm dat de verzamelde waarheid van de Spark moest presenteren.
Dat schaadt het vertrouwen zwaarder dan gewone visuele slordigheid.
23. Acties op het eindscherm
Bij Grape en Limit stond:

Tap to answer again.

Dat maakte niet duidelijk:
welk detail ontbreekt;
of het hele antwoord opnieuw beoordeeld wordt;
of dit opnieuw tokens kost;
of bestaande evidence behouden blijft.
De grootste primaire knop op het scherm was:

Cork another Spark.

De huidige Spark had echter nog twee onafgemaakte elementen.
Daardoor gaf de visuele hiërarchie meer nadruk aan een nieuw idee toevoegen dan aan het afronden van het huidige onderzoek.
Back to the Cellar was secundair.
Er was geen duidelijk blok:

Two elements remain
Sharpen Grape
Settle The Limit

De gebruiker eindigde dus met een juiste diagnose van onvolledigheid, maar zonder een sterk geordend herstelpad.
24. De Cellar na afloop
In de Cellar stond de Spark als kaart tussen de andere bottles.
De kaart toonde zes bolletjes.
Vier bolletjes waren groen en twee geel.
Dat was een compacte en correcte weergave van de labelstatus.
Visueel vertelde die zes-dotssamenvatting meteen:

Deze Spark heeft vier Settled-elementen en twee Clearing-elementen.

De tekststatus rechts zei echter:

Parked · a question to ask.

Dat was niet langer waar als beschrijving van de huidige bottle.
De geparkeerde Friction-vraag was inmiddels:
opnieuw geopend;
beantwoord;
beoordeeld;
gebruikt om Tell en Vintage te settelen;
gevolgd door alle resterende Phase 1-stappen.
Toch bleef de oude Parked-status als hoofdstatus van de bottle bestaan.
De Cellar-card combineerde daardoor twee verschillende systemen:
de zes bolletjes beschreven de staat van het Label;
de tekst beschreef een verouderde interactiestatus van één eerdere vraag.
De bolletjes en tekst vertelden verschillende verhalen over dezelfde bottle.
De status Parked liet het lijken alsof de hele Spark geparkeerd was.
In werkelijkheid was de Spark niet geparkeerd; het Label was onvolledig.
Een status als:

Still aging · 2 elements remain

zou de bottle veel nauwkeuriger hebben beschreven.

Parked is alleen nuttig zolang er daadwerkelijk een onbeantwoorde buitentaak wacht.
Zodra die taak is beantwoord, moet Parked overal verdwijnen.
25. Algemene patroonobservaties
Corkeds vragen waren inhoudelijk sterker dan de interface die hun voortgang beheerde.
De beste momenten ontstonden wanneer Corked uit concrete evidence meerdere labelelementen tegelijk kon versterken.
De zwakste momenten ontstonden wanneer Corked:
reeds gegeven informatie vergat;
interne state niet synchroniseerde;
een oordeel gaf zonder herstelpad;
interne evaluatorstaal aan de gebruiker liet zien.
De flow gebruikte drie verschillende betekenislagen door elkaar:
vragen/mechanismen;
labelelementen;
bottle- of interactionstatus.
Voor de gebruiker was niet altijd zichtbaar welke laag hij op dat moment bekeek.
Actuele vraagstatus, labelstatus en bottle-status hadden geen duidelijke hiërarchie.
De interface gaf historische statussen soms meer gewicht dan de huidige actie.
Corked kon vaak goed zeggen dát iets Clearing was, maar minder goed precies zeggen welke minimale extra informatie nodig was om het te Settlen.
Het systeem vroeg soms om bewijs dat al via een knop of eerder veld was vastgelegd.
De strengheid voelde daardoor niet altijd eerlijk. Soms testte Corked de werkelijkheid; soms testte het of de gebruiker dezelfde informatie in de exacte gewenste vorm herhaalde.
De AI-analyse was regelmatig langer en technischer dan nodig.
Dezelfde conclusie werd vaak drie keer gepresenteerd.
Tegelijkertijd waren de werkelijk belangrijke acties soms verborgen.
De interface legt veel nadruk op sfeer, terminologie en het kelderconcept, maar belangrijke operationele verschillen bleven vaag:
Park versus Answer now;
Clearing versus Settled;
Step versus Element;
current label versus settled label;
extracted versus confirmed;
schedule versus gate.
De desktopvorm voelde kleiner dan de beschikbare ruimte rechtvaardigde.
De lange connectorlijn, grote lege vlakken en kleine tekst versterkten dat gevoel.
De native witte tooltips bij sidebaritems pasten visueel niet bij de donkere Corked-interface.
Loading- en savingstatussen bleven soms zichtbaar nadat de state al verder was gegaan.
De gebruiker kon daardoor niet volledig vertrouwen op de statuswoorden in beeld.
Eindobservatie
Phase 1 bewees inhoudelijk wel degelijk iets over deze Spark:
Lisa heeft het probleem daadwerkelijk;
er is één concreet incident;
het veroorzaakt zichtbaar herstelwerk en vertraging;
Tom heeft hetzelfde probleem;
bestaande workarounds vragen handmatig werk;
Lisa heeft herkenbare eigen taal voor de frustratie;
Maya laat zien waar het probleem ophoudt.
Dat is aanzienlijk meer dan de oorspronkelijke Spark bevatte.
Corked deed zijn centrale inhoudelijke werk dus wél: het veranderde een los productidee in een beter begrensde claim met externe evidence.
Maar de gebruiker moest onderweg meerdere keren Corkeds interface en state omzeilen om daar te komen.
De kernvraag na deze test is daarom niet of de Phase 1-vragen goed zijn. Die zijn grotendeels goed.
De echte vraag is of Corked betrouwbaar kan onthouden:
wat de gebruiker al heeft gezegd;
waar de gebruiker nu is;
wat nog ontbreekt;
en welke ene actie dat ontbrekende bewijs kan leveren.
