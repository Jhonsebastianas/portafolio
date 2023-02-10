import React, { useEffect } from 'react';
import { WorkCardStyle, WorkCategorieStyle, WorkContainer, WorkFiltersStyle, WorkItemStyle } from './projects-styles';
import portfolioProjects from '@constants/portfolio';


const mixitupFunction = () => {
    let containerEl = document.querySelector('.work__container');
    let mixerPortfolio = mixitup(containerEl, {
        selectors: {
            target: '.work__card',
        },
        animation: {
            duration: 300,
        }
    });
}

const activeWork = () => {
    const linkWork = document.querySelectorAll('.work__item');
    function active() {
        linkWork.forEach(el => el.classList.remove('active-work'));
        this.classList.add('active-work');
    }
    linkWork.forEach(el => el.addEventListener('click', active));
}

export const Projects = () => {

    useEffect(() => {
        let mounted = true
        if (mounted) {
            mixitupFunction();
            activeWork();
        }
        return () => mounted = false
    }, [])

    return (
        <section className='work section' id="portfolio">
            <h2 className='section__title'>My Portfolio</h2>
            <span className='section__subtitle'>Recent Works</span>

            <WorkFiltersStyle className='work__filters'>
                <WorkItemStyle className='work__item active-work' data-filter='all'>All</WorkItemStyle>
                <WorkItemStyle className='work__item' data-filter='.frontend'>Frontend</WorkItemStyle>
                <WorkItemStyle className='work__item' data-filter='.backend'>Backend</WorkItemStyle>
                <WorkItemStyle className='work__item' data-filter='.companie'>Companie</WorkItemStyle>
                <WorkItemStyle className='work__item' data-filter='.blog'>Blog</WorkItemStyle>
            </WorkFiltersStyle>

            <WorkContainer className='work__container container grid'>

                {portfolioProjects.map((portfolio, index) => {
                    const { categories, title, description, img, url } = portfolio;
                    const rutaImagen = `/images/projects/${img}`;
                    const allCategories = categories.join(" ");
                    return (
                        <WorkCardStyle key={title + index} className={`work__card mix ${allCategories}`}>
                            <img src={rutaImagen} alt='' className='work__img' />

                            <h3 className='work__title'>{title}</h3>
                            {categories.map((categorie, index) => {
                                return (<WorkCategorieStyle key={categorie + index}>{categorie}</WorkCategorieStyle>);
                            })}
                            {/* <p>description</p> */}
                            <a href={url} target="_blank" className="work__button">
                                Demo <i className='uil uil-message work__icon'></i>
                            </a>
                        </WorkCardStyle>
                    )
                })}
            </WorkContainer>
        </section>
    );
}