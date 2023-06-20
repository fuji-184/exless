import { useState, useRef } from "react";
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnderline } from "react-icons/ai";

const LibraryArticle = () => {
  const [text, setText] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleChange = () => {
    setText(editorRef.current.innerHTML);
  };

  const handleFormatClick = (formatType) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    switch (formatType) {
      case "bold":
        document.execCommand("bold");
        break;
      case "italic":
        document.execCommand("italic");
        break;
      case "underline":
        document.execCommand("underline");
        break;
      default:
        break;
    }

    handleChange();
  };

  const handleCancel = () => {
    setText("");
    editorRef.current.innerHTML = "";
    setSelectedImage(null);
  };

  const handleSend = () => {
    // Lakukan sesuatu dengan teks dan gambar yang dikirim
    console.log("Teks yang dikirim:", text);
    console.log("Gambar yang dikirim:", selectedImage);
    // Reset editor
    setText("");
    editorRef.current.innerHTML = "";
    setSelectedImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgHtml = `<img src="${e.target.result}" alt="uploaded image" />`;
        document.execCommand("insertHTML", false, imgHtml);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  return (
    <div className="p-4">
      <div className="flex mb-2">
        <button className={`mr-2 p-2 ${isBold ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`} onClick={() => handleFormatClick("bold")}>
          <AiOutlineBold />
        </button>
        <button className={`mr-2 p-2 ${isItalic ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`} onClick={() => handleFormatClick("italic")}>
          <AiOutlineItalic />
        </button>
        <button className={`mr-2 p-2 ${isUnderlined ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`} onClick={() => handleFormatClick("underline")}>
          <AiOutlineUnderline />
        </button>
        <input type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleImageUpload} />
        <button className="mr-2 p-2 bg-gray-300 text-gray-600" onClick={() => fileInputRef.current.click()}>
          Tambah Gambar
        </button>
        {selectedImage && (
          <div className="ml-2">
            <img src={URL.createObjectURL(selectedImage)} alt="selected image preview" className="h-16 w-16 object-cover rounded-full" />
          </div>
        )}
      </div>
      <div
        className={`border border-gray-300 p-2 rounded-lg w-full h-48 resize-none ${isBold ? "font-bold" : ""} ${isItalic ? "italic" : ""} ${isUnderlined ? "underline" : ""}`}
        contentEditable={true}
        ref={editorRef}
        onInput={handleChange}></div>
      <div className="mt-2">
        <p>Jumlah Karakter: {text.length}</p>
      </div>
      <div className="mt-4">
        <button className="mr-2 bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleSend}>
          Kirim
        </button>
        <button className="bg-gray-300 text-gray-600 py-2 px-4 rounded-lg" onClick={handleCancel}>
          Batal
        </button>
      </div>
    </div>
  );
};

export default LibraryArticle;