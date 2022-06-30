<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ model.id ? model.title : "Create a Survey" }}
                </h1>
            </div>
        </template>
        
        <form @submit.prevent="saveSurvey"><!--/ prevent IS A CUSTOM EVENT OF submit THAT WILL PREVENT THE DEFAULT ACTION WHEN USER SUBMIT THE FORM /-->
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!--/ SURVEY FIELDS /-->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    
                    <!--/ IMAGE /-->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Image</label>
                        <div class="mt-1 flex items-center">
                            <img v-if="model.image" :src="model.image" :alt="model.title" class="w-64 h-48 object-cover">
                            <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <button type="button" class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <!--/ INPUT TAG INSIDE A BUTTON IS A NICER WAY TO CREATE THIS KIND OF BUTTON INSTEAD OF USING JS DOM /-->
                                <input type="file" class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer">
                                Change
                            </button>
                        </div>
                    </div>

                    <!--/ TITLE /-->
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" id="title" v-model="model.title" autocomplete="survey_title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <!--/ DESCRIPTION /-->
                    <div>
                        <label for="about" class="block text-sm font-medium text-gray-700">About</label>
                        <div class="mt-1">
                            <textarea name="description" id="description" rows="3" v-model="model.description" autocomplete="survey_description" placeholder="Describe your survey" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
                        </div>
                    </div>

                    <!--/ EXPIRE DATE /-->
                    <div>
                        <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
                        <input type="date" name="expire_date" id="expire_date" v-model="model.expire_date" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <!--/ STATUS /-->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input type="checkbox" name="status" id="status" v-model="model.status" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-600 rounded">
                        </div>

                        <div class="ml-3 text-sm">
                            <label for="status" class="font-medium text-gray-700">Active</label>
                        </div>
                    </div>
                </div>

                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <h3 class="text-2xl font-semibold flex items-center justify-between">
                        Questions

                        <!--/ ADD NEW QUESTION /-->
                        <button type="button" @click="addQuestion" class="flex items-center text-sm py-1 px-4 rounded-md text-white bg-gray-600 hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Question
                        </button>
                    </h3>

                    <div v-if="!model.questions.length" class="text-center text-gray-600">
                        You don't have any questions created
                    </div>

                    <div v-for="(question, index) in model.questions" :key="question.id">
                        <!--/ NOTE: @change, @addQuestion & @deleteQuestion THESE ARE CUSTOM EVENT THAT WILL BE CALLED FROM CHILD COMPONENT. REMEMBER THE $emit? /-->
                        <QuestionEditor :question="question" :index="index"  @change="questionChange" @addQuestion="addQuestion" @deleteQuestion="deleteQuestion"/>
                    </div>
                </div>

                <!--/ SAVE BUTTON /-->
                <div class="px-4 py-3 bg-gray-50 text-right sm-px-6">
                    <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-700 focus:outline-none focus:ring-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script setup>
    import PageComponent from "../components/PageComponent.vue"
    import QuestionEditor from "../components/editor/QuestionEditor.vue"
    
    import { useRoute, useRouter } from "vue-router"
    import { v4 as uuidv4 } from "uuid"
    import { ref } from "vue"
    import store from "../store"

    const router = useRouter()
    const route = useRoute()

    // CREATE EMPTY SURVEY
    let model = ref({
        title: "",
        status: false,
        image: null,
        description: null,
        expire_date: null,
        questions: []
    })

    if (route.params.id) // IF ID WAS PASSED TO ROUTE PARAMETERS
    {
        // THEN SET THE VALUE OF model TO SURVEY IN STORE THAT HAS THE SAME ID
        model.value = store.state.surveys.find(
            (s) => s.id === parseInt(route.params.id)
        )
    }

    const addQuestion = (index) => {
        const newQuestion = {
            id: uuidv4(),
            type: "text",
            question: "",
            description: null,
            data: {}
        }

        // index IS THE QUESTION NUMBER OF THIS NEW QUESTION. 
        // 0 WAS THE NUMBER OF DATA YOU WANT TO REMOVE FROM THE ARRAY
        // newQuestion IS THE OBEJECT YOU WANT TO INSERT INSIDE THE ARRAY
        model.value.questions.splice(index, 0, newQuestion) 
    }

    const deleteQuestion = (question) => {
        // REMEMBER, filter() WILL CYCLE THROUGH AN ARRAY AND WE NAME EACH DATA ACCESSED BY FILTER AS q. 
        // THEN GIVE A CONDITION WHICH DATA WILL BE FILETERED OUT
        model.value.questions = model.value.questions.filter(
            (q) => q !== question
        )
    }

    const questionChange = (question) => {
        model.value.questions = model.value.questions.map((q) => {
            // THE CONDITIONAL STATEMENT WILL LOOK FOR QUESTION THAT IS BEING CHANGE/MODIFY
            if (q.id === question.id)
            {
                return JSON.parse(JSON.stringify(question))
            }

            return
        })
    }

    // CREATE OR UPDATE SURVEY
    const saveSurvey = async() => {
        await store.dispatch("saveSurvey", model.value).then( ({ data }) => {
            // let d = JSON.stringify(data)
            // console.log(data.data)

            router.push({
                name: "SurveyView",
                params: { id: data.data.id }
            })
        })
    }
</script>

<style>

</style>