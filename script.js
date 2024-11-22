const categories = [
    {
      id: 'science',
      name: 'Science',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/></svg>`,
      description: 'Test your knowledge of scientific concepts',
      backgroundColor: '#2563eb'
    },
    {
      id: 'history',
      name: 'History',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
      description: 'Journey through time with historical facts',
      backgroundColor: '#d97706'
    },
    {
      id: 'geography',
      name: 'Geography',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>`,
      description: "Explore the world's places and features",
      backgroundColor: '#059669'
    }
  ];
  
  const questions = [
    {
      id: 1,
      category: 'science',
      question: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Fe', 'Cu'],
      correctAnswer: 0,
    },
    {
      id: 2,
      category: 'science',
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
      correctAnswer: 2,
    },
    {
      id: 3,
      category: 'history',
      question: 'In which year did World War II end?',
      options: ['1943', '1944', '1945', '1946'],
      correctAnswer: 2,
    },
    {
      id: 4,
      category: 'history',
      question: 'Who was the first President of the United States?',
      options: ['John Adams', 'Thomas Jefferson', 'Benjamin Franklin', 'George Washington'],
      correctAnswer: 3,
    },
    {
      id: 5,
      category: 'geography',
      question: 'What is the capital of Japan?',
      options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
      correctAnswer: 2,
    },
    {
      id: 6,
      category: 'geography',
      question: 'Which is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswer: 3,
    }
  ];
  
  class QuizApp {
    constructor() {
      this.currentCategory = null;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.categoryQuestions = [];
  
      // DOM elements
      this.categoriesContainer = document.getElementById('categories');
      this.quizContainer = document.getElementById('quiz-container');
      this.resultScreen = document.getElementById('result-screen');
      this.categoryName = document.getElementById('category-name');
      this.questionElement = document.getElementById('question');
      this.optionsContainer = document.getElementById('options');
      this.progressBar = document.getElementById('progress');
      this.scoreText = document.getElementById('score-text');
      this.scoreProgress = document.getElementById('score-progress');
      this.restartButton = document.getElementById('restart-btn');
  
      this.initializeApp();
    }
  
    initializeApp() {
      this.renderCategories();
      this.restartButton.addEventListener('click', () => this.resetQuiz());
    }
  
    renderCategories() {
      this.categoriesContainer.innerHTML = categories.map(category => `
        <button 
          class="category-card" 
          style="background-color: ${category.backgroundColor}"
          data-category="${category.id}"
        >
          ${category.icon}
          <h3>${category.name}</h3>
          <p>${category.description}</p>
        </button>
      `).join('');
  
      this.categoriesContainer.addEventListener('click', (e) => {
        const categoryCard = e.target.closest('.category-card');
        if (categoryCard) {
          const categoryId = categoryCard.dataset.category;
          this.startQuiz(categoryId);
        }
      });
    }
  
    startQuiz(categoryId) {
      this.currentCategory = categoryId;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.categoryQuestions = questions.filter(q => q.category === categoryId);
      
      this.categoriesContainer.classList.add('hidden');
      this.quizContainer.classList.remove('hidden');
      this.resultScreen.classList.add('hidden');
      
      const category = categories.find(c => c.id === categoryId);
      this.categoryName.textContent = category.name;
      
      this.showQuestion();
    }
  
    showQuestion() {
      const question = this.categoryQuestions[this.currentQuestionIndex];
      this.questionElement.textContent = question.question;
      
      this.optionsContainer.innerHTML = question.options.map((option, index) => `
        <button class="option" data-index="${index}">${option}</button>
      `).join('');
  
      const progress = ((this.currentQuestionIndex + 1) / this.categoryQuestions.length) * 100;
      this.progressBar.style.width = `${progress}%`;
  
      this.optionsContainer.addEventListener('click', this.handleOptionClick.bind(this));
    }
  
    handleOptionClick(e) {
      const option = e.target.closest('.option');
      if (!option || option.disabled) return;
  
      const selectedIndex = parseInt(option.dataset.index);
      const question = this.categoryQuestions[this.currentQuestionIndex];
      const isCorrect = selectedIndex === question.correctAnswer;
  
      // Disable all options
      const options = this.optionsContainer.querySelectorAll('.option');
      options.forEach(opt => opt.disabled = true);
  
      // Show result
      option.classList.add(isCorrect ? 'correct' : 'wrong');
      options[question.correctAnswer].classList.add('correct');
  
      if (isCorrect) this.score++;
  
      // Move to next question or show results
      setTimeout(() => {
        if (this.currentQuestionIndex < this.categoryQuestions.length - 1) {
          this.currentQuestionIndex++;
          this.showQuestion();
        } else {
          this.showResults();
        }
      }, 1500);
    }
  
    showResults() {
      this.quizContainer.classList.add('hidden');
      this.resultScreen.classList.remove('hidden');
      
      const percentage = (this.score / this.categoryQuestions.length) * 100;
      this.scoreText.textContent = `You scored ${this.score} out of ${this.categoryQuestions.length}`;
      this.scoreProgress.style.width = `${percentage}%`;
    }
  
    resetQuiz() {
      this.resultScreen.classList.add('hidden');
      this.categoriesContainer.classList.remove('hidden');
      this.currentCategory = null;
      this.currentQuestionIndex = 0;
      this.score = 0;
    }
  }
  
  // Initialize the app
  document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
  });