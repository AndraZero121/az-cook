<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\RecipeIngredient;
use App\Models\RecipeStep;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call individual seeders
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            IngredientSeeder::class,
            RecipeSeeder::class,
            RecipeRelationshipSeeder::class,
        ]);
    }
}

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'bio' => 'Administrator of the recipe sharing platform.',
            'is_admin' => true,
            'is_active' => true,
        ]);

        // Create regular users
        User::factory()->count(10)->create();
    }
}

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Breakfast',
                'description' => 'Start your day with these delicious breakfast recipes.',
                'is_active' => true,
            ],
            [
                'name' => 'Lunch',
                'description' => 'Perfect meals for your midday break.',
                'is_active' => true,
            ],
            [
                'name' => 'Dinner',
                'description' => 'End your day with these satisfying dinner recipes.',
                'is_active' => true,
            ],
            [
                'name' => 'Dessert',
                'description' => 'Sweet treats to satisfy your cravings.',
                'is_active' => true,
            ],
            [
                'name' => 'Appetizer',
                'description' => 'Small bites to start your meal.',
                'is_active' => true,
            ],
            [
                'name' => 'Vegetarian',
                'description' => 'Meat-free recipes that are full of flavor.',
                'is_active' => true,
            ],
            [
                'name' => 'Vegan',
                'description' => 'Plant-based recipes without animal products.',
                'is_active' => true,
            ],
            [
                'name' => 'Gluten-Free',
                'description' => 'Recipes without gluten-containing ingredients.',
                'is_active' => true,
            ],
            [
                'name' => 'Quick & Easy',
                'description' => 'Recipes that can be prepared in 30 minutes or less.',
                'is_active' => true,
            ],
            [
                'name' => 'Indonesian',
                'description' => 'Traditional and modern Indonesian cuisine.',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
                'is_active' => $category['is_active'],
            ]);
        }
    }
}

class IngredientSeeder extends Seeder
{
    public function run(): void
    {
        $ingredients = [
            ['name' => 'Beras', 'description' => 'Bahan pokok untuk membuat nasi.'],
            ['name' => 'Tepung Terigu', 'description' => 'Tepung dari gandum untuk berbagai macam kue dan roti.'],
            ['name' => 'Gula Pasir', 'description' => 'Pemanis untuk berbagai macam makanan dan minuman.'],
            ['name' => 'Garam', 'description' => 'Bumbu dasar untuk hampir semua masakan.'],
            ['name' => 'Minyak Goreng', 'description' => 'Minyak untuk menggoreng makanan.'],
            ['name' => 'Telur', 'description' => 'Bahan makanan yang serbaguna.'],
            ['name' => 'Susu', 'description' => 'Minuman bergizi tinggi kalsium.'],
            ['name' => 'Bawang Merah', 'description' => 'Bumbu dasar masakan Indonesia.'],
            ['name' => 'Bawang Putih', 'description' => 'Bumbu dasar dengan aroma khas.'],
            ['name' => 'Cabai Merah', 'description' => 'Bumbu pedas untuk masakan.'],
            ['name' => 'Cabai Rawit', 'description' => 'Cabai kecil dengan tingkat kepedasan tinggi.'],
            ['name' => 'Tomat', 'description' => 'Buah yang sering digunakan dalam masakan.'],
            ['name' => 'Ayam', 'description' => 'Sumber protein hewani yang populer.'],
            ['name' => 'Daging Sapi', 'description' => 'Daging merah dengan kandungan protein tinggi.'],
            ['name' => 'Ikan', 'description' => 'Sumber protein dengan omega-3 tinggi.'],
            ['name' => 'Tahu', 'description' => 'Makanan dari kedelai yang kaya protein.'],
            ['name' => 'Tempe', 'description' => 'Makanan fermentasi kedelai khas Indonesia.'],
            ['name' => 'Wortel', 'description' => 'Sayuran oranye kaya vitamin A.'],
            ['name' => 'Kentang', 'description' => 'Umbi-umbian yang serba guna dalam masakan.'],
            ['name' => 'Kecap Manis', 'description' => 'Bumbu cair manis khas Indonesia.'],
            ['name' => 'Santan', 'description' => 'Cairan dari kelapa yang memberi rasa gurih.'],
            ['name' => 'Jahe', 'description' => 'Rimpang dengan rasa pedas dan hangat.'],
            ['name' => 'Kunyit', 'description' => 'Rimpang kuning untuk pewarna dan bumbu masakan.'],
            ['name' => 'Serai', 'description' => 'Batang dengan aroma khas untuk masakan.'],
            ['name' => 'Daun Salam', 'description' => 'Daun aromatik untuk masakan Indonesia.'],
            ['name' => 'Daun Jeruk', 'description' => 'Daun dengan aroma jeruk untuk masakan.'],
            ['name' => 'Lengkuas', 'description' => 'Rimpang untuk memberikan aroma pada masakan.'],
            ['name' => 'Kemiri', 'description' => 'Biji yang digunakan sebagai bumbu.'],
            ['name' => 'Kacang Tanah', 'description' => 'Kacang-kacangan yang kaya protein.'],
            ['name' => 'Kacang Hijau', 'description' => 'Kacang-kacangan untuk berbagai masakan.'],
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::create([
                'name' => $ingredient['name'],
                'description' => $ingredient['description'],
                'is_active' => true,
            ]);
        }
    }
}

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('is_admin', false)->get();

        // Create 30 recipes
        $recipes = [
            [
                'title' => 'Nasi Goreng Spesial',
                'description' => 'Nasi goreng dengan bumbu spesial dan tambahan telur mata sapi.',
                'cooking_time' => 30,
                'servings' => 2,
                'difficulty' => 'mudah',
                'status' => 'approved',
                'is_featured' => true,
            ],
            [
                'title' => 'Mie Goreng Jawa',
                'description' => 'Mie goreng dengan bumbu khas Jawa yang lezat.',
                'cooking_time' => 25,
                'servings' => 2,
                'difficulty' => 'mudah',
                'status' => 'approved',
                'is_featured' => false,
            ],
            [
                'title' => 'Rendang Daging',
                'description' => 'Daging sapi dengan bumbu rendang khas Padang.',
                'cooking_time' => 180,
                'servings' => 4,
                'difficulty' => 'sulit',
                'status' => 'approved',
                'is_featured' => true,
            ],
            [
                'title' => 'Soto Ayam',
                'description' => 'Sup ayam kuning dengan bumbu rempah.',
                'cooking_time' => 60,
                'servings' => 4,
                'difficulty' => 'sedang',
                'status' => 'approved',
                'is_featured' => false,
            ],
            [
                'title' => 'Gado-gado',
                'description' => 'Sayuran dengan saus kacang khas Indonesia.',
                'cooking_time' => 20,
                'servings' => 2,
                'difficulty' => 'mudah',
                'status' => 'approved',
                'is_featured' => false,
            ],
        ];

        foreach ($recipes as $recipeData) {
            $user = $users->random();

            $recipe = Recipe::create([
                'user_id' => $user->id,
                'title' => $recipeData['title'],
                'description' => $recipeData['description'],
                'cooking_time' => $recipeData['cooking_time'],
                'servings' => $recipeData['servings'],
                'difficulty' => $recipeData['difficulty'],
                'status' => $recipeData['status'],
                'is_featured' => $recipeData['is_featured'],
            ]);

            // Create recipe details based on recipe title
            $this->createRecipeDetails($recipe);
        }

        // Create some pending recipes
        for ($i = 0; $i < 3; $i++) {
            $user = $users->random();

            Recipe::create([
                'user_id' => $user->id,
                'title' => 'Pending Recipe ' . ($i + 1),
                'description' => 'This recipe is waiting for approval.',
                'cooking_time' => rand(15, 60),
                'servings' => rand(1, 6),
                'difficulty' => ['mudah', 'sedang', 'sulit'][rand(0, 2)],
                'status' => 'pending',
                'is_featured' => false,
            ]);
        }
    }

    /**
     * Create recipe details based on recipe title
     */
    private function createRecipeDetails(Recipe $recipe): void
    {
        $ingredients = Ingredient::all();

        // Create recipe steps
        if ($recipe->title === 'Nasi Goreng Spesial') {
            // Create steps for nasi goreng
            $steps = [
                'Panaskan minyak, tumis bawang merah dan bawang putih hingga harum.',
                'Masukkan telur, aduk hingga menjadi orak-arik.',
                'Tambahkan nasi, kecap manis, garam, dan merica. Aduk rata.',
                'Masak hingga nasi panas dan bumbu meresap.',
                'Sajikan dengan telur mata sapi di atasnya.'
            ];

            // Create recipe ingredients
            $this->createRecipeIngredients($recipe, $ingredients, [
                'Beras' => ['quantity' => 2, 'unit' => 'cangkir'],
                'Telur' => ['quantity' => 2, 'unit' => 'butir'],
                'Bawang Merah' => ['quantity' => 5, 'unit' => 'siung'],
                'Bawang Putih' => ['quantity' => 3, 'unit' => 'siung'],
                'Kecap Manis' => ['quantity' => 2, 'unit' => 'sdm'],
                'Garam' => ['quantity' => 1, 'unit' => 'sdt'],
                'Minyak Goreng' => ['quantity' => 3, 'unit' => 'sdm'],
            ]);
        } elseif ($recipe->title === 'Rendang Daging') {
            // Create steps for rendang
            $steps = [
                'Haluskan bawang merah, bawang putih, cabai merah, dan kemiri.',
                'Tumis bumbu halus, serai, daun jeruk, daun salam, dan lengkuas hingga harum.',
                'Masukkan daging sapi, aduk rata dengan bumbu.',
                'Tuang santan, masak dengan api kecil sambil sesekali diaduk.',
                'Masak hingga santan menyusut dan daging empuk, sekitar 3 jam.',
                'Tambahkan garam dan gula, aduk rata.',
                'Masak hingga bumbu mengental dan meresap ke daging.'
            ];

            // Create recipe ingredients
            $this->createRecipeIngredients($recipe, $ingredients, [
                'Daging Sapi' => ['quantity' => 500, 'unit' => 'gram'],
                'Bawang Merah' => ['quantity' => 8, 'unit' => 'siung'],
                'Bawang Putih' => ['quantity' => 5, 'unit' => 'siung'],
                'Cabai Merah' => ['quantity' => 10, 'unit' => 'buah'],
                'Kemiri' => ['quantity' => 4, 'unit' => 'butir'],
                'Serai' => ['quantity' => 2, 'unit' => 'batang'],
                'Daun Jeruk' => ['quantity' => 5, 'unit' => 'lembar'],
                'Daun Salam' => ['quantity' => 3, 'unit' => 'lembar'],
                'Lengkuas' => ['quantity' => 3, 'unit' => 'cm'],
                'Santan' => ['quantity' => 500, 'unit' => 'ml'],
                'Garam' => ['quantity' => 1, 'unit' => 'sdt'],
                'Gula Pasir' => ['quantity' => 1, 'unit' => 'sdt'],
            ]);
        } else {
            // Create generic steps for other recipes
            $stepCount = rand(3, 6);
            $steps = [];

            for ($i = 1; $i <= $stepCount; $i++) {
                $steps[] = "Langkah $i untuk membuat " . $recipe->title;
            }

            // Create random ingredients for other recipes
            $selectedIngredients = $ingredients->random(rand(5, 10));
            $ingredientData = [];

            foreach ($selectedIngredients as $ingredient) {
                $ingredientData[$ingredient->name] = [
                    'quantity' => rand(1, 10),
                    'unit' => ['gram', 'kg', 'sdm', 'sdt', 'butir', 'siung', 'buah', 'cangkir'][rand(0, 7)]
                ];
            }

            $this->createRecipeIngredients($recipe, $ingredients, $ingredientData);
        }

        // Create recipe steps
        foreach ($steps as $index => $step) {
            RecipeStep::create([
                'recipe_id' => $recipe->id,
                'order' => $index + 1,
                'description' => $step,
            ]);
        }
    }

    /**
     * Create recipe ingredients
     */
    private function createRecipeIngredients(Recipe $recipe, $ingredients, array $ingredientData): void
    {
        foreach ($ingredientData as $name => $data) {
            $ingredient = $ingredients->where('name', $name)->first();

            if ($ingredient) {
                RecipeIngredient::create([
                    'recipe_id' => $recipe->id,
                    'ingredient_id' => $ingredient->id,
                    'quantity' => $data['quantity'],
                    'unit' => $data['unit'],
                    'notes' => rand(0, 1) ? 'Sesuai selera' : null,
                ]);
            }
        }
    }
}

class RecipeRelationshipSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('is_admin', false)->get();
        $recipes = Recipe::where('status', 'approved')->get();
        $categories = Category::all();

        // Associate recipes with categories
        foreach ($recipes as $recipe) {
            // Each recipe has 1-3 categories
            $recipeCategories = $categories->random(rand(1, 3));
            $recipe->categories()->attach($recipeCategories);

            // Create 0-5 comments for each recipe
            $commentCount = rand(0, 5);
            for ($i = 0; $i < $commentCount; $i++) {
                Comment::create([
                    'user_id' => $users->random()->id,
                    'recipe_id' => $recipe->id,
                    'content' => 'Ini komentar untuk ' . $recipe->title . '. ' .
                                'Resep ini ' . ['sangat lezat', 'enak', 'mudah dibuat', 'menarik', 'mantap'][rand(0, 4)] . '!'
                ]);
            }

            // Add likes to each recipe (0-8 users like each recipe)
            $likeCount = rand(0, 8);
            $likingUsers = $users->random(min($likeCount, $users->count()));
            foreach ($likingUsers as $user) {
                $recipe->likes()->attach($user->id);
            }

            // Add bookmarks to each recipe (0-5 users bookmark each recipe)
            $bookmarkCount = rand(0, 5);
            $bookmarkingUsers = $users->random(min($bookmarkCount, $users->count()));
            foreach ($bookmarkingUsers as $user) {
                $recipe->bookmarks()->attach($user->id);
            }
        }
    }
}
