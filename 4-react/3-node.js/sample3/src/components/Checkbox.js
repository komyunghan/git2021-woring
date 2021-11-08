import React from "react";
import styled from "styled-components";

const Checkbox = (props) => {
  return (
    <div>
      {props.options.map((option) => {
        return (
          <Line key={option}>
            <label>
              <input
                type="checkbox"
                name={props.name}
                value={`${props.name}=${option}`}
                onChange={props.onChange}
                checked={props.value.indexOf(option) > -1} // look into this
              />
              {option}
            </label>
          </Line>
        );
      })}
    </div>
  );
};

const Line = styled.div`
  display: flex;
  flex-basis: 50%;
  margin-bottom: 1.15em;
  align-items: center;
  label {
    color: ${(props) => props.theme.color.gray};
    margin-left: 0.35em;
  }
`;

export default Checkbox;