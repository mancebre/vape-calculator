<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class Recipe extends Model implements AuthenticatableContract, AuthorizableContract {
	use Authenticatable, Authorizable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name', 'desired_strength', 'pg', 'vg', 'nicotine_strength', 'nicotine_pg', 'amount', 'nicotine_vg', 'wvpga', 'sleep_time', 'vape_ready', 'comment',
	];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = [

	];

	protected $table = 'recipes';

    public function recipeFlavors()
    {
        return $this->hasMany('App\RecipeFlavors', 'recipe_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function rating()
    {
        return $this->hasMany('App\Rating');
    }
}
