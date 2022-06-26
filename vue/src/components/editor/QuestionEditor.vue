<template>
  
</template>

<script setup> // setup KEYWORD ENABLES US TO USE COMPOSITION API
    const props = defineProps({
        question: Object,
        index: Number
    })

    const emit = defineEmits(["change", "addQuestion", "deleteQuestions"])

    // RECREATE THE WHOLE QUESTION DATA TO AVOID UNINTENTIONAL REFERENCE CHANGE
    const model = ref(JSON.parse(JSON.stringify(props.question)))
</script>

<style>

</style>