export const multiSearchBarTheme = (theme) => ({
    ...theme,
    borderRadius: 7,
    borderColor: "red",
    colors: {
      ...theme.colors,
      primary25: "#F1F2F4",
      primary: "black",
    },
  })
export const multiSearchBarStyle = {
    control: (provided) => ({
      ...provided,
      borderColor: "#b0bec5",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#F1F2F4",
    }),
  };

