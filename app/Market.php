<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Market extends Model
{
    protected $fillable = [
        'title'
    ];

    public function AddMarket($request){
        $input = [
            'title' => $request['title'],
        ];

        return Market::create($input);
    }
}
