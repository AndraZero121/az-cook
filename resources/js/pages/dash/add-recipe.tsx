import { Head, useForm } from "@inertiajs/react";
import { Plus, Trash2, ImagePlus } from "lucide-react";
import { useState, useRef } from "react";

interface Ingredient {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  ingredients: Ingredient[];
  categories: Category[];
}

export default function AddRecipePage({ ingredients, categories }: Props) {
  const [selectedIngredients, setSelectedIngredients] = useState<Array<{
    ingredient_id: number;
    quantity: string;
    unit: string;
    notes?: string;
  }>>([]);

  const [steps, setSteps] = useState<Array<{
    description: string;
    image?: File;
    imagePreview?: string;
  }>>([]);

  const { data, setData, post, processing, errors, progress } = useForm({
    title: '',
    description: '',
    cooking_time: '',
    servings: '',
    difficulty: 'mudah',
    image: null as File | null,
    category_ids: [] as number[],
    ingredients: [] as typeof selectedIngredients,
    steps: [] as typeof steps,
  });

  const imageInput = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addIngredient = () => {
    setSelectedIngredients([
      ...selectedIngredients,
      { ingredient_id: 0, quantity: '', unit: '', notes: '' }
    ]);
  };

  const removeIngredient = (index: number) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    const updated = [...selectedIngredients];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedIngredients(updated);
  };

  const addStep = () => {
    setSteps([...steps, { description: '' }]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, field: string, value: string | File) => {
    const updated = [...steps];
    if (field === 'image' && value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updated[index] = {
          ...updated[index],
          [field]: value,
          imagePreview: reader.result as string
        };
        setSteps(updated);
      };
      reader.readAsDataURL(value);
    } else {
      updated[index] = { ...updated[index], [field]: value };
      setSteps(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData('ingredients', selectedIngredients);
    setData('steps', steps);
    post('/recipe');
  };

  return <>
    <Head title="Tambah Resep Baru"/>
    <div className="w-full max-w-7xl m-auto py-8">
      <form onSubmit={handleSubmit} className="px-6">
        <h1 className="text-3xl font-bold mb-8">Tambah Resep Baru</h1>

        <div className="space-y-8">
          {/* Main Image */}
          <div>
            <h2 className="text-xl font-bold mb-4">Foto Utama</h2>
            <div
              className="w-full max-w-xl aspect-video rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500"
              onClick={() => imageInput.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl"/>
              ) : (
                <div className="text-center">
                  <ImagePlus size={48} className="mx-auto mb-2 text-gray-400"/>
                  <p className="text-gray-500">Klik untuk mengunggah foto</p>
                </div>
              )}
              <input
                type="file"
                ref={imageInput}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Informasi Dasar</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Judul Resep</label>
                <input
                  type="text"
                  className={"w-full rounded-md border p-2 " +
                    (errors.title ? "border-red-500" : "border-gray-300")}
                  value={data.title}
                  onChange={e => setData('title', e.target.value)}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1">Deskripsi</label>
                <textarea
                  className={"w-full rounded-md border p-2 min-h-[100px] " +
                    (errors.description ? "border-red-500" : "border-gray-300")}
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Waktu Memasak (menit)</label>
                  <input
                    type="number"
                    className={"w-full rounded-md border p-2 " +
                      (errors.cooking_time ? "border-red-500" : "border-gray-300")}
                    value={data.cooking_time}
                    onChange={e => setData('cooking_time', e.target.value)}
                  />
                  {errors.cooking_time && (
                    <p className="text-red-500 text-sm mt-1">{errors.cooking_time}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold mb-1">Porsi</label>
                  <input
                    type="number"
                    className={"w-full rounded-md border p-2 " +
                      (errors.servings ? "border-red-500" : "border-gray-300")}
                    value={data.servings}
                    onChange={e => setData('servings', e.target.value)}
                  />
                  {errors.servings && (
                    <p className="text-red-500 text-sm mt-1">{errors.servings}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold mb-1">Tingkat Kesulitan</label>
                  <select
                    className={"w-full rounded-md border p-2 " +
                      (errors.difficulty ? "border-red-500" : "border-gray-300")}
                    value={data.difficulty}
                    onChange={e => setData('difficulty', e.target.value)}
                  >
                    <option value="mudah">Mudah</option>
                    <option value="sedang">Sedang</option>
                    <option value="sulit">Sulit</option>
                  </select>
                  {errors.difficulty && (
                    <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xl font-bold mb-4">Kategori</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <label
                  key={category.id}
                  className={"px-4 py-2 rounded-full border cursor-pointer " +
                    (data.category_ids.includes(category.id)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 hover:border-blue-500")}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={data.category_ids.includes(category.id)}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...data.category_ids, category.id]
                        : data.category_ids.filter(id => id !== category.id);
                      setData('category_ids', newCategories);
                    }}
                  />
                  {category.name}
                </label>
              ))}
            </div>
            {errors.category_ids && (
              <p className="text-red-500 text-sm mt-1">{errors.category_ids}</p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-xl font-bold mb-4">Bahan-bahan</h2>
            <div className="space-y-4">
              {selectedIngredients.map((ing, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-40">
                    <input
                      type="number"
                      placeholder="Jumlah"
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={ing.quantity}
                      onChange={e => updateIngredient(index, 'quantity', e.target.value)}
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="text"
                      placeholder="Satuan"
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={ing.unit}
                      onChange={e => updateIngredient(index, 'unit', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <select
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={ing.ingredient_id}
                      onChange={e => updateIngredient(index, 'ingredient_id', e.target.value)}
                    >
                      <option value="">Pilih Bahan</option>
                      {ingredients.map(ingredient => (
                        <option key={ingredient.id} value={ingredient.id}>
                          {ingredient.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Catatan (opsional)"
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={ing.notes}
                      onChange={e => updateIngredient(index, 'notes', e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-md"
              >
                <Plus size={20} className="mr-2" />
                Tambah Bahan
              </button>
            </div>
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
            )}
          </div>

          {/* Steps */}
          <div>
            <h2 className="text-xl font-bold mb-4">Langkah-langkah</h2>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Deskripsi langkah..."
                      className="w-full rounded-md border border-gray-300 p-2 min-h-[100px]"
                      value={step.description}
                      onChange={e => updateStep(index, 'description', e.target.value)}
                    />
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) updateStep(index, 'image', file);
                        }}
                        className="hidden"
                        id={`step-image-${index}`}
                      />
                      <label
                        htmlFor={`step-image-${index}`}
                        className="inline-block cursor-pointer"
                      >
                        {step.imagePreview ? (
                          <div className="w-full max-w-xl aspect-video rounded-lg overflow-hidden">
                            <img
                              src={step.imagePreview}
                              alt={`Step ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-500">
                            <ImagePlus className="text-gray-400" />
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md h
                  ">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addStep}
                className="flex items-center text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-md"
              >
                <Plus size={20} className="mr-2" />
                Tambah Langkah
              </button>
            </div>
            {errors.steps && (
              <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className={"px-4 py-2 rounded-md text-white " +
              (processing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600")}
            disabled={processing}
          >
            {processing ? 'Menyimpan...' : 'Simpan Resep'}
          </button>
        </div>
      </form>
    </div>
  </>
}
