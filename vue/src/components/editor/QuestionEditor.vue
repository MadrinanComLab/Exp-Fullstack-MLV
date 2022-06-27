<template>
    <div>
        <!--/ QUESTION INDEX /-->
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold">
                {{ index + 1 }}.) {{ model.question }}
            </h3>
            
            <div class="flex items-center">
                <!--/ ADD NEW QUESTION /-->
                <button type="button" @click="addQuestion" class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                </button>

                <!--/ DELETE QUESTION /-->
                <button type="button" @click="deleteQuestion" class="flex items-center text-xs py-1 px-3 mr-2 rounded border border-transparent text-red-500 hover:text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    Delete
                </button>
            </div>
        </div>

        <div class="grid gap-3 grid-cols-12">
            <!--/ QUESTION /-->
            <div class="mt-3 col-span-9">
                <label :for="'quesion_text_' + model.data" class="block text-sm font-medium text-gray-700">
                    Question Text
                </label>

                <input type="text" :name="'quesion_text_' + model.data" :id="'quesion_text_' + model.data" v-model="model.question" @change="dataChange" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </div>

            <!--/ QUESTION TYPE /-->
            <div class="mt-3 col-span-3">
                <label for="question_type" class="block text-sm font-medium text-gray-700">
                    Select Question Type

                    <!--//! COMBO BOX DOESN'T WORK SAME AS THE TUTORIAL SHOWS /-->
                    <select name="question_type" id="question_type" v-model="model.type" @change="typeChange" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option v-for="type in questionTypes" :key="type" :value="type">
                            {{ upperCaseFirst(type) }}
                        </option>
                    </select>
                </label>
            </div>
        </div>
        
        <!--/ QUESTION DESCRIPTION /-->
        <div class="mt-3 col-span-9">
            <label :for="'question_description_' + model.id" class="block text-sm font-medium text-gray-700">
                Description
            </label>

            <textarea :name="'question_description_' + model.id" :id="'question_description_' + model.id" v-model="model.description" @change="dataChange" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
        </div>

        <!--/ DATA /-->
        <div>
            <div v-if="shouldHaveOptions" class="mt-2">
                <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
                    Options

                    <!--/ ADD NEW OPTIONS /-->
                    <button type="button" @click="addOption" class="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Option
                    </button>
                </h4>

                <!--/ IF QUESTION DOES NOT HAVE OPTIONS /--><!--/ //! THIS PART HAS BUG /-->
                <div v-if="typeof(model.data.options) === 'undefined' || !model.data.options.length" class="text-xs text-gray-600 py-3">
                    You don't have options defined
                </div>

                <!--/ IF QUESTON HAVE OPTIONS /-->
                <div v-for="(option, index) in model.data.options" :key="option.uuid" class="flex items-center mb-1">
                    <span class="w-6 text-sm">{{ index + 1 }}.) </span>
                    <input type="text" v-model="option.text" @change="dataChange" class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500">
                    
                    <!--/ DELETE OPTION /-->
                    <button type="button" @click="removeOption(option)" class="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <hr class="my-4">
    </div>
</template>

<script setup> // setup KEYWORD ENABLES US TO USE COMPOSITION API
    import { ref, computed } from "vue"
    import store from "../../store"
    import { v4 as uuidv4 } from "uuid"

    const props = defineProps({
        question: Object,
        index: Number
    })

    const emit = defineEmits(["change", "addQuestion", "deleteQuestions"])

    // RECREATE THE WHOLE QUESTION DATA TO AVOID UNINTENTIONAL REFERENCE CHANGE
    const model = ref(JSON.parse(JSON.stringify(props.question)))

    // GET QUESTION TYPES FROM vuex
    const questionTypes = computed(() => store.state.questionTypes)

    // DEFINING FUNCTIONS FOR THIS COMPONENT
    const upperCaseFirst = (str) => {
        // GET THE FIRST CHARACTER IN str AND CONVERT IT INTO UPPERCASE THEN CONCATINATE IT TO str WITHOUT THE FIRST CHARACTER
        return str.charAt(0).toUpperCase() + str.slice(1)
    } 

    const shouldHaveOptions = () => {
        // THIS WILL CHECK IF model.value.type IS EQUAL TO select, radio OR checkbox
        return [ "select", "radio", "checkbox" ].includes(model.value.type)
    }

    const getOptions = () => {
        return model.value.data.options
    }

    const setOptions = (options) => {
        model.value.data.options = options
    }

    const addOption = () => {
        setOptions([
            ...getOptions(),
            { uuid: uuidv4(), text: "" }
        ])

        dataChange()
    }

    const removeOption = (option) => {
        // THIS WILL FILTER OUT (REMOVE) option THAT IS NOT EQUAL TO opt
        // NOTE: filter() WILL CYCLE THROUGH THE DATA INSIDE GET OPTION THAT IS WHY IT HAS ANNOYMOUS FUNCTION INSIDE
        setOptions(getOptions().filter((opt) => opt != option))
        dataChange()
    }

    const typeChange = () => { // ! THIS PART HAS BUG
        console.log("SHOULD HAVE OPT?: " + shouldHaveOptions())
        if (shouldHaveOptions())
        {
            // THIS WILL GET OPTION IF IT HAS OPTION INSIDE getOptions(), OR ASSIGN AN EMPTY ARRAY IF getOption() IS EMPTY
            // THIS IS NECESSARY BECAUSE IF QUESTION TYPE IS SELECT OR RADIO THEN IT HAS OPTION, IF THE QUESTION TYPE IS TEXT THEN IT DOESN'T HAVE OPTIONS
            setOptions(getOptions() || []) 
            console.log("INSIDE IF: " + setOptions(getOptions() || []) )
        }

        dataChange()
        console.log("DATA CHANGE WAS REACHED")
    }

    // EMIT THE DATA CHANGE (TELL THE PARENT COMPONENT THAT THE DATA CHANGES)
    const dataChange = () => {
        const data = model.value

        if (!shouldHaveOptions())
        {
            delete data.data.options
        }

        emit("change", data)
    }

    const addQuestion = () => {
        emit("addQuestion", props.index + 1)
    }

    const deleteQuestion = () => {
        emit("deleteQuestion", props.question)
    }
</script>

<style>

</style>