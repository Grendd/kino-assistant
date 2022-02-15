import React from 'react';
import './styles.scss'
import Card from "../Card";
import {FormattedShow} from "../../types/shows";
import {BannerType} from "../../store/reducers/drawer";

export interface BlockProps {
    cards: FormattedShow[]
    title: string
    bannerTypeClick: BannerType
}

function CardsBlock({title, cards, bannerTypeClick}: BlockProps) {
  return (
      <div className="block-wrapper">
          <h2 className="block-title">{title}</h2>
          <div className="block">
              {cards.map((card, i) => <Card clickType={bannerTypeClick} {...card} key={`card-${i}`} />)}
          </div>
      </div>

  );
}

export default CardsBlock;