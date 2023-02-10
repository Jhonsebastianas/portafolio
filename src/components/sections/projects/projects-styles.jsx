import styled from "styled-components";

export const WorkFiltersStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: .75rem; // Espaciado entre columnas
    margin-bottom: 2rem;

    .active-work {
        background-color: var(--first-color);
        color: var(--body-color);
    }
`;

export const WorkItemStyle = styled.span`
    cursor: pointer;
    color: var(--title-color);
    padding: .25rem .75rem;
    font-weigth: var(--font-medium);
    border-radius: .5rem;
`;

export const WorkCategorieStyle = styled(WorkItemStyle)`
    cursor: auto;
    background-color: var(--gray-color);
    font-size: .9rem;
    // color: var();
    margin-right: 10px;
`;

export const WorkContainer = styled.div`
    padding-top: 1rem;
`;

export const WorkCardStyle = styled.div`
    background-color: var(--container-color);
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,.15);

    .work__img {
        border-radius: 1rem;
        margin-bottom: .75rem;
        box-shadow: 0 2px 4px rgba(0,0,0,.15);
    }

    .work__title {
        font-size: var(--normal-font-size);
        font-weigth: var(--font-medium);
        margin-bottom: .25rem;
        max-width: 295px;
    }

    .work__button {
        margin-top: 10px;
        width: max-content;
        color: var(--firts-color);
        font-size: var(--small-font-size);
        display: flex;
        align-items: center;
        column-gap: .25rem;
    }

    .work__button {

        &:hover {
            .work__icon {
                transform: translateX(.25rem);
            }
        }
    }

    .work__icon {
        font-size: 1rem;
        transition: .4s;
    }
`;