<template>
	<Toast />

	<h3>Add new transaction</h3>
	<form id="form" @submit.prevent="onSubmit">
		<div class="form-control">
			<label for="text" class="form-label">Title</label>
			<input type="text" id="text" v-model="text" placeholder="e.g. Groceries" />
		</div>
		<div class="form-control">
			<label for="amount" class="form-label"
				>Amount <br />
				(negative: expense, positive: income)</label
			>
			<input type="text" id="amount" v-model="amount" placeholder="0.00" />
		</div>
		<button class="btn">Add transaction</button>
	</form>
</template>

<script setup>
import { ref } from 'vue';

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const text = ref('');
const amount = ref('');

// Custom event 'transactionSubmitted'
const emit = defineEmits(['transactionSubmitted']);

const toast = useToast();

const onSubmit = () => {
	// Show error message if either field is empty
	if (!text.value || !amount.value) {
		toast.add({ severity: 'error', summary: 'Error', detail: 'Both fields must be filled', life: 3000 });
		return;
	}

	const transactionData = {
		text: text.value,
		amount: parseFloat(amount.value),
	};

	// Show data
	emit('transactionSubmitted', transactionData);

	// Clear fields
	text.value = '';
	amount.value = '';
};
</script>
