import React from "react";
import styled from "styled-components";
import { Item } from "./App";

const ItemTitle = styled.div`
  position: absolute;
  left: 10%;
  bottom: 10%;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 10px rgb(0 0 0 / 75%);
  &:hover {
    padding-bottom: 10px;
    transition-duration: 0.5s;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  object-fit: scale-down;
  @media (min-width: 480px) {
    width: 100%;
  }
  animation: fadeInAnimation ease 3s;
  animation-iteration-count: infinite;
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
`;

const StyledItemContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  position: relative;
  width: 100%;
  height: auto;
  cursor: pointer;
  @media (min-width: 480px) {
    flex-basis: 300px;
    height: 170px;
    margin: 5px;
  }
`;

type ItemContainerProps = {
  setIsModalOpen: React.Dispatch<boolean>;
  setSelectedItem: React.Dispatch<Item | null>;
  item: Item;
};

function ItemContainer({
  setIsModalOpen,
  setSelectedItem,
  item,
}: ItemContainerProps) {
  return (
    <StyledItemContainer
      onClick={() => {
        setIsModalOpen(true);
        setSelectedItem(item);
      }}
    >
      <ItemImage
        src={item.image}
        alt={item.title}
        onError={(event) => (event.currentTarget.src = "fallback.png")}
      />
      <ItemTitle>{item.title}</ItemTitle>
    </StyledItemContainer>
  );
}

export default ItemContainer;
