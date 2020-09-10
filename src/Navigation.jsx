// Navigation.jsxを作成
import React from 'react'
import styled from 'styled-components'

const SLogo = styled.div`
    font-size: 24px; // フォントサイズ24pxで
    user-select: none; // 選択不可にしてテキスト感をなくす
    font-family: 'Pacifico', cursive; // importしたwebフォントを適用
`

const SNavigation = styled.div` // styled-componentsで定義
    width: 100%;
    color: white; // 文字の色は白
    background: #0f3460; // それっぽい色
    & > * {
        padding: 12px 30px; // それっぽい余白
    }
`
const Navigation = () => {
    return <SNavigation><SLogo>Kanban</SLogo></SNavigation>
}
export default Navigation
