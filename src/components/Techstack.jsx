import React from 'react';

import { techstackHeader, techstackData } from '../data';
import { LightningBoltIcon } from '@heroicons/react/outline';
import './styles/Techstack.css'

export default function Techstack (props) {
    const dataHeader = techstackHeader[props.language];
    const data = techstackData;
    return (
        <section id="techstack">
            <div className="Techstack__header">
                <LightningBoltIcon className="Icon__techstack" />
                <h1 className="Techstack__title">{dataHeader.title}</h1>
                <p className="Techstack__subtitle">{dataHeader.content}</p>
            </div>
            <div className="Techstack__list">
                {data.map((tech) => (
                    <div className="TechstackItem__container" key={tech.name}>
                        <div className="TechItem">
                            <i className={tech.iconClass}></i>
                            <h3>{tech.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}