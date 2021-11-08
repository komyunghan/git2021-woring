import React from "react";
// import styled from "styled-components";

const TextArea = (props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.title}</label>
      <Textarea
        type={props.type}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

const Textarea = styled.textarea`
  width: 100%;
  height: 8em;
  border: 1px solid #dedede;
  border-radius: 0.5em;
`;

export default TextArea;