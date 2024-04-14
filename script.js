document.addEventListener('DOMContentLoaded', function () {
   document.querySelector('.btn-success').addEventListener('click', function () {
       if (validateAnswers()) {
           checkAnswers();
       } else {
           alert('Vastaa kaikkiin kysymyksiin ennen tarkistamista!');
       }
   });

   document.querySelector('.btn-secondary').addEventListener('click', function () {
       resetForm();
   });

   document.querySelector('.btn-danger').addEventListener('click', function () {
       redirectToAnotherPage();
   });

   function validateAnswers() {
       const questions = document.querySelectorAll('.test li');
       let answeredAll = true;

       questions.forEach(function (question) {
           const radios = question.querySelectorAll('.form-check-input');
           let answered = false;

           radios.forEach(function (radio) {
               if (radio.checked) {
                   answered = true;
               }
           });

           if (!answered) {
               answeredAll = false;
           }
       });

       return answeredAll;
   }
       function checkAnswers() {
           const questions = document.querySelectorAll('.test li');

           questions.forEach(function (question, index) {
               const radios = question.querySelectorAll('.form-check-input');
               let selectedAnswer = null;

               radios.forEach(function (radio) {
                   if (radio.checked) {
                       selectedAnswer = radio.value === 'true';
                   }
               });

               const correctAnswer = getCorrectAnswer(index);
               const result = question.querySelector('.result');

               if (selectedAnswer === correctAnswer) {
                   result.innerHTML = 'Oikein';
                   result.classList.add('correct');
                   result.classList.remove('incorrect');
                   question.style.border = '2px solid #4CAF50';
                   result.style.color = '#008000';
               } else {
                   result.innerHTML = 'Väärin';
                   result.classList.add('incorrect');
                   result.classList.remove('correct');
                   question.style.border = '2px solid #ff0d00';
                   result.style.color = '#ff0d00';
               }
           });

           document.querySelector('.btn-secondary').textContent = 'Kokeillaan vielä kerran';
           document.querySelector('.btn-success').style.visibility = 'hidden';
       }

       function resetForm() {
           const radios = document.querySelectorAll('.form-check-input');
           radios.forEach(function (radio) {
               radio.checked = false;
           });

           const results = document.querySelectorAll('.result');
           results.forEach(function (result) {
               result.innerHTML = '';
               result.classList.remove('correct', 'incorrect');
           });

           const questions = document.querySelectorAll('.test li');
           questions.forEach(function (question) {
               question.style.border = 'none';
           });

           document.querySelector('.btn-secondary').textContent = 'Tyhjennä lomake';
           document.querySelector('.btn-success').style.visibility = 'visible';
       }

       function redirectToAnotherPage() {
           window.location.href = 'your_destination_url';
       }

       function getCorrectAnswer(questionIndex) {
           const correctAnswers = [
               false,
               true,
               true,
               true,
               false,
               true,
               false
           ];

           return correctAnswers[questionIndex];
       }
   });
