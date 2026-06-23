<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Symfony\Component\Console\Command\Command as SymfonyCommand;

function policyDataPayload(): array
{
    $read = fn (string $name): mixed => json_decode(
        file_get_contents(resource_path("data/{$name}.json")),
        true,
        512,
        JSON_THROW_ON_ERROR
    );

    return [
        'statusTaxonomy' => $read('status-taxonomy'),
        'countries' => $read('countries'),
        'countryMentions' => $read('country-mentions'),
        'metrics' => $read('metrics'),
        'timeline' => $read('timeline'),
        'patterns' => $read('patterns'),
        'gaps' => $read('gaps'),
        'driversBarriers' => $read('drivers-barriers'),
        'recommendations' => $read('recommendations'),
        'priorities' => $read('priorities'),
        'methodNotes' => $read('method-notes'),
    ];
}

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('export:static-policy-brief', function () {
    $exportRoot = public_path('export');
    $buildRoot = public_path('build');
    $dataRoot = resource_path('data');

    if (! File::exists($buildRoot.'/manifest.json')) {
        $this->error('Missing Vite production build. Run the frontend build first.');

        return SymfonyCommand::FAILURE;
    }

    if (File::exists(public_path('hot'))) {
        $this->warn('A Vite hot file is present. Stop the dev server before exporting so @vite resolves production assets.');
    }

    File::deleteDirectory($exportRoot);
    File::ensureDirectoryExists($exportRoot);

    File::copyDirectory($buildRoot, $exportRoot.'/build');

    if (File::exists($dataRoot)) {
        File::copyDirectory($dataRoot, $exportRoot.'/assets/data');
    }

    $html = view('pages.policy', [
        'policyData' => policyDataPayload(),
    ])->render();
    $appUrl = rtrim(config('app.url'), '/');
    $html = str_replace("href=\"{$appUrl}/build/", 'href="./build/', $html);
    $html = str_replace("src=\"{$appUrl}/build/", 'src="./build/', $html);
    $html = str_replace('href="/build/', 'href="./build/', $html);
    $html = str_replace('src="/build/', 'src="./build/', $html);

    File::put($exportRoot.'/index.html', $html);

    $this->info('Static export written to public/export');

    return SymfonyCommand::SUCCESS;
})->purpose('Export the policy brief as a static bundle under public/export');
