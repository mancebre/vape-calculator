<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecipesTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('recipes', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->integer('amount');
			$table->integer('desired_strength');
			$table->integer('pg');
			$table->integer('vg');
			$table->integer('nicotine_strength');
			$table->integer('nicotine_pg');
			$table->integer('nicotine_vg');
			$table->integer('wvpga');
			$table->integer('sleep_time');
			$table->boolean('vape_ready');
			$table->longText('comment');
            $table->integer('user_id')->unsigned();
            $table->boolean(('private'));
            $table->boolean(('deleted'));
			$table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('recipes');
	}
}
