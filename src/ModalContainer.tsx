import React from "react";
import styled from "styled-components";
import { Item } from "./App";
import "./App.css";

const mapCurrency = (code: string) => {
  switch (code) {
    case "GBP":
      return "£";
  }
};

const Button = styled.button`
  background-color: #007bff; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const ModalBrand = styled.div`
  font-weight: 500;
  font-size: 28px;
`;

const ModalTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 20px;
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: row;
`;

const Price = styled.div<{ strikeout: boolean }>`
  display: flex;
  position: relative;
  flex-direction: row;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 20px;
  margin-right: 10px;
  width: fit-content;
  &:after {
    visibility: ${(props) => (props.strikeout ? "visible" : "hidden")};
    content: "";
    width: 100%;
    height: 2px;
    background: red;
    position: absolute;
    bottom: 8px;
    left: 0;
  }
`;

const ModalRightBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  @media (min-width: 480px) {
    margin-bottom: 0;
  }
`;

const StyledModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:before {
    position: absolute;
    left: 15px;
    content: " ";
    height: 33px;
    width: 2px;
    background-color: #333;
    transform: rotate(45deg);
  }
  &:after {
    position: absolute;
    left: 15px;
    content: " ";
    height: 33px;
    width: 2px;
    background-color: #333;
    transform: rotate(-45deg);
  }
`;

type ModalContentProps = {
  selectedItem: Item;
  setIsModalOpen: React.Dispatch<boolean>;
};
function ModalContainer({ selectedItem, setIsModalOpen }: ModalContentProps) {
  return (
    <StyledModalContainer>
      <ModalImage
        src={selectedItem.image}
        alt={selectedItem.title}
        onError={(event) => (event.currentTarget.src = "fallback.png")}
      />
      <ModalRightBlock>
        <div>
          <ModalBrand>{selectedItem.brand}</ModalBrand>
          <ModalTitle>{selectedItem.title}</ModalTitle>
          <PriceBlock>
            <Price strikeout={!!selectedItem.discountPrice}>
              <div>{selectedItem.price}</div>
              <div>{mapCurrency(selectedItem.currency)}</div>
            </Price>
            {!!selectedItem.discountPrice && (
              <Price strikeout={false}>
                <div>{selectedItem.discountPrice}</div>
                <div>{mapCurrency(selectedItem.currency)}</div>
              </Price>
            )}
          </PriceBlock>
        </div>
        <Button onClick={() => (window.location.href = selectedItem.url)}>
          More
        </Button>
      </ModalRightBlock>
      <CloseButton aria-label="close" onClick={() => setIsModalOpen(false)} />
    </StyledModalContainer>
  );
}

export default ModalContainer;
