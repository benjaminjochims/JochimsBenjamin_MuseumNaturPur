const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener("click", event => {
    
    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!
    
    // const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
    // if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
    //   currentlyActiveAccordionItemHeader.classList.toggle("active");
    //   currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    // }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if(accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    }
    else {
      accordionItemBody.style.maxHeight = 0;
    }
    
  });
});




// Sicherstellen, dass das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("popup-overlay");

    // Mapping der Circle-Klassen zu den IDs der Popups
    const circleToPopupMap = {
        "cls-2": "popup-cls-2",
        "cls-12": "popup-cls-12",
        "cls-13": "popup-cls-13",
        "cls-14": "popup-cls-14",
        "cls-15": "popup-cls-15"
    };

    // Alle interaktiven Kreise ansprechen und Event-Listener hinzufügen
    Object.entries(circleToPopupMap).forEach(([circleClass, popupId]) => {
        const circles = document.querySelectorAll(`circle.${circleClass}`);
        
        circles.forEach(circle => {
            circle.addEventListener("click", function () {
                const popup = document.getElementById(popupId);
                
                // Prüfen, ob das Popup existiert
                if (popup) {
                    overlay.style.display = "block"; // Overlay anzeigen
                    popup.style.display = "block"; // Popup anzeigen
                }
            });
        });
    });

    // Funktion zum Schließen des Popups und des Overlays
    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = "none"; // Popup ausblenden
        }
        overlay.style.display = "none"; // Overlay ausblenden
    }

    // Overlay als Klickbereich zum Schließen des Popups nutzen
    overlay.addEventListener("click", function () {
        // Alle offenen Popups schließen
        Object.values(circleToPopupMap).forEach(popupId => closePopup(popupId));
    });

    // Globale Funktion verfügbar machen
    window.closePopup = closePopup;
});

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar ul");

    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active"); // Toggle das Hamburger-Icon
        navMenu.classList.toggle("show");    // Dropdown-Menü anzeigen/verstecken
    });
});





// Funktion zur Markierung der aktiven Links
function setActiveLinks(selector) {
  // Alle Links innerhalb des angegebenen Selektors abfragen
  const links = document.querySelectorAll(selector);

  // URL der aktuellen Seite abrufen
  const currentPage = window.location.pathname;

  // Durch Links iterieren und `active` hinzufügen
  links.forEach(link => {
    if (link.href.includes(currentPage)) {
      link.classList.add('active');
    }
  });
}

// Header-Links markieren
setActiveLinks('.navbar a');

// Footer-Links markieren
setActiveLinks('.footer-content a');











// Quiz-Fragen und Antworten
const questions = [
    {
        question: "Ruhen sich Honigbienen aus?",
        answers: {
            a: "Doch, sie schlafen etwa ein Drittel der Nacht.",
            b: "Nein, Bienen sind rund um die Uhr im Einsatz.",
            c: "Sie setzen sich hin und wieder auf eine Blume."
        },
        correct: "a"
    },
    {
        question: "Zu welcher Pflanzenfamilie gehören Walderdbeeren?",
        answers: {
            a: "Beerengewächse",
            b: "Nussgewächse",
            c: "Rosengewächse"
        },
        correct: "c"
    },
    {
        question: "Wie weit ist die Sonne von der Erde entfernt?",
        answers: {
            a: "78.000.000 km",
            b: "2.240.000.000 km",
            c: "149.600.000 km"
        },
        correct: "c"
    },
        {
        question: "Wie viele Moosarten gibt es laut heutigen wissenschaftlichen Erkenntnissen?",
        answers: {
            a: "122.000 bekannte Arten",
            b: "16.000 bekannte Arten",
            c: "800 bekannte Arten"
        },
        correct: "b"
    },    {
        question: "Welcher Wert bestimmt die Wasserqualität von fließenden Gewässern?",
        answers: {
            a: "Der Promillewert",
            b: "Saprobienwert",
            c: "HO-Wert"
        },
        correct: "b"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    showQuestion();
}

function cancelQuiz() {
    alert('Das Quiz wurde abgebrochen.');
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    const buttons = document.querySelectorAll('#quiz-questions .button');
    buttons[0].textContent = question.answers.a;
    buttons[1].textContent = question.answers.b;
    buttons[2].textContent = question.answers.c;
}

function checkAnswer(answer) {
    const question = questions[currentQuestionIndex];
    document.getElementById('quiz-questions').style.display = 'none';
    document.getElementById('feedback-screen').style.display = 'block';

    if (answer === question.correct) {
        document.getElementById('feedback-text').textContent = "Super, deine Antwort ist RICHTIG!";
        score++;
    } else {
        document.getElementById('feedback-text').textContent = "Oh, leider ist deine Antwort FALSCH.";
        document.getElementById('retry-button').style.display = 'inline-block';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('feedback-screen').style.display = 'none';
    document.getElementById('retry-button').style.display = 'none';

    if (currentQuestionIndex < questions.length) {
        document.getElementById('quiz-questions').style.display = 'block';
        showQuestion();
    } else {
        showResults();
    }
}

function retryQuestion() {
    document.getElementById('feedback-screen').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    document.getElementById('retry-button').style.display = 'none';
}

function showResults() {
    document.getElementById('feedback-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'block';
    document.getElementById('result-message').textContent = `Du hast ${score} von ${questions.length} Fragen richtig beantwortet!`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('results-screen').style.display = 'none';
    startQuiz();
}

function endQuiz() {
    alert('Vielen Dank fürs Mitmachen!');
}



function showResults() {
    document.getElementById('feedback-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'block';

    const resultMessage = `Du hast ${score} von ${questions.length} Fragen richtig beantwortet!`;
    document.getElementById('result-message').textContent = resultMessage;

    // Formularfelder ausfüllen
    document.getElementById('score').value = score;
    document.getElementById('total_questions').value = questions.length;
}


















