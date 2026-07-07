document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault(); // Prevent page reload
      const targetId = link.getAttribute('data-link');

      sections.forEach(s => s.classList.remove('active'));

      const activeSection = document.getElementById(targetId);
      if (activeSection) activeSection.classList.add('active');
    });
  });


  const quizContainer = document.getElementById('quizContainer');
  const submitBtn = document.getElementById('submit');
  const resultDiv = document.getElementById('result');

  if (!quizContainer || !submitBtn || !resultDiv) {
    console.error('Quiz elements not found in DOM.');
    return;
  }

  const sourceSelector = document.createElement('select');
  sourceSelector.innerHTML = `
    <option value="/api/general">General</option>
    <option value="/api/history">History</option>
    <option value="/api/politic">Politics</option>
    <option value="/api/mythology">Mythology</option>
    <option value="/api/geography">Geography</option>
  `;
  quizContainer.parentNode.insertBefore(sourceSelector, quizContainer);

  let questions = [];

  function decodeHTML(str) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }

  async function loadQuiz(apiUrl) {
    if (!apiUrl) return;
    try {
      quizContainer.innerHTML = 'Loading quiz...';
      resultDiv.textContent = '';

      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const data = await res.json();
      questions = Array.isArray(data.results) ? data.results : data;

      if (!questions.length) {
        quizContainer.innerHTML = 'No questions found.';
        return;
      }

      quizContainer.innerHTML = '';
      questions.forEach((q, i) => {
        const answers = [...(q.incorrect_answers || []), q.correct_answer]
            .sort(() => Math.random() - 0.5);

        const div = document.createElement('div');
        div.classList.add('question');
        div.innerHTML = `
          <h3>Q${i + 1}: ${decodeHTML(q.question)}</h3>
          ${answers.map(ans => `
            <label>
              <input type="radio" name="question${i}" value="${ans}">
              ${decodeHTML(ans)}
            </label><br>
          `).join('')}
        `;
        quizContainer.appendChild(div);
      });

    } catch (error) {
      quizContainer.innerHTML = 'Error loading quiz questions.';
      console.error('Quiz Load Error:', error);
    }
  }

  submitBtn.addEventListener('click', () => {
    let score = 0;

    questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="question${i}"]:checked`);
      if (selected && selected.value === q.correct_answer) {
        score++;
      }
    });

    resultDiv.textContent = `You scored ${score} out of ${questions.length}`;
  });

  sourceSelector.addEventListener('change', () => {
    loadQuiz(sourceSelector.value);
  });

  function autoCycleCategories(delay = 3000) {
    const options = sourceSelector.options;
    let index = 0;
    const interval = setInterval(() => {
      if (index >= options.length) {
        clearInterval(interval);
        return;
      }
      sourceSelector.selectedIndex = index;
      sourceSelector.dispatchEvent(new Event('change'));
      index++;
    }, delay);
  }
  loadQuiz(sourceSelector.value);

});
