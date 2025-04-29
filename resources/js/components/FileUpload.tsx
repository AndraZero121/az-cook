import { ImagePlus } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  onChange: (file: File) => void;
  initialPreview?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  maxSize?: number; // in MB
  className?: string;
}

export default function FileUpload({ 
  onChange, 
  initialPreview, 
  aspectRatio = 'square',
  maxSize = 2, // Default 2MB
  className = '' 
}: Props) {
  const [preview, setPreview] = useState(initialPreview);
  const [error, setError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]'
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Ukuran file terlalu besar. Maksimal ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar');
      return;
    }

    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Call parent onChange
    onChange(file);
  };

  return (
    <div>
      <div
        onClick={() => fileInput.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed border-gray-300 ${aspectRatioClasses[aspectRatio]} hover:border-blue-500 ${className}`}
      >
        {preview ? (
          <img 
            src={preview} 
            alt="Preview" 
            className="absolute inset-0 h-full w-full rounded-xl object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ImagePlus size={48} className="mb-2 text-gray-400" />
            <p className="text-center text-sm text-gray-500">
              Klik untuk mengunggah gambar
              <br />
              <span className="text-xs">
                Maksimal {maxSize}MB
              </span>
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}

      <input
        ref={fileInput}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}