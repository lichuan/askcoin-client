import styled from 'styled-components';

const screenWidth = ScreenWidth;
const screenHeight = ScreenHeight;

const Top100Item = styled.View`
  height: ${screenHeight/9};
  width: ${screenWidth};
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  background-color: #fff;
`;

Top100Item.Avatar = styled.Image`
  width: ${ScreenHeight/18};
  height: ${ScreenHeight/18};
  margin-left: 16px;
`;

Top100Item.Num = styled.Text`
  width: 20px;
  height: 20px;
  background-color: #FFA800;
  color: #fff;
  text-align: center;
  border-radius: 5px;
`;

Top100Item.MoneyIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 7px;
`;

Top100Item.Nickname = styled.Text`
  font-size: 15px;
  color: #333333;
  width: 150px;
`

Top100Item.ID = styled.Text`
  font-size: 13px;
  color: #999999;
`

Top100Item.InfoView = styled.View`
  width: ${screenWidth/3};
  height: ${screenHeight/18};
  justify-content: space-between;
  margin-left: 12px;
`

Top100Item.AccountView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

Top100Item.Account = styled.Text`
  color: #F0AB51;
  font-size: 14px;
`

export default Top100Item;
