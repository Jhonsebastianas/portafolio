import styled from "styled-components"

const UlContainer = styled.ul`
    list-style: inside;
`;

const UlDot = (props) => {
    const { children, ...otherProps } = props
    return (
        <UlContainer {...otherProps} className={props.className}>
            {children}
        </UlContainer>
    )
}

export default UlDot;

