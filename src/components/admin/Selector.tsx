import { useState } from "react";

interface LanguageSelectorProps {
  setLanguage: (lang: string) => void;
}

export default function LanguageSelector({
  setLanguage,
}: LanguageSelectorProps) {
  const [selected, setSelected] = useState("cpp");

  const handleChange = (e: { target: { value: any } }) => {
    const lang = e.target.value;
    setSelected(lang);
    setLanguage(lang);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="bg-surface border text-white rounded p-2"
    >
      <option className="text-black " value="cpp">
        C / C++
      </option>
      <option className="text-black " value="python">
        Python
      </option>
      <option className="text-black  " value="java">
        Java
      </option>
    </select>
  );
}
