import React, { useState } from "react";
import { Input } from "native-base";

const InputField = ({ name, formik, ...props }) => {
  const [inputValue, setInputValue] = useState(formik.values[name]);

  const handleTextChange = (text) => {
    const textValue = text.trim();
    setInputValue(textValue);
    formik.setFieldValue(name, textValue);
    if (props?.setEmail) {
      alert("email");
      props.setEmail(textValue);
    }
  };

  return (
    <Input onChangeText={handleTextChange} value={inputValue} {...props} />
  );
};

export default InputField;
