<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{   
    protected $table = 'patients';
    // Define the model's properties
    protected $fillable = [
        'name',
        'age',
        'contact_no',
        'address',
        'date_added',
        'diagnosis',
        'status'
    ];
}
