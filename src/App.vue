<template>
	<Header />
	<div class="container">
		<Balance :total="+total" />
		<IncomeExpenses :income="+income" :expenses="+expenses" />
		<TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
		<AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
	</div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

import { useToast } from 'primevue/usetoast';

import { ref, computed, onMounted } from 'vue';

// Toast
const toast = useToast();

const transactions = ref([]);

// onMounted() is similar to useEffect() in React
onMounted(() => {
	const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

	if (savedTransactions) {
		transactions.value = savedTransactions;
	}
});

// Get total
const total = computed(() => {
	// Use .value to get actual array
	return transactions.value.reduce((acc, transaction) => {
		return acc + transaction.amount;
	}, 0); // Start at 0
});

// Get income
const income = computed(() => {
	// Filter to get positive values
	return transactions.value
		.filter((transaction) => transaction.amount > 0)
		.reduce((acc, transaction) => {
			return acc + transaction.amount;
		}, 0)
		.toFixed(2); // Round off to 2 decimal places ($0.00)
});

// Get expenses
const expenses = computed(() => {
	// Filter to get negative values
	return transactions.value
		.filter((transaction) => transaction.amount < 0)
		.reduce((acc, transaction) => {
			return acc + transaction.amount;
		}, 0)
		.toFixed(2); // Round off to 2 decimal places ($0.00)
});

// Add transaction
const handleTransactionSubmitted = (transactionData) => {
	// Push transaction data
	transactions.value.push({
		id: generateUniqueId(), // Generate ID per transaction
		text: transactionData.text,
		amount: transactionData.amount,
	});

	saveTransactionsToLocalStorage();

	toast.add({ severity: 'success', summary: 'Success', detail: 'Transaction added', life: 3000 });
};

// Delete transaction
const handleTransactionDeleted = (id) => {
	// Filter out transaction from DOM
	transactions.value = transactions.value.filter((transaction) => transaction.id !== id);

	saveTransactionsToLocalStorage();

	toast.add({ severity: 'success', summary: 'Success', detail: 'Transaction deleted', life: 3000 });
};

// Generate unique ID
const generateUniqueId = () => {
	return Math.floor(Math.random() * 1000000);
};

// Save to localStorage
const saveTransactionsToLocalStorage = () => {
	localStorage.setItem('transactions', JSON.stringify(transactions.value));
};
</script>
