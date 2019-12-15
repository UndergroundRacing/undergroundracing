<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Vechile extends Model
{
    protected $fillable = [
        'title', 'level', 'weight', 'part_id'
    ];

    public function createVechile($input)
    {
        $input = [
            'title' => $input['title'],
            'level' => $input['level'],
            'weight' => $input['weight'],
            'part_id' => $input['part_id']
        ];

        return Vechile::create($input);
    }

    public function getVechileById($id){
        return Vechile::find($id);
    }
}
