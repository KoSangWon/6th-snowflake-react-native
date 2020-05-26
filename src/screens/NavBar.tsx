import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeMain from '~/screens/home/HomeMain';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '~/navigation/RootTabNavigation';
import { d, color } from '~/utils/constant';

interface Props {
  children: React.ReactNode;
  navigation: StackNavigationProp<RootTabParamList>;
}

const Screen = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  height: ${d.px * 75}px;
  width: ${d.width}px;
  position: absolute;
  bottom: 0px;
  flex: 1;
  flex-direction: row;
  background-color: white;
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding-top: ${d.px * 10}px;
`;
const Title = styled.Text`
  color: ${color.darkGray};
  font-size: ${d.px * 12}px;
`;

const NavBar = ({ children, navigation }: Props) => {
  return (
    <Screen>
      {children}
      <Container>
        <Tab
          onPress={() => {
            navigation.navigate('HomeStack');
          }}
        >
          <Title>홈</Title>
        </Tab>
        <Tab
          onPress={() => {
            navigation.navigate('ProductStack');
          }}
        >
          <Title>제품</Title>
        </Tab>
        <Tab
          onPress={() => {
            navigation.navigate('ClinicStack');
          }}
        >
          <Title>실험실</Title>
        </Tab>
        <Tab
          onPress={() => {
            navigation.navigate('LabStack');
          }}
        >
          <Title>상담소</Title>
        </Tab>
        <Tab
          onPress={() => {
            navigation.navigate('SettingStack');
          }}
        >
          <Title>설정</Title>
        </Tab>
        <Tab
          onPress={() => {
            navigation.navigate('JoinStack');
          }}
        >
          <Title>가입</Title>
        </Tab>
      </Container>
    </Screen>
  );
};

export default withNavigation(NavBar);