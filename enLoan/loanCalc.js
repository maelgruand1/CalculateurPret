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

// Fonction pour calculer la différence en mois entre deux dates
function calculateMonthsDifference(date1, date2) {
    const months = (date2.getFullYear() - date1.getFullYear()) * 12 + date2.getMonth() - date1.getMonth();
    return months;
}

// Fonction pour calculer la date de fin du prêt à partir du nombre d'échéances (mois)
function calculateLoanEndDate(loanStartDate, numberOfMonths) {
    const loanEndDate = new Date(loanStartDate);
    loanEndDate.setMonth(loanEndDate.getMonth() + numberOfMonths); // Ajouter les mois des échéances
    return loanEndDate;
}

// Fonction pour calculer l'âge
function calculateAge(event) {
    event.preventDefault(); // Empêche la soumission du formulaire et le rechargement de la page

    const birthDate = new Date(document.getElementById('dateNaiss').value);
    const loanStartDate = new Date(document.getElementById('loanStartDate').value);
    const numberOfMonths = parseInt(document.getElementById('numberOfMonths').value); // Nombre d'échéances
    const today = new Date();

    // Vérifier si la date de naissance est dans le futur par rapport à aujourd'hui
    if (birthDate > today) {
        alert("La date d'aujourd'hui ne peut pas être antérieure à votre date de naissance.");
        return;
    }

    // Vérifier si le nombre d'échéances est valide
    if (isNaN(numberOfMonths) || numberOfMonths <= 0) {
        alert("Veuillez entrer un nombre valide d'échéances.");
        return;
    }
    

    // Calcul de la date de fin du prêt à partir de la date de début et du nombre d'échéances
    const loanEndDate = calculateLoanEndDate(loanStartDate, numberOfMonths);

    // Calcul de l'âge actuel
    const currentAge = calculateDetailedAge(birthDate, today);

    // Calcul de l'âge à la fin du prêt
    const loanEndAge = calculateDetailedAge(birthDate, loanEndDate);

    // Affichage du résultat
    const resultDisplay = document.getElementById('result');
        resultDisplay.classList.remove('hidden'); // Affiche le div du résultat
        resultDisplay.textContent = `Vous avez ${currentAge.years} ans, ${currentAge.months} mois et ${currentAge.days} jours aujourd'hui.\n
                               À la fin du prêt, vous aurez ${loanEndAge.years} ans, ${loanEndAge.months} mois et ${loanEndAge.days} jours.\n
                               Le prêt dure ${numberOfMonths} mois.`;
    const mort = loanEndAge < 100;
    if(numberOfMonths >= 1000){
        loanEndAge > 100
        var tMort = true;
        alert("Pret impossible : Mort");
        const resultDisplay = document.getElementById('result');
        resultDisplay.classList.add('hidden'); // Affiche le div du résultat
    }
    
}

// Fonction pour réinitialiser le formulaire et cacher le résultat
function resetForm() {
    document.getElementById('ageForm').reset();
    const resultDisplay = document.getElementById('result');
    resultDisplay.classList.add('hidden'); // Masquer le résultat
    resultDisplay.textContent = ''; // Vider le texte du résultat
}

// Événements pour le formulaire et le bouton reset
document.getElementById('ageForm').addEventListener('submit', calculateAge);
document.getElementById('resetBtn').addEventListener('click', resetForm);
