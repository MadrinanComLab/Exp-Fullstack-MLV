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
        
        <div v-if="surveys.loading" class="flex justify-center">Loading...</div>
        <div v-else>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <SurveyListItem v-for="(survey, index) in surveys.data" class="opacity-0 animate-fade-in-down" :style="{animationDelay: `${ index * 0.1 }s`}" :key="survey.id" :survey="survey" @delete="deleteSurvey(survey)"/>
            </div>

            <div class="flex justify-center mt-5">
                <nav class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a v-for="(link, index) in surveys.links" :key="index" :disabled="!link.url" v-html="link.label" href="#" @click="getForPage(link)" aria-current="page" class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap" :class="[
                        link.active ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        index === 0 ? 'rounded-l-md' : '',
                        index === surveys.links.length -1 ? 'rounded-r-md' : ''
                    ]"></a>
                </nav>
            </div>
        </div>
        
    </PageComponent>
</template>

<script setup>
    import PageComponent from "../components/PageComponent.vue"
    import SurveyListItem from "../components/SurveyListItem.vue"
    import store from "../store"
    import { computed } from "vue"

    const surveys = computed(() => store.state.surveys)

    store.dispatch("getSurveys")

    const deleteSurvey = (survey) => {
        if (confirm(`Are you sure you want to delete this survey? Operation can't be undone.`))
        {
            // DELETE SURVEY
            store.dispatch("deleteSurvey", survey.id)
                .then(() => {
                    store.dispatch("getSurveys") // THIS CALLBACK WILL REFRESH THE PAGE
                })
        }
    }

    const getForPage = (link) => {
        if (!link.url || link.active) // IF LINK DOES NOT EXISTS OR ITS ALREADY ACTIVE, THEN DO NOTHING
        {
            return
        }

        console.log(link.url)

        store.dispatch("getSurveys", { url: link.url })
    }
</script>