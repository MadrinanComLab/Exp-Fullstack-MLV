<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;

use Illuminate\Http\Request;
use App\Http\Resources\SurveyResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

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
        $data = $request->validated();

        # CHECK IF image WAS GIVEN AND SAVE ON LOCAL FILE SYSTEM
        if (isset($data["image"])) # THIS CHECKING IS NEEDED BECAUSE image IS NOT REQUIRED AND IT CAN BE NULL
        {
            # IF $data["image"] IS NOT NULL/EMPTY, THEN WE'RE GOING TO CREATE A FILE SYSTEM FOR IT
            $relativePath = $this->saveImage($data["image"]);
            $data["image"] = $relativePath;
        }

        $survey = Survey::create($data);

        return new SurveyResource($survey);
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
        # $survey->update($request->validated());
        $data = $request->validated();

        # CHECK IF IMAGE WAS GIVEN AND SAVE ON LOCAL FILE SYSTEM (THIS WILL BE SIMILAR TO store() FUNCTION)
        if (isset($data["image"]))
        {
            $relativePath = $this->saveImage($data["image"]);
            $data["image"] = $relativePath;

            # IF THERE IS AN OLD/EXISTING IMAGE, WE'LL GOING TO DELETE IT
            if ($survey->image)
            {
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
        }

        # UDPATE SURVEY IN THE DATABASE
        $survey->update($data);

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

        # DELETES THE RECORD IN THE DATABASE
        $survey->delete();
        
        # DELETES THE IMAGE OF THE SURVEY THAT IS CURRENTLY DELETED
        # IF THERE IS AN OLD/EXISTING IMAGE, WE'LL GOING TO DELETE IT
        if ($survey->image)
        {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        return response("", 204);
    }

    private function saveImage($image)
    {
        # CHECK IF $image IS VALID BASE64 STRING
        if (preg_match("/^data:image\/(\w+);base64,/", $image, $type))
        {
            # TAKE OUT THE BASE64 ENCODED TEXT WITHOUT MIME TYPE
            $image = substr($image, strpos($image, ",") + 1);

            # GET FILE EXTENSION
            $type = strtolower($type[1]); // jpg, png, gif

            # CHECK IF FILE IS AN IMAGE
            if (!in_array($type, ["jpg", "jpeg", "gif", "png"]))
            {
                throw new \Exception("Invalid image type");
            }

            $image = str_replace(" ", "+", $image);
            $image = base64_decode($image);

            if ($image === false)
            {
                throw new \Exception("base64_decode failed");
            }
        }

        else 
        {
            throw new \Exception("Did not match data URI with image data");
        }

        $directory = "images/"; # IMAGES WILL BE SAVE IN public/images
        $file = Str::random() . "." . $type;
        $absolutePath = public_path($directory);
        $relativePath = $directory . $file;

        if (!File::exists($absolutePath)) # THIS WILL SIMPLY CHECK IF THE DIRECTORY EXIST, IF NOT THEN IT WILL CREATE
        {
            File::makeDirectory($absolutePath, 0755, true);
        }

        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
