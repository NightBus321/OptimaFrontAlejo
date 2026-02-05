"use client";

import AsyncSelect from "react-select/async";
import axios from "axios";
import { useEffect, useState } from "react";
import route from "@/app/routes";
let options = [];

export default function SearchByKeyword({ link, onSelectChange }) {
  const [projects, setProjects] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event);
    onSelectChange(event);
  };

  const url = route + link;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(url);
        setProjects(result.data);
      } catch (error) {
        handleError();
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterOptions = (inputValue) => {
    options = projects.map((object) => {
      return { value: object.code, label: object.code };
    });
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 100);
  };

  return (
    <div className="w-full z-20">
      <AsyncSelect
        placeholder="Buscar por código"
        loadOptions={loadOptions}
        isClearable={true}
        onChange={handleChange}
        value={selectedValue}
        noOptionsMessage={() => "Ingresa el código del proyecto"}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#e78015",
            primary: "#e78015",
          },
        })}
      />
    </div>
  );
}
