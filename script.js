function generateSubjectFields() {
    var numSubjects = parseInt(document.getElementById('numSubjects').value);

    if (isNaN(numSubjects) || numSubjects <= 0) {
        displayError("Please enter a valid number of subjects.");
        return;
    }

    var subjectsContainer = document.getElementById('subjectsContainer');
    subjectsContainer.innerHTML = '';

    for (var i = 1; i <= numSubjects; i++) {
        var subjectRow = document.createElement('div');
        subjectRow.classList.add('subject-row');

        var label = document.createElement('label');
        label.textContent = 'Subject ' + i;

        var creditInput = document.createElement('input');
        creditInput.type = 'number';
        creditInput.placeholder = 'Credit Hours';
        creditInput.id = `credit${i}`;
        creditInput.required = true;

        var gradeInput = document.createElement('input');
        gradeInput.type = 'text';
        gradeInput.placeholder = 'Grade (Letter)';
        gradeInput.id = `grade${i}`;
        gradeInput.required = true;

        subjectRow.appendChild(label);
        subjectRow.appendChild(creditInput);
        subjectRow.appendChild(gradeInput);

        subjectsContainer.appendChild(subjectRow);
    }

    document.getElementById('calculateButton').style.display = 'block';
    document.getElementById('resetButton').style.display = 'none';
}

function calculateGPA() {
    var numSubjects = parseInt(document.getElementById('numSubjects').value);

    if (isNaN(numSubjects) || numSubjects <= 0) {
        displayError("Please enter a valid number of subjects.");
        return;
    }

    var totalCredits = 0;
    var totalGradePoints = 0;

    for (var i = 1; i <= numSubjects; i++) {
        var creditInput = document.getElementById(`credit${i}`);
        var gradeInput = document.getElementById(`grade${i}`);

        var credit = parseFloat(creditInput.value);
        var grade = gradeInput.value.toUpperCase();

        if (isNaN(credit) || credit <= 0 || !isValidGrade(grade)) {
            displayError("Please enter valid numeric values for credit hours and valid letter grades.");
            return;
        }

        totalCredits += credit;
        totalGradePoints += (credit * convertGradeToNumeric(grade));
    }

    if (totalCredits === 0) {
        displayError("Total credit hours cannot be zero.");
        return;
    }

    var gpa = totalGradePoints / totalCredits;
    displayResult(gpa.toFixed(2));

    document.getElementById('calculateButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'block';
}

function displayResult(gpa) {
    var modalContainer = document.createElement('div');
    modalContainer.id = 'modalContainer';
    modalContainer.innerHTML = `
        <div id="modalContent">
            <p>Your GPA is: <strong>${gpa}</strong></p>
            <button onclick="closeModal()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modalContainer);
}

function closeModal() {
    var modalContainer = document.getElementById('modalContainer');
    modalContainer.parentNode.removeChild(modalContainer);
}
function displayError(message) {
    var errorContainer = document.getElementById('errorContainer');

    // Check if the error container already exists
    if (errorContainer) {
        closeError(); // Close any existing error popups
    }

    // Create and display the new error container
    errorContainer = document.createElement('div');
    errorContainer.id = 'errorContainer';
    errorContainer.innerHTML = `
        <div id="errorContent">
            <p>Error: ${message}</p>
            <button onclick="closeError()">Close</button>
        </div>
    `;

    document.body.appendChild(errorContainer);
}

function closeError() {
    var errorContainer = document.getElementById('errorContainer');

    // Check if the error container exists before attempting to remove it
    if (errorContainer) {
        errorContainer.parentNode.removeChild(errorContainer);
    }
}


function isValidGrade(grade) {
    var validGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D'];
    
    if (!validGrades.includes(grade)) {
        displayError("Please enter a valid letter grade.");
        return false;
    }

    return true;
}

function convertGradeToNumeric(grade) {
    switch (grade) {
        case 'A+':
            return 4.0;
        case 'A':
            return 3.6;
        case 'B+':
            return 3.2;
        case 'B':
            return 2.8;
        case 'C+':
            return 2.4;
        case 'C':
            return 2.0;
        case 'D+':
            return 1.6;
        case 'D':
            return 1.2;
        default:
            return 0.0;
    }
}

function resetFields() {
    document.getElementById('numSubjects').value = '';
    document.getElementById('subjectsContainer').innerHTML = '';
    document.getElementById('result').innerText = '';
    document.getElementById('calculateButton').style.display = 'block';
    document.getElementById('resetButton').style.display = 'none';
}

function toggleDarkMode() {
    var body = document.body;
    var calculator = document.getElementById('calculator');
    var modeSwitch = document.getElementById('modeSwitch');
    var modeLabel = document.getElementById('modeLabel');

    if (modeSwitch.checked) {
        body.classList.add('dark-mode');
        calculator.classList.add('dark-mode');
        modeLabel.innerText = 'Light Mode';
    } else {
        body.classList.remove('dark-mode');
        calculator.classList.remove('dark-mode');
        modeLabel.innerText = 'Dark Mode';
    }
}

function showAboutPopup() {
    var aboutPopup = document.getElementById('aboutPopup');
    aboutPopup.style.display = 'block';
}

function closeAboutPopup() {
    var aboutPopup = document.getElementById('aboutPopup');
    aboutPopup.style.display = 'none';
}
function toggleDarkMode() {
    var body = document.body;
    var calculator = document.getElementById('calculator');
    var modeSwitch = document.getElementById('modeSwitch');
    var modeLabel = document.getElementById('modeLabel');

    if (modeSwitch.checked) {
        body.classList.add('dark-mode');
        calculator.classList.add('dark-mode');
        modeLabel.innerText = 'Light Mode';
    } else {
        body.classList.remove('dark-mode');
        calculator.classList.remove('dark-mode');
        modeLabel.innerText = 'Dark Mode';
    }

    // Toggle light mode class
    body.classList.toggle('light-mode', !modeSwitch.checked);
    calculator.classList.toggle('light-mode', !modeSwitch.checked);
}
function toggleDarkMode() {
    var body = document.body;
    var calculator = document.getElementById('calculator');
    var modeSwitch = document.getElementById('modeSwitch');
    var modeLabel = document.getElementById('modeLabel');

    if (modeSwitch.checked) {
        body.classList.add('dark-mode');
        calculator.classList.add('dark-mode');
        modeLabel.innerText = 'Dark Mode';
    } else {
        body.classList.remove('dark-mode');
        calculator.classList.remove('dark-mode');
        modeLabel.innerText = 'Light Mode';
    }

    // Toggle light mode class
    body.classList.toggle('light-mode', !modeSwitch.checked);
    calculator.classList.toggle('light-mode', !modeSwitch.checked);
}
