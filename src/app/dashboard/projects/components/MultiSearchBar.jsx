"use client";
import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";

import route from "@/app/routes";
import {
  multiSearchBarStyle,
  multiSearchBarTheme,
} from "../styles/multiSearchBarStyle";

let options = [];
const MultiSearchBar = ({ urlReq, onSelectChange, userType }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event);
    onSelectChange(event);
  };

  const [users, setUsers] = useState([]);
  const url = route + urlReq;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(url);
        setUsers(result.data);
      } catch (error) {
        handleError();
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterOptions = (inputValue) => {
    options = users.map((object) => {
      return { value: object.ced, label: object.name };
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
    <div className="w-full">
      <AsyncSelect
        isMulti
        value={selectedValue}
        name="colors"
        className="basic-multi-select"
        classNamePrefix="select"
        cacheOptions
        onChange={handleChange}
        loadOptions={loadOptions}
        defaultOptions
        placeholder="Buscar"
        noOptionsMessage={() => "Ingresa el nombre " + userType}
        theme={multiSearchBarTheme}
        styles={multiSearchBarStyle}
      />
    </div>
  );
};

export default MultiSearchBar;
