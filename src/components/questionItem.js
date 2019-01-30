import styled from 'styled-components'

const ScreenWidth= ScreenWidth;

const QuestionItem = styled.View`
  background-color: #fff;
  padding: 20px 20px;
`

QuestionItem.Avatar = styled.Image`
  width: 42px;
  height: 42px;
`

QuestionItem.ID = styled.Text`
  color: #999999;
  font-size: 13px;
`

QuestionItem.Nickname = styled.Text`
  color: #333333;
`

QuestionItem.InfoView = styled.View`
  flex-direction: row;
  align-items: center;
`

QuestionItem.Content = styled.Text`
  font-size: 15px;
  width: 100%;
  color: ${props=>props.reply?'#F0AB51':'#222222'};
  line-height: 24;
`

QuestionItem.Amount = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

QuestionItem.Money = styled.Text`
  font-size: 14px;
  color: #F0AB51;
`

QuestionItem.MoneyIcon = styled.Image`
    width: 14px;
    height: 18px;
    margin: 0 5px 0 10px;
 `

export default QuestionItem