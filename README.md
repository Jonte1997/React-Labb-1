Appen är en enkel receptapplikation där användaren kan se en lista med recept och själv hantera innehållet. Användaren kan lägga till nya recept via ett formulär, redigera befintliga recept och ta bort recept. För att göra appen mer användbar finns även funktioner för att söka efter recept, filtrera dem efter svårighetsgrad och sortera recepten från A-ö eller ö-A. Väldigt simpel och användarvänlig layout.

Appen använder DummyJSON Recipes API (https://dummyjson.com/recipes
) som ett öppet API för att hämta och ändra data. När appen startar skickas en GET-förfrågan för att hämta alla recept och visa dem i listan. När användaren fyller i formuläret och skapar ett nytt recept används en POST-förfrågan för att skicka datan till API:t. När ett recept redigeras används en PUT-förfrågan för att uppdatera det befintliga receptet. När användaren väljer att ta bort ett recept skickas en DELETE-förfrågan. På så sätt visar applikationen tydligt hur alla fyra typer av API-anrop används i praktiken. 

För VG valde jag att göra filtrering, sortering, sökning och laddningsindikator. 
