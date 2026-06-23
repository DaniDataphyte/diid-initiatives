<?php

use Illuminate\Support\Facades\Route;

function policyDataFile(string $name): mixed
{
    return json_decode(file_get_contents(resource_path("data/{$name}.json")), true, 512, JSON_THROW_ON_ERROR);
}

Route::get('/', function () {
    return view('pages.policy', [
        'policyData' => [
            'statusTaxonomy' => policyDataFile('status-taxonomy'),
            'countries' => policyDataFile('countries'),
            'countryMentions' => policyDataFile('country-mentions'),
            'metrics' => policyDataFile('metrics'),
            'timeline' => policyDataFile('timeline'),
            'patterns' => policyDataFile('patterns'),
            'gaps' => policyDataFile('gaps'),
            'driversBarriers' => policyDataFile('drivers-barriers'),
            'recommendations' => policyDataFile('recommendations'),
            'priorities' => policyDataFile('priorities'),
            'methodNotes' => policyDataFile('method-notes'),
        ],
    ]);
})->name('policy.home');
