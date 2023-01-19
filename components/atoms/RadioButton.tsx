// // import styles from "./RadioButton.module.scss";
// import styled from "styled-components";
// import { useState } from "react";

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

// //

// export default function () {
//     const [select, setSelect] = useState("optionA");

//     const handleSelectChange = (event: any) => {
//         const value = event.target.value;
//         setSelect(value);
//     };

//     return (
//         <Wrapper>
//             <Item>
//                 <RadioButton
//                     type="radio"
//                     name="radio"
//                     value="optionA"
//                     checked={select === "optionA"}
//                     onChange={(event) => handleSelectChange(event)}
//                 />
//                 <RadioButtonLabel />
//                 <div>Choose Pickup</div>
//             </Item>
//             <Item>
//                 <RadioButton
//                     type="radio"
//                     name="radio"
//                     value="optionB"
//                     checked={select === "optionB"}
//                     onChange={(event) => handleSelectChange(event)}
//                 />
//                 <RadioButtonLabel />
//                 <div>Choose Delivery</div>
//             </Item>
//         </Wrapper>
//     );
// }

// const Wrapper = styled.div`
//     height: auto;
//     width: 100%;
//     padding: 0px 16px 24px 16px;
//     box-sizing: border-box;
// `;

// const Item = styled.div`
//     display: flex;
//     align-items: center;
//     height: 48px;
//     position: relative;
//     border: 1px solid #ccc;
//     box-sizing: border-box;
//     border-radius: 2px;
//     margin-bottom: 10px;
// `;

// const RadioButtonLabel = styled.label`
//     position: absolute;
//     top: 25%;
//     left: 4px;
//     width: 24px;
//     height: 24px;
//     border-radius: 50%;
//     background: white;
//     border: 1px solid #ccc;
// `;
// const RadioButton = styled.input`
//     opacity: 0;
//     z-index: 1;
//     cursor: pointer;
//     width: 25px;
//     height: 25px;
//     margin-right: 10px;
//     &:hover ~ ${RadioButtonLabel} {
//         background: #ccc;
//         &::after {
//             content: "\f005";
//             font-family: "FontAwesome";
//             display: block;
//             color: white;
//             width: 12px;
//             height: 12px;
//             margin: 4px;
//         }
//     }
//     &:checked + ${Item} {
//         background: yellowgreen;
//         border: 2px solid yellowgreen;
//     }
//     &:checked + ${RadioButtonLabel} {
//         background: yellowgreen;
//         border: 1px solid yellowgreen;
//         &::after {
//             content: "\f005";
//             font-family: "FontAwesome";
//             display: block;
//             color: white;
//             width: 12px;
//             height: 12px;
//             margin: 4px;
//         }
//     }
// `;

import styled from "styled-components";
import { InputHTMLAttributes } from "react";

export interface InputElementProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    key?: string;
    disabled?: boolean;
}

export enum BrandColor {
    WHITE = "#FFF",
    PURPLE = "#CDC3DE",
    DARK_PURPLE_FADED = "#7B6798",
    DARK_PURPLE = "#503374",
    YELLOW = "#FFBF44",
}

export const Radio = styled.input`
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    width: 1.5em;
    height: 1.5em;
    border: 2px solid ${BrandColor.DARK_PURPLE};
    border-radius: 50%;
    ::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 0.75em;
        height: 0.75em;
        margin: 3px;
    }
    :hover {
        ::after {
            background-color: ${BrandColor.DARK_PURPLE_FADED};
        }
    }
    :focus {
        outline: 2px solid ${BrandColor.YELLOW};
    }
    :checked {
        ::after {
            background-color: ${BrandColor.DARK_PURPLE};
        }
        :hover {
            background-color: ${BrandColor.WHITE};
            border: 2px solid ${BrandColor.DARK_PURPLE};
            ::after {
                background-color: ${BrandColor.DARK_PURPLE};
            }
        }
    }
    :disabled {
        cursor: not-allowed;
        border: 2px solid ${BrandColor.DARK_PURPLE_FADED};
        background-color: ${BrandColor.PURPLE};
        :hover {
            ::after {
                background-color: ${BrandColor.PURPLE};
            }
        }
        :checked {
            ::after {
                background-color: ${BrandColor.DARK_PURPLE_FADED};
            }
            :hover {
                background-color: ${BrandColor.PURPLE};
                ::after {
                    background-color: ${BrandColor.DARK_PURPLE_FADED};
                }
            }
        }
    }
`;

export const Label = styled.label<{ disabled?: boolean }>`
    font-size: 1rem;
    font-weight: 600;
    color: ${BrandColor.DARK_PURPLE};
    font-family: StabilGrotesk, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    ${({ disabled }) =>
        disabled &&
        `
      color: ${BrandColor.DARK_PURPLE_FADED} !important; 
      cursor: not-allowed;
   `}
`;

const Wrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

const RadioButton = ({
    label,
    disabled = false,
    key = null,
}: InputElementProps) => {
    return (
        <Wrapper key={key}>
            <input type="radio" id={"id"} disabled={disabled} {...key} />
            <Label htmlFor={"id"} disabled={disabled}>
                {label}
            </Label>
        </Wrapper>
    );
};

export default RadioButton;
