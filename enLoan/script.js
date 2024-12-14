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

// Function to handle the form submission event
function calculateAge(event) {
    event.preventDefault(); // Prevents form submission

    const birthDateInput = document.getElementById("birthDate").value;

    // Check that the field is filled
    if (!birthDateInput) {
        alert("Please enter your date of birth.");
        return;
    }

    const birthDate = new Date(birthDateInput);
    const currentDate = new Date(); // Automatically retrieves the current date

    // Check the consistency of dates
    if (birthDate > currentDate) {
        alert("The date of birth cannot be in the future.");
        return;
    }

    // Calculate the detailed age
    const age = calculateDetailedAge(birthDate, currentDate);

    // Display the result
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("hidden");
    resultDiv.textContent = `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;
}

// Function to reset the form
function resetForm() {
    document.getElementById("ageForm").reset();
    const resultDiv = document.getElementById("result");
    resultDiv.classList.add("hidden");
    resultDiv.textContent = ""; // Clears the result text
}

// Event listeners
document.getElementById("ageForm").addEventListener("submit", calculateAge);
document.getElementById("resetBtn").addEventListener("click", resetForm);
