const quizData = [

  { q: "aoi (blue)", options: ["あおい", "おあい", "あおけ", "おあけ"], correct: "あおい" },

  { q: "kega (injury)", options: ["けが", "いが", "いか", "けか"], correct: "けが" },

  { q: "eki (station)", options: ["えき", "いき", "いぎ", "えぎ"], correct: "えき" },

  { q: "isu (chair)", options: ["いす", "けす", "せす", "えす"], correct: "いす" },

  { q: "kiku (to listen, to ask)", options: ["きく", "さく", "さぐ", "きぐ"], correct: "きく" },

  { q: "aji (taste)", options: ["あし", "おじ", "あじ", "おし"], correct: "あじ" },

  { q: "ai (love)", options: ["あい", "おい", "おけ", "あけ"], correct: "あい" },

  { q: "ookii (big)", options: ["おおきい", "あおきい", "おおけい", "おきい"], correct: "おおきい" },

  { q: "akai (red)", options: ["あかい", "おかい", "あけい", "あかけ"], correct: "あかい" },

  { q: "sushi", options: ["すし", "すじ", "そし", "しす"], correct: "すし" },

  { q: "ishi (intention)", options: ["いし", "あし", "うし", "いじ"], correct: "いし" },

  { q: "eizo (picture)", options: ["えいぞ", "えぞ", "えいそ", "えいず"], correct: "えいぞ" },

  { q: "seiji (politics)", options: ["せいじ", "せじ", "せじい", "しじ"], correct: "せいじ" },

  { q: "keizai (economics)", options: ["けいざい", "けざい", "けいさい", "けいざ"], correct: "けいざい" },

  { q: "kaze (wind)", options: ["かぜ", "かせ", "がせ", "がぜ"], correct: "かぜ" },

  { q: "gaikoku (abroad)", options: ["がいこく", "かいこく", "がいかく", "がいく"], correct: "がいこく" },
{ q: "jiki (period of time)", options: ["じき", "しき", "じぎ", "じけ"], correct: "じき" },

  { q: "chiisai (small)", options: ["ちいさい", "ちさい", "ちいせい", "ちさ"], correct: "ちいさい" },

  { q: "kazu (quantity)", options: ["かず", "かす", "かつ", "かじ"], correct: "かず" },

  { q: "okashii (weird)", options: ["おかしい", "あかしい", "おかし", "おかせい"], correct: "おかしい" }

];

const quizContainer = document.getElementById("quiz");

let currentQuestion = 0;

let score = 0;

// Shuffle function

function shuffle(array) {

  for (let i = array.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];

  }

  return array;

}

// Shuffle questions at start

const shuffledQuizData = shuffle([...quizData]);
 
// Show a single question with 4 buttons //
function showQuestion(index) {

  const item = shuffledQuizData[index];

  const shuffledOptions = shuffle([...item.options]);

  quizContainer.innerHTML = `

    <div class="question">

      <p>${index + 1}. <b>${item.q}</b></p>

      <div id="options">

        ${shuffledOptions.map(opt => `<button class="option-btn">${opt}</button>`).join('')}

      </div>

      <div id="feedback" style="margin-top:10px;font-weight:bold;"></div>

    </div>

  `;

  const feedback = document.getElementById("feedback");

  const buttons = document.querySelectorAll(".option-btn");
buttons.forEach(button => {

    button.addEventListener("click", () => {

      // Disable all buttons after one is clicked

      buttons.forEach(btn => btn.disabled = true);

      if (button.textContent === item.correct) {

        feedback.textContent = "✅ Correct!";

        feedback.style.color = "green";

        score++;

        button.style.backgroundColor = "#a4de02"; // highlight correct

      } else {

        feedback.textContent = `❌ Incorrect! Correct answer: ${item.correct}`;

        feedback.style.color = "red";

        button.style.backgroundColor = "#f08080"; // highlight incorrect

        // Highlight correct button

        buttons.forEach(btn => {

          if (btn.textContent === item.correct) {

            btn.style.backgroundColor = "#a4de02";

          }

        });

      }

      // Next button after answer

      const nextBtn = document.createElement("button");
nextBtn.textContent = (currentQuestion === shuffledQuizData.length - 1) ? "Finish" : "Next";

      nextBtn.style.marginTop = "15px";

      nextBtn.addEventListener("click", () => {

        currentQuestion++;

        if (currentQuestion < shuffledQuizData.length) {

          showQuestion(currentQuestion);

        } else {

          quizContainer.innerHTML = `<h2>Your score: ${score} / ${shuffledQuizData.length}</h2>`;

        }

      });

      quizContainer.appendChild(nextBtn);

    });

  });

}

showQuestion(currentQuestion);
