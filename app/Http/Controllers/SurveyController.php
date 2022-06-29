<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;

use Illuminate\Http\Request;
use App\Http\Resources\SurveyResource;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //===================================================================================>>> CRUD OPERATION: READ (FETCHING MULTIPLE ITEM)
    public function index(Request $request) //===========================================>>> THIS WILL RETRIEVE THE SURVEY
    {
        $user = $request->user();
        return SurveyResource::collection(Survey::where("user_id", $user->id)->paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    //===================================================================================>>> CRUD OPERATION: CREATE
    public function store(StoreSurveyRequest $request) //================================>>> THIS WILL SAVE THE NEWLY CREATED SURVEY
    {
        $result = Survey::create($request->validated());
        return new SurveyResource($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    //===================================================================================>>> CRUD OPERATION: READ (FETCHING SINGLE ITEM)
    public function show(Survey $survey, Request $request) //============================>>> THIS WILL RETRIVE SINGLE RECORD OF SURVEY
    {
        $user = $request->user();

        // THIS WILL CHECK IF THE CURRENT USER IS THE OWNER OF THE SURVEY
        if ($user->id !== $survey->user_id)
        {
            return abort(403, "Unauthorized action.");
        }
        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    //===================================================================================>>> CRUD OPERATION: UPDATE
    public function update(UpdateSurveyRequest $request, Survey $survey) //==============>>> THIS WILL UPDATE A RECORD TO THE DATABASE
    {
        $survey->update($request->validated());
        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    //===================================================================================>>> CRUD OPERATION: DELETE
    public function destroy(Survey $survey, Request $request) //=========================>>> THIS WILL DELETE A RECORD TO THE DATABASE
    {
        $user = $request->user();

        // THIS WILL CHECK IF THE CURRENT USER IS THE OWNER OF THE SURVEY OR HAS THE PERMISSION TO DELETE THE SURVEY
        if ($user->id !== $survey->user_id)
        {
            return abort(403, "Unauthorized action.");
        }

        $survey->delete();
        return response("", 204);
    }
}
