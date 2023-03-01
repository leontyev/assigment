import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import ModalContainer from "./ModalContainer";
import ItemContainer from "./ItemContainer";
import "./App.css";

export type Item = {
  title: string;
  image: string;
  url: string;
  price: number;
  discount: number | undefined;
  discountPrice: number;
  currency: string;
  brand: string;
};

const Container = styled.div`
  margin: 10px;
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 480px) {
    margin: 50px;
    width: auto;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

function App() {
  const [data, setData] = useState<Array<Item>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    data.forEach((item: Item) => (new Image().src = item.image));
  }, [data]);

  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((counter) => (counter < data.length - 8 ? counter + 8 : 0));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <>
      <Container>
        {data.slice(offset, offset + 8).map((item) => (
          <ItemContainer
            key={item.url}
            setIsModalOpen={setIsModalOpen}
            setSelectedItem={setSelectedItem}
            item={item}
          />
        ))}
      </Container>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal"
        closeTimeoutMS={300}
        ariaHideApp={false}
      >
        {selectedItem && (
          <ModalContainer
            selectedItem={selectedItem}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Modal>
    </>
  );
}

export default App;
