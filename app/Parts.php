<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Parts extends Model
{
    protected $fillable = [
        'title'
    ];

    public function AddPart($input){
        $input = [
            'title' => $input['title']
        ];

        $part = Parts::create($input);
        return $part;
    }
}
