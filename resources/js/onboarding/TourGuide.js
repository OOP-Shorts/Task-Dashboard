/* global introJs */

let tourAlreadyTaken = localStorage.getItem("tourAlreadyTaken") || false;

function addTourItem(selector, step, title, intro, scrollTo = "element", position = "auto") {
    let el = document.querySelector(selector);
    if (el === null) {
        return;
    }
    el.setAttribute("data-step", step);
    el.setAttribute("data-title", title);
    el.setAttribute("data-intro", intro);
    el.setAttribute("data-position", position);
    el.setAttribute("data-scrollTo", scrollTo);
}

class TourGuide {

    prepare() {
        addTourItem("content h1", 1, "OOP Shorts", "Auf dieser Seite haben wir einige Übungsaufgaben für dich vorbereitet. Jetzt erklären wir dir, wie du am besten damit arbeitest.");
        addTourItem(".tasks", 2, "Die Aufgaben", "In dieser Liste findest du alle Aufgaben.", "tooltip");
        addTourItem(".tasks .description", 3, "Kategorien", "Wir haben alle Aufgaben in Kategorien einsortiert.  Hier beschreiben wir, um welche Inhalte es genau geht.");
        addTourItem("nav", 4, "Navigation", "Über diese Links kannst du zwischen den Kategorien hin und her wechseln.");
        addTourItem(".tasks li:not(.description)", 5, "Schritt für Schritt", "Du kannst jede Aufgabe einzeln bearbeiten und dir theoretisch selber aussuchen wo du startest. Wir empfehlen aber, dass du alle Shorts in der vorgegebenen Reihenfolge bearbeitest.");
        addTourItem(".tasks li:not(.description) .description", 6, "Aufgabenbeschreibung", "Hier siehst du die eigentliche Aufgabenbeschreibung: Das sollst du im Code umsetzen.");
        addTourItem(".tasks li:not(.description) .estimate", 7, "Zeitangaben", "Hier haben wir geschätzt, wie lange du dich ungefähr mit dieser Aufgabe beschäftigen solltest, bis du eine erste funktionierende Lösung programmiert hast. Es kann sein, dass du wesentlich schneller fertig bist oder auch etwas länger brauchst. Das macht nichts. Wenn du aber viel länger ohne Erfolg an der Aufgabe sitzt, probiere vielleicht doch lieber noch eine der vorherigen Aufgaben aus.");
        addTourItem(".tasks li:not(.description) .hints i", 8, "Weitere Hinweise", "Für jede Aufgabe kannst du über diese Schaltfläche weitere Hinweise einblenden. Hier beschreiben wir auch, welche Kursinhalte dir bei der Lösung der Aufgabe helfen werden.");
        addTourItem(".tasks li:not(.description) .actions [data-action=\"starter\"]", 9, "Starterpaket", "Wie immer bekommst du von uns ein Starterpaket mit dem du direkt loslegen kannst. Alles was du zum Bearbeiten der Aufgabe brauchst, findest du dort. Lade die Datei herunter, entpacke das ZIP-Archiv und öffne das Projekt in IntelliJ.");
        addTourItem(".tasks li:not(.description) .actions [data-action=\"support\"]", 10, "Fragen und Antworten", "Falls du mal nicht weiter weißt, kannst du uns im Discord schreiben. Über diesen Link erreichst du den richtigen Kanal für diese Aufgabe.");
        addTourItem(".tasks li:not(.description) .category i", "Alles erledigt?", 11, "Wenn du eine Aufgabe erfolgreich abgeschlossen hast, kannst du das hier markieren. Dann siehst du auch den Link zu unserem Lösungsvorschlag.");
        addTourItem(".progress", 12, "Dein Fortschritt", "Hier siehst du jederzeit, wo du gerade stehst, und wie viele der Aufgaben du noch nicht abgeschlossen hast.");
        addTourItem(".tasks li:not(.description)", 13, "Los geht's!", "Das war's! Viel Erfolg beim Trainieren!");
    }

    start(force = false) {
        if (tourAlreadyTaken && !force) {
            return;
        }
        introJs().setOptions({
            showProgress: true,
            nextLabel: "Weiter",
            prevLabel: "Zurück",
            skipLabel: "Überspringen",
            doneLabel: "Fertig",
            showBullets: false,
            tooltipClass: "customTooltip",
        }).start();
        tourAlreadyTaken = true;
        localStorage.setItem("tourAlreadyTaken", true);
    }

}

export default TourGuide;