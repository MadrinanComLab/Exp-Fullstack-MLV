<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Survey extends Model
{
    use HasFactory, HasSlug; // HAS SLUG IS ADDED HERE BECAUSE WE HAVE SLUG ATTRIBUTE IN TABLE Surveys

    // THESE ARE THE ATTRIBUTE (OF TABLE Surveys) THAT WILL BE FILLED BY SurveyController.php
    protected $filable = ["user_id", "title", "slug", "status", "description", "expire_date"];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom("title")
            ->saveSlugsTo("slug");
    }
}
