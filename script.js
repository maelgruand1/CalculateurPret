// Fonction pour calculer l'âge détaillé (en années, mois, jours)
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

// Fonction pour gérer l'événement de soumission du formulaire
function calculateAge(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    const birthDateInput = document.getElementById("birthDate").value;
    const currentDateInput = document.getElementById("currentDate").value;

    // Vérification que les champs sont remplis
    if (!birthDateInput || !currentDateInput) {
        alert("Veuillez remplir les deux champs.");
        return;
    }

    const birthDate = new Date(birthDateInput);
    const currentDate = new Date(currentDateInput);

    // Vérification de la cohérence des dates
    if (birthDate > currentDate) {
        alert("La date de naissance ne peut pas être après la date actuelle.");
        return;
    }

    // Calcul de l'âge détaillé
    const age = calculateDetailedAge(birthDate, currentDate);

    // Affichage du résultat
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("hidden");
    resultDiv.textContent = `Vous avez ${age.years} ans, ${age.months} mois et ${age.days} jours.`;
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    document.getElementById("ageForm").reset();
    const resultDiv = document.getElementById("result");
    resultDiv.classList.add("hidden");
    resultDiv.textContent = ""; // Efface le texte du résultat
}

// Écouteurs d'événements
document.getElementById("ageForm").addEventListener("submit", calculateAge);
document.getElementById("resetBtn").addEventListener("click", resetForm);
