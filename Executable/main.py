import tkinter as tk
from tkinter import ttk
from datetime import datetime, date
from dateutil.relativedelta import relativedelta
def calculate_loan():
    try:
        loan_amount = float(loan_amount_entry.get())
        interest_rate = float(interest_rate_entry.get()) / 100 / 12
        loan_term = int(loan_term_entry.get())
        birthdate_str = birthdate_entry.get()
        loan_start_date_str = loan_start_date_entry.get()

        monthly_payment = (loan_amount * interest_rate) / (1 - (1 + interest_rate) ** -loan_term)
        total_payment = monthly_payment * loan_term
        total_interest = total_payment - loan_amount

        # Age Calculation
        birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d").date()
        loan_start_date = datetime.strptime(loan_start_date_str, "%Y-%m-%d").date()
        loan_end_date = loan_start_date + relativedelta(months=loan_term)

        age_before_loan = relativedelta(loan_start_date, birthdate).years
        age_after_loan = relativedelta(loan_end_date, birthdate).years

        result_label.config(text=f"Monthly Payment: ${monthly_payment:.2f}\nTotal Payment: ${total_payment:.2f}\nTotal Interest: ${total_interest:.2f}\nAge Before Loan: {age_before_loan}\nAge After Loan: {age_after_loan}")

    except ValueError as e:
        result_label.config(text=f"Invalid input: {e}", foreground="red")
    except ZeroDivisionError:
        result_label.config(text="Loan Term cannot be zero.", foreground="red")
    else:
        result_label.config(foreground="black")

root = tk.Tk()
root.title("Loan Calculator with Age")
root.configure(bg="#f0f0f0")

style = ttk.Style()
style.configure("TLabel", background="#f0f0f0", font=("Arial", 10))
style.configure("TButton", font=("Arial", 10, "bold"), padding=5)
style.configure("TEntry", padding=5)

# Loan Amount
loan_amount_label = ttk.Label(root, text="Loan Amount:")
loan_amount_label.grid(row=0, column=0, padx=10, pady=5, sticky="w")
loan_amount_entry = ttk.Entry(root)
loan_amount_entry.grid(row=0, column=1, padx=10, pady=5)

# Interest Rate
interest_rate_label = ttk.Label(root, text="Annual Interest Rate (%):")
interest_rate_label.grid(row=1, column=0, padx=10, pady=5, sticky="w")
interest_rate_entry = ttk.Entry(root)
interest_rate_entry.grid(row=1, column=1, padx=10, pady=5)

# Loan Term (Months)
loan_term_label = ttk.Label(root, text="Loan Term (Months):")
loan_term_label.grid(row=2, column=0, padx=10, pady=5, sticky="w")
loan_term_entry = ttk.Entry(root)
loan_term_entry.grid(row=2, column=1, padx=10, pady=5)

# Birthdate (YYYY-MM-DD)
birthdate_label = ttk.Label(root, text="Birthdate (YYYY-MM-DD):")
birthdate_label.grid(row=3, column=0, padx=10, pady=5, sticky="w")
birthdate_entry = ttk.Entry(root)
birthdate_entry.grid(row=3, column=1, padx=10, pady=5)

# Loan Start Date (YYYY-MM-DD)
loan_start_date_label = ttk.Label(root, text="Loan Start Date (YYYY-MM-DD):")
loan_start_date_label.grid(row=4, column=0, padx=10, pady=5, sticky="w")
loan_start_date_entry = ttk.Entry(root)
loan_start_date_entry.grid(row=4, column=1, padx=10, pady=5)

# Calculate Button
calculate_button = ttk.Button(root, text="Calculate", command=calculate_loan)
calculate_button.grid(row=5, column=0, columnspan=2, pady=10)

# Result Label
result_label = ttk.Label(root, text="")
result_label.grid(row=6, column=0, columnspan=2)

for child in root.winfo_children():
    child.grid_configure(padx=5, pady=5)

root.mainloop()
