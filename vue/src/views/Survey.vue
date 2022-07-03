<template>
    <PageComponent><!--/  title="Survey" /-->
        <!--/ WHATEVER INSIDE HERE WILL BE DISPLAYED IN PAGE COMPONENT'S <SLOT> /-->
        <!--/ Content goes here... /-->
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
                <router-link :to="{ name: 'SurveyCreate' }" class="py-2 px-3 text-white text-xl bg-emerald-500 rounded-md hover:bg-emerald-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add new Survey
                </router-link>
            </div>
        </template>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <SurveyListItem v-for="(survey, index) in surveys" class="opacity-0 animate-fade-in-down" :style="{animationDelay: `${ index * 0.1 }s`}" :key="survey.id" :survey="survey" @delete="deleteSurvey(survey)"/>
        </div>
    </PageComponent>
</template>

<script setup>
    import PageComponent from "../components/PageComponent.vue"
    import SurveyListItem from "../components/SurveyListItem.vue"
    import store from "../store"
    import { computed } from "vue"

    const surveys = computed(() => store.state.surveys.data)

    store.dispatch("getSurveys")

    function deleteSurvey(survey)
    {
        if (confirm(`Are you sure you want to delete this survey? Operation can't be undone.`))
        {
            // DELETE SURVEY
            store.dispatch("deleteSurvey", survey.id)
                .then(() => {
                    store.dispatch("getSurveys") // THIS CALLBACK WILL REFRESH THE PAGE
                })
        }
    }
</script>