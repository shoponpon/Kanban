import React from 'react'
import styled from 'styled-components'

const SCardList = styled.div`
  display: flex; // レイアウトにはflexを使用
  flex-direction: column; // flexはdefaultで横並びになるのでカードを縦に並べる設定

  width: 272px; // 適当なカードリスト幅
  min-height: 500px; // それっぽい高さ
  margin: 30px 30px 30px 0px; // 適当な余白
  padding: 5px; // 適当な内余白
  box-sizing: border-box; // おまじない
  cursor: pointer; // カーソルを変更してそれっぽく
  background: #ebecf0; // それっぽい背景色
  border-radius: .25rem; // それっぽく角を丸める
  & > * {
      // つまり感排除のための余白を子（カード）全てに設定
      margin-bottom: 5px; 
  }
`

const CardList = ({ children }) => {
    return (
        <SCardList>{ children }</SCardList>
    )
}
export default CardList
