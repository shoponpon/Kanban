import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs'
import Card from "./Card"
import Navigation from "./Navigation"
import CardList from "./CardList"
import styled from "styled-components"
import CreateModal from "./CreateModal"

const SCardLists = styled.div`
  display: flex;
  width: 100%;
  padding-left: 30px; // 一番左の調整用余白
  box-sizing: border-box;
`

const SButton = styled.button`
  border: none; // 枠線の削除
  border-radius: .25rem; // それっぽい角丸
  box-sizing: border-box; // おまじない
  padding: 0.5rem; // それっぽい余白
  color: rgba(0,0,0,.5); // 文字色を薄くそれっぽく
  background: transparent; // 背景に馴染ませる
  &:focus { // 押した時の青線を削除
    outline: 0;
}

&:hover { // カーソルを合わせた時に色が少し変わるように
    color: rgba(0,0,0,.8);
    background: rgba(0,0,0,.125);
}
`

const SAddListButton = styled(SButton)`
  margin: 30px 30px 30px 0px;
  min-width: 128px;
`

const SListTitle = styled.div`
    font-weight: bold;
    padding: 5px;
`

function App() {
  const [ state, setState ] = useState({
    cardLists: [
      {
        title: 'リストタイトルA',
        cards: [{ title: 'カードタイトル' }]
      },
      {
        title: 'リストタイトルB',
        cards: [{ title: 'カードタイトル' }]
      },
      {
        title: 'リストタイトルC',
        cards: [{ title: 'カードタイトル' }]
      }
    ],
    targetListIndex: -1,
    shownCreateCardModal: false,
    shownCreateCardListModal: false
  })
  const { cardLists, targetListIndex, shownCreateCardModal, shownCreateCardListModal } = state

  const updateState = (newState) => setState({ ...state, ...newState })

  const addCard = ( newCard ) => {
    cardLists[targetListIndex].cards.push(newCard)
    return { cardLists, ...closeCreateCardModal() }
  }
  const removeCard = (listIndex, cardIndex) => {
    cardLists[listIndex].cards.splice(cardIndex, 1)
    return { cardLists }
  }
  const openCreateCardModal = (targetListIndex) => {
    return { shownCreateCardModal: true, targetListIndex }
  }
  const closeCreateCardModal = () => {
    return { shownCreateCardModal: false }
  }

  const addCardList = ( newCardList ) => {
    cardLists.push({ cards: [], ...newCardList })
    return { cardLists, ...closeCreateCardListModal() }
  }
  const openCreateCardListModal = () => {
    return { shownCreateCardListModal: true }
  }
  const closeCreateCardListModal = () => {
    return { shownCreateCardListModal: false }
  }

  const setCards = cardLists.map((_, listIndex) => {
    return (newCards) => {
      cardLists[listIndex].cards = newCards
      return { cardLists }
    }
  })
  const setCardLists = (newCardLists) => {
    return { cardLists: newCardLists }
  }

  return (
    <>
      { shownCreateCardListModal ? <CreateModal onAddCard={(newCardList) => updateState(addCardList(newCardList))} onCloseModal={() => updateState(closeCreateCardListModal())}/> : <></> }
      { shownCreateCardModal ? <CreateModal onAddCard={(newCard) => updateState(addCard(newCard))} onCloseModal={() => updateState(closeCreateCardModal())}/> : <></> }
      <Navigation />
      <SCardLists>
        <ReactSortable
          list={cardLists}
          setList={(newCardLists) => updateState(setCardLists(newCardLists))}
          group='cardList'
          animation={150}
          style={{ display: 'flex' }}
        >
          {
            cardLists.map(({title, cards}, listIndex) => {
              const cardDoms = cards.map((card, cardIndex) => <Card title={card.title} removeCard={() => {
                updateState(removeCard(listIndex, cardIndex))
              }} key={cardIndex} />)
              return (
                <CardList key={listIndex}>
                  <SListTitle>{ title }</SListTitle>
                  <ReactSortable
                    list={cards}
                    setList={(newCards) => updateState(setCards[listIndex](newCards))}
                    group='card'
                    animation={150}
                    style={{ flexGrow: 1 }}
                  >
                    { cardDoms }
                  </ReactSortable>
                  <SButton onClick={(e) => {
                    updateState(openCreateCardModal(listIndex))
                  }}>追加</SButton>
                </CardList>
              )
            })
          }
        </ReactSortable>
        <SAddListButton onClick={(e) => {
            updateState(openCreateCardListModal())
        }}>リストを追加</SAddListButton>
      </SCardLists>
    </>
  );
}

export default App;
