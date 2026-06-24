<?php

namespace Tests\Feature;

use App\Models\CommunityCenter;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ConfiguracoesGeraisTest extends TestCase
{
    use RefreshDatabase;

    private function createCommunityCenter(array $overrides = []): CommunityCenter
    {
        return CommunityCenter::firstOrCreate(
            ['name' => 'Centelha'],
            array_merge([
                'location' => '',
                'slogan' => 'Slogan',
                'rodape_text' => '',
                'logo_path' => './logo.png',
                'favicon_path' => './logo.png',
                'fontFamily' => 'Inter',
                'settings' => [],
            ], $overrides)
        );
    }

    public function test_admin_can_upload_logo(): void
    {
        Storage::fake('public');

        $user = User::factory()->create(['role' => 'admin']);
        $this->createCommunityCenter();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put('/gestao-sistema/configuracoes-gerais', [
                '_token' => 'test-token',
                'name' => 'Centelha',
                'fontFamily' => 'Inter',
                'logo' => UploadedFile::fake()->image('logo.png', 100, 100),
            ]);

        $center = CommunityCenter::first();

        $this->assertNotNull($center->logo_path);
        $this->assertStringStartsWith('logos/', $center->logo_path);
        Storage::disk('public')->assertExists($center->logo_path);
    }

    public function test_uploading_new_logo_deletes_old_one(): void
    {
        Storage::fake('public');

        $user = User::factory()->create(['role' => 'admin']);
        $center = $this->createCommunityCenter([
            'logo_path' => 'logos/old-hash.png',
        ]);
        Storage::disk('public')->put('logos/old-hash.png', 'old-content');

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put('/gestao-sistema/configuracoes-gerais', [
                '_token' => 'test-token',
                'name' => $center->name,
                'fontFamily' => $center->fontFamily,
                'logo' => UploadedFile::fake()->image('new-logo.png', 100, 100),
            ]);

        $center->refresh();

        Storage::disk('public')->assertMissing('logos/old-hash.png');
        Storage::disk('public')->assertExists($center->logo_path);
    }

    public function test_remove_logo_flag_deletes_file_and_clears_path(): void
    {
        Storage::fake('public');

        $user = User::factory()->create(['role' => 'admin']);
        $center = $this->createCommunityCenter([
            'logo_path' => 'logos/logo-hash.png',
        ]);
        Storage::disk('public')->put('logos/logo-hash.png', 'content');

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put('/gestao-sistema/configuracoes-gerais', [
                '_token' => 'test-token',
                'name' => $center->name,
                'fontFamily' => $center->fontFamily,
                'remove_logo' => '1',
            ]);

        $center->refresh();

        $this->assertNull($center->logo_path);
        Storage::disk('public')->assertMissing('logos/logo-hash.png');
    }

    public function test_admin_can_upload_favicon(): void
    {
        Storage::fake('public');

        $user = User::factory()->create(['role' => 'admin']);
        $this->createCommunityCenter();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put('/gestao-sistema/configuracoes-gerais', [
                '_token' => 'test-token',
                'name' => 'Centelha',
                'fontFamily' => 'Inter',
                'favicon' => UploadedFile::fake()->image('favicon.png', 32, 32),
            ]);

        $center = CommunityCenter::first();

        $this->assertNotNull($center->favicon_path);
        $this->assertStringStartsWith('favicons/', $center->favicon_path);
        Storage::disk('public')->assertExists($center->favicon_path);
    }

    public function test_remove_favicon_flag_deletes_file_and_clears_path(): void
    {
        Storage::fake('public');

        $user = User::factory()->create(['role' => 'admin']);
        $center = $this->createCommunityCenter([
            'favicon_path' => 'favicons/favicon-hash.png',
        ]);
        Storage::disk('public')->put('favicons/favicon-hash.png', 'content');

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put('/gestao-sistema/configuracoes-gerais', [
                '_token' => 'test-token',
                'name' => $center->name,
                'fontFamily' => $center->fontFamily,
                'remove_favicon' => '1',
            ]);

        $center->refresh();

        $this->assertNull($center->favicon_path);
        Storage::disk('public')->assertMissing('favicons/favicon-hash.png');
    }

    public function test_logo_url_accessor_returns_default_when_path_is_null(): void
    {
        $center = $this->createCommunityCenter(['logo_path' => null]);

        $this->assertStringEndsWith('logo.svg', $center->logo_url);
    }

    public function test_logo_url_accessor_handles_legacy_static_path(): void
    {
        $center = $this->createCommunityCenter(['logo_path' => './logo.png']);

        $this->assertStringEndsWith('logo.png', $center->logo_url);
    }

    public function test_logo_url_accessor_returns_storage_url_for_uploaded_file(): void
    {
        Storage::fake('public');

        $center = $this->createCommunityCenter(['logo_path' => 'logos/hash.png']);

        $this->assertStringContainsString('/storage/logos/hash.png', $center->logo_url);
    }

    public function test_logo_file_path_returns_null_for_missing_file(): void
    {
        Storage::fake('public');

        $center = $this->createCommunityCenter(['logo_path' => 'logos/missing.png']);

        $this->assertNull($center->logoFilePath());
    }

    public function test_logo_file_path_returns_real_path_for_existing_file(): void
    {
        Storage::fake('public');

        $center = $this->createCommunityCenter(['logo_path' => 'logos/hash.png']);
        Storage::disk('public')->put('logos/hash.png', 'content');

        $this->assertNotNull($center->logoFilePath());
    }
}
