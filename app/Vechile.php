<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Vechile extends Model
{
    protected $fillable = [
        'title', 'level', 'weight', 'part_id','image_url','is_default'
    ];

    public function createVechile($input)
    {
        $input = [
            'title' => $input['title'],
            'level' => $input['level'],
            'weight' => $input['weight'],
            'image_url' => $input['image_url'],
            'is_default' => $input['is_default'],
            'part_id' => $input['part_id']
        ];

        return Vechile::create($input);
    }

    public function getVechileById($id){
        return Vechile::find($id);
    }

    public function GetDefaultVechile(){
        $vech = Vechile::where('is_default',1)->get()->first();
        return $vech->id;
    }
}
