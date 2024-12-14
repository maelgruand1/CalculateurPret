// Function to calculate detailed age (in years, months, days)
function calculateDetailedAge(date1, date2) {
    let years = date2.getFullYear() - date1.getFullYear();
    let months = date2.getMonth() - date1.getMonth();
    let days = date2.getDate() - date1.getDate();

    if (days < 0) {
        months--;
        const previousMonthDays = new Date(date2.getFullYear(), date2.getMonth(), 0).getDate();
        days += previousMonthDays;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

// Function to calculate the number of months between two dates
function calculateMonthsDifference(date1, date2) {
    return (date2.getFullYear() - date1.getFullYear()) * 12 + date2.getMonth() - date1.getMonth();
}

// Function to calculate the loan end date based on the number of installments (months)
function calculateLoanEndDate(loanStartDate, numberOfMonths) {
    const loanEndDate = new Date(loanStartDate);
    loanEndDate.setMonth(loanEndDate.getMonth() + numberOfMonths);
    return loanEndDate;
}

// Function to handle age calculation
function calculateAge(event) {
    event.preventDefault(); // Prevent page reload on form submission

    const birthDate = new Date(document.getElementById('dateNaiss').value);
    const loanStartDate = new Date(document.getElementById('loanStartDate').value);
    const numberOfMonths = parseInt(document.getElementById('numberOfMonths').value, 10); // Parse installments

    const today = new Date();

    // Validation checks
    if (birthDate > today) {
        alert("Birthdate cannot be in the future.");
        return;
    }

    if (isNaN(numberOfMonths) || numberOfMonths <= 0) {
        alert("Please enter a valid number of installments.");
        return;
    }

    // Calculate loan end date and ages
    const loanEndDate = calculateLoanEndDate(loanStartDate, numberOfMonths);
    const currentAge = calculateDetailedAge(birthDate, today);
    const loanEndAge = calculateDetailedAge(birthDate, loanEndDate);

    // Check if the loan duration is too long (age exceeds 100 years)
    if (loanEndAge.years >= 100) {
        alert("Loan not possible: Age at the end of the loan exceeds 100 years.");
        const resultDisplay = document.getElementById('result');
        resultDisplay.classList.add('hidden');
        resultDisplay.textContent = ''; // Clear the result display
        return;
    }

    // Display the results
    const resultDisplay = document.getElementById('result');
    resultDisplay.classList.remove('hidden');
    resultDisplay.textContent = `You are ${currentAge.years} years, ${currentAge.months} months, and ${currentAge.days} days old today.\n
At the end of the loan (${numberOfMonths} months), you will be ${loanEndAge.years} years, ${loanEndAge.months} months, and ${loanEndAge.days} days old.`;
}

// Function to reset the form and hide results
function resetForm() {
    document.getElementById('ageForm').reset();
    const resultDisplay = document.getElementById('result');
    resultDisplay.classList.add('hidden');
    resultDisplay.textContent = ''; // Clear the result content
}

// Event listeners for form submission and reset button
document.getElementById('ageForm').addEventListener('submit', calculateAge);
document.getElementById('resetBtn').addEventListener('click', resetForm);
