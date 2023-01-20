// // import styles from "./RadioButton.module.scss";
import styled from "styled-components";
import { ReactNode, useState } from "react";

// // @use "../../../styles/vars.scss" as *;

// // .radioButtonContainer {
// //     position: relative;
// // }

// // .radioButton {
// //     position: absolute;
// //     width: 0.7em;
// //     height: 0.7em;

// //     &::before {
// //         content: "";
// //         position: absolute;
// //         inset: 0;
// //         width: 0.7em;
// //         height: 0.7em;
// //         background-color: #fff;
// //         outline: 0.15em solid $main-primary-color;
// //         border-radius: 100%;
// //     }

// //     &:checked::before {
// //         content: "";
// //         position: absolute;
// //         inset: 0;
// //         width: 0.7em;
// //         height: 0.7em;
// //         background-color: transparent;
// //         border: $main-primary-color 0.2em solid;
// //         outline: $main-primary-color 0.1em solid;
// //         border-radius: 50%;
// //     }
// // }

// // .styledRadioButton + .radioButton {
// //     position: absolute;
// //     width: 0.7em;
// //     height: 0.7em;
// //     background-color: red;
// //     border-radius: 100%;
// // }

// // .radioButtonContainer {
// //     position: relative;
// // }

// // .radioItemInput {
// //     display: none;
// //     position: relative;
// // }
// // .radioItemInput:checked ~ .radioItemLabel::before {
// //     outline: #3992ff 0.1em solid;
// //     background-color: #3992ff;
// // }
// // .radioItemInput:checked + .radioItemLabel::after {
// //     background-color: #3992ff;
// //     outline: border;
// //     display: inline;
// // }
// // .radioItemLabel {
// //     position: relative;
// //     padding-left: 1.3em;
// //     cursor: pointer;
// // }
// // .radioItemLabel::before {
// //     content: "";
// //     width: 0.6em;
// //     height: 0.6em;
// //     position: absolute;
// //     left: -0.02em;
// //     top: 0.15em;
// //     background-color: transparent;
// //     border: #121316 0.2em solid;
// //     outline: #a3a3a3 0.1em solid;
// //     border-radius: 50%;
// // }
// // .radioItemLabel:hover::before {
// //     outline: #3992ff 0.1em solid;
// // }

// // export default function () {
// //     return (
// //         // <div className={styles.radioButtonContainer}>
// //         <div>
// //             {/* <input type="radio" className={styles.radioItemInput} /> */}
// //             <input type="radio" />
// //             {/* <div className={styles.radioItemLabel} /> */}
// //             <div />
// //         </div>
// //     );
// // }

import React from "react";

const RadioWrapper = styled.div`
    display: inline-block;
`;

const Mark = styled.span`
    display: inline-block;
    position: relative;
    border: 1px solid #777777;
    width: 14px;
    height: 14px;
    left: 0;
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: middle;
    &::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-radius: 50%;
        background-color: ${(props) => props.theme.text};
        opacity: 0;
        left: 50%;
        top: 50%;
        position: absolute;
        transition: all 110ms;
    }
`;

const Input = styled.input`
    position: absolute;
    visibility: hidden;
    display: none;
    &:checked + ${Mark} {
        &::after {
            width: 10px;
            height: 10px;
            opacity: 1;
            left: 12%;
            top: 12%;
        }
    }
`;

const Label = styled.label<Partial<IRadio>>`
    display: flex;
    cursor: pointer;
    padding: 5px 10px 5px 0;
    position: relative;
    ${(props) =>
        props.disabled &&
        `
        cursor: not-allowed;
        opacity: 0.4;
    `}
`;

interface IRadio {
    name: string;
    children?: ReactNode;
    disabled?: boolean;
    setState: Function;
    state: string | boolean;
    value: string;
}

export default function (props: IRadio) {
    let changeHandler = (e: any) => {
        props.setState(e.target.value);
    };

    return (
        <RadioWrapper>
            <Label disabled={props.disabled}>
                <Input
                    name={props.name}
                    type="radio"
                    value={props.value}
                    checked={props.state === props.value}
                    onChange={changeHandler}
                />
                <Mark />
                {props.children}
            </Label>
        </RadioWrapper>
    );
}
