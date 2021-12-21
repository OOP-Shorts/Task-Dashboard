/* global introJs */

let tourAlreadyTaken = localStorage.getItem("tourAlreadyTaken") || false;

function addTourItem(selector, step, title, intro, scrollTo="element", position="auto") {
    console.log(selector);
    let el = document.querySelector(selector);
    if(el === null) {
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
        addTourItem(".tasks li:not(.description)", 4, "Aufgaben", "Du kannst jede Aufgabe einzeln bearbeiten und dir theoretisch selber aussuchen wo du startest. Wir empfehlen aber, dass du alle Shorts in der vorgegebenen Reihenfolge bearbeitest.");
        addTourItem(".tasks li:not(.description) .description", 5, "Aufgabenbeschreibung", "Hier siehst du die eigentliche Aufgabenbeschreibung: Das solltest du programmieren.");
        addTourItem(".tasks li:not(.description) .hints i", 6, "Weitere Hinweise", "Für jede Aufgabe kannst du über diese Schaltfläche weitere Hinweise einblenden. Hier beschreiben wir auch, welche Kursinhalte dir bei der Lösung der Aufgabe helfen werden." );
        addTourItem(".tasks li:not(.description) .actions [data-action=\"starter\"]", 7, "Starterpaket", "Wie immer bekommst du von uns ein Starterpaket mit dem du direkt loslegen kannst. Alles was du zum Bearbeiten der Aufgabe brauchst, findest du dort.");
        addTourItem(".tasks li:not(.description) .actions [data-action=\"support\"]", 8,"Fragen und Antworten", "Falls du mal nicht weiter weißt, kannst du uns im Discord schreiben. Über diesen Link erreichst du den richtigen Kanal für diese Frage.");
        addTourItem(".tasks li:not(.description) .category i", 9, "Alles erledigt?", "Wenn du eine Aufgabe erfolgreich abgeschlossen hast, kannst du das hier markieren. Dann siehst du auch den Link zu unserem Lösungsvorschlag.");
        addTourItem(".progress", 10, "Dein Fortschritt", "Hier siehst du jederzeit, wo du gerade stehst, und wie viele der Aufgaben du noch nicht abgeschlossen hast.");
        addTourItem(".tasks li:not(.description)", 11, "Los geht's!", "Das war's! Viel Erfolg beim Wiederholen!");
    }

    start(force = false) {
        if(tourAlreadyTaken && !force) {
            return;
        }
        introJs().start();
        tourAlreadyTaken = true;
        localStorage.setItem("tourAlreadyTaken", true);
    }

}

export default TourGuide;