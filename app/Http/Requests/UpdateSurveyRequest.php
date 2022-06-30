<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $survey = $this->route("survey");

        # WHAT WE'RE DOING IS CHECKING IF THE USER WHO CURRENTLTY SENDING AN UPDATE REQUEST WAS THE OWNER OF THE SURVEY
        # IF HE/SHE IS NOT THE OWNER OF THE SURVEY HE/SHE IS NOT AUTHORIZED TO MAKE CHANGES
        if ($this->user()->id !== $survey->user_id)
        {
            return false;
        }

        return true;

        # DON'T TRY TO SHORTEN THE CODE SNIPPET FROM ABOVE, I'VE ALREADY TRIED IT AND SHIT HAPPENS, IT SAYS WE'RE NOT AUTHORIZED TO MAKE SOME CHANGES
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "title" => "required|string|max:1000",
            "image" => "nullable|string",
            "user_id" => "exists:users,id",
            "status" => "required|boolean",
            "description" => "nullable|string",
            "expire_date" => "nullable|date|after:tomorrow",
            "questions" => "array"
        ];
    }
}
